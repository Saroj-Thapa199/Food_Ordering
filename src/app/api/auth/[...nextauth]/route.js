import NextAuth, { getServerSession } from "next-auth";
import { authOptions } from "./options";
import { User } from "@/models/User";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

export async function isAdmin() {
   const session = await getServerSession(authOptions);
   const userEmail = session?.user?.email;
   if (!userEmail) {
      return false;
   }
   const userInfo = await User.findOne({ email: userEmail });
   if (!userInfo) {
      return false;
   }
   return userInfo.admin;
}
