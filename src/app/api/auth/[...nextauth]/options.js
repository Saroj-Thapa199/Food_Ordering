import { connectDb } from "@/lib/connectDb";
import { User } from "@/models/User";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import client from "@/lib/mongoConnect";

export const authOptions = {
   adapter: MongoDBAdapter(client),
   providers: [
      GoogleProvider({
         clientId: process.env.GOOGLE_CLIENT_ID,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
      CredentialsProvider({
         id: "credentials",
         name: "Credentials",
         credentials: {
            email: {
               label: "Email",
               type: "email",
               placeholder: "test@example.com",
            },
            password: { label: "Password", type: "password" },
         },
         async authorize(credentials, req) {
            const { email, password } = credentials;

            await connectDb();

            try {
               const user = await User.findOne({ email });
               if (!user) {
                  console.log("user not found");
                  return null;
                  // throw new Error('User not found')  // we can return null or throw an error
               }

               const passwordOk = await bcrypt.compare(password, user.password);
               if (!passwordOk) {
                  console.log("password wrong");
                  return null;
               }
               console.log('login success')
               return user;
            } catch (error) {
               throw new Error("Failed to authenticate");
            }
         },
      }),
   ],
   // callbacks: {
   //    async session({session, user}) {
   //       if (user) session.user = user
   //       console.log({session})
   //       return session
   //    } 
   // },
   pages: {
      signIn: "/login",
   },
   secret: process.env.NEXTAUTH_SECRET,
};
