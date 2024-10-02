import { connectDb } from "@/lib/connectDb";
import { User } from "@/models/User";
import { isAdmin } from "../auth/[...nextauth]/route";

export async function GET() {
   connectDb();

   try {
      if (await isAdmin()) {
         const allUsers = await User.find().select("-password");
         return Response.json(
            {
               success: true,
               allUsers,
            },
            { status: 200 }
         );
      } else {
         return Response.json({
            success: false,
            message: "Not an admin",
         });
      }
   } catch (error) {
      console.log("Error in users api", error);
      return Response.json(
         {
            success: false,
            message: "Something went wrong",
         },
         { status: 500 }
      );
   }
}
