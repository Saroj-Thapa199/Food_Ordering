"use client";

import UserForm from "@/components/layout/UserForm";
import UserTabs from "@/components/layout/UserTabs";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProfilePage = () => {
   const session = useSession();
   const { status } = session;

   const router = useRouter()

   const [user, setUser] = useState(null);
   const [isAdmin, setIsAdmin] = useState(false);
   const [editedMessage, setEditedMessage] = useState("");
   const [isSaving, setIsSaving] = useState(false);
   const [profileFetched, setProfileFetched] = useState(false);

   useEffect(() => {
      axios
         .get("/api/profile")
         .then((res) => {
            const { data } = res;
            setUser(data.user);
            setIsAdmin(data.user.admin);
            setProfileFetched(true);
         })
         .catch((err) => console.log(err));
   }, [status, session]);

   useEffect(() => {
      let timeoutId;
      if (editedMessage) {
         timeoutId = setTimeout(() => {
            setEditedMessage("");
         }, 15000);
      }

      return () => clearTimeout(timeoutId);
   }, [editedMessage]);

   const handleProfileInfoUpdate = async (e, data) => {
      e.preventDefault();
      setEditedMessage("");
      setIsSaving(true);
      try {
         const res = await axios.put("/api/profile", data);
         if (res.data.success) {
            setEditedMessage(res.data.message);
         }
      } catch (error) {
         console.log(error);
      } finally {
         setIsSaving(false);
      }
   };

   if (status === 'unauthenticated') {
      return router.replace('/login')
   }

   if (!profileFetched) {
      return "Fetching Profile...";
   }

   return (
      <section className='mt-8 min-h-[70vh]'>
         <UserTabs isAdmin={isAdmin} />
         <div className='max-w-2xl mx-auto mt-8'>
            <UserForm
               user={user}
               onSave={handleProfileInfoUpdate}
               loading={isSaving}
               setLoading={setIsSaving}
            />
            {editedMessage && (
               <div className='text-center bg-green-100 p-2 mt-6 rounded border border-green-300'>
                  {editedMessage}
               </div>
            )}
         </div>
      </section>
   );
};

export default ProfilePage;
