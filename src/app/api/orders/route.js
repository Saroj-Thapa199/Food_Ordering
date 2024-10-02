import { connectDb } from "@/lib/connectDb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { Order } from "@/models/Order";
import { isAdmin } from "../auth/[...nextauth]/route";

export async function GET(req) {
   await connectDb();

   const session = await getServerSession(authOptions);
   const userEmail = session?.user?.email;
   let admin = await isAdmin();

   const query = req.nextUrl.searchParams;
   const _id = query.get("_id");

   if (_id) {
      return Response.json(await Order.findById(_id));
   }

   if (admin) {
      return Response.json(await Order.find());
   }

   if (userEmail) {
      return Response.json(await Order.find(userEmail));
   }
}
