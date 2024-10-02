import { connectDb } from "@/lib/connectDb";
import { User } from "@/models/User";
import bcrypt from 'bcrypt'

export async function POST(req) {
   const { email, password } = await req.json();
   if (!email || !password) {
      return Response.json(
         {
            success: false,
            message: "Please fill all the forms",
         },
         { status: 400 }
      );
   }

   await connectDb();

   try {
      const userByEmail = await User.findOne({ email });
      if (userByEmail) {
         return Response.json(
            {
               success: false,
               message: "Email already in use, Please try a different one!",
            },
            { status: 400 }
         );
      }

      const hashedPassword = await bcrypt.hash(password, 10)

      const createdUser = await User.create({
         email,
         password: hashedPassword,
      });

      // status code 201 is used when a new resource is created
      return Response.json(
         { success: true, message: "User created successfully" },
         { status: 201 }
      );
   } catch (error) {
      console.error("Error registering user", error);
      const errorMessage = error?.message;
      return Response.json(
         {
            success: false,
            message: errorMessage || `Error registering user`,
         },
         { status: 500 }
      );
   }
}
