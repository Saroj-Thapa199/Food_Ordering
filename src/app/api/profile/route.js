import { connectDb } from "@/lib/connectDb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { User } from "@/models/User";

export async function PUT(req) {
   const session = await getServerSession(authOptions);

   const data = await req.json();
   const { email } = session.user;

   const { _id } = data;

   if (!session && !_id) {
      return Response.json(
         {
            success: false,
            message: "Unauthorized access",
         },
         { status: 401 }
      );
   }

   await connectDb();
   try {
      const result = await User.updateOne(_id ? { _id } : { email }, data);

      if (result.modifiedCount === 0) {
         return Response.json(
            {
               success: false,
               message:
                  "No user was updated. Please ensure your details are correct.",
            },
            { status: 404 }
         );
      }
      return Response.json(
         {
            success: true,
            message: "User updated successfully!",
         },
         { status: 200 }
      );
   } catch (error) {
      console.error("Error updating user:", error);
      return Response.json(
         {
            success: false,
            message: "Server error. Please try again later.",
         },
         { status: 500 }
      );
   }
}

export async function GET(req) {
   await connectDb();

   const session = await getServerSession(authOptions);

   const email = session?.user?.email;

   const query = req.nextUrl.searchParams;
   const id = query.get("id");

   if (!email && !id) {
      return Response.json({});
   }

   try {
      const user = await User.findOne(id ? { _id: id } : { email });
      if (!user) {
         return Response.json(
            {
               success: false,
               message: "User not found",
            },
            { status: 404 }
         );
      }

      const { password, ...docWithoutPass } = user;

      return Response.json(
         {
            success: true,
            user: docWithoutPass._doc,
         },
         { status: 200 }
      );
   } catch (error) {
      console.log(error);
      return Response.json(
         {
            success: false,
            message: "Something went wrong",
         },
         { status: 500 }
      );
   }
}
