"use client";

import UserForm from "@/components/layout/UserForm";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/hooks/useProfile";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const EditUserPage = () => {
   const { data, loading } = useProfile();
   const { id } = useParams();

   const [user, setUser] = useState(null);
   const [isSaving, setIsSaving] = useState(false)

   useEffect(() => {
      axios.get(`/api/profile?id=${id}`).then((res) => setUser(res.data.user));
   }, [id]);

   const handleSaveButtonClick = async (e, data) => {
      e.preventDefault();
      const promise = new Promise(async (resolve, reject) => {
         try {
            setIsSaving(true)
            const res = await axios.put("/api/profile", { ...data, _id: id });
            console.log(res);
            resolve();
         } catch (error) {
            reject();
         } finally {
            setIsSaving(false)
         }
      });

      await toast.promise(promise, {
         loading: "Saving user...",
         success: "User saved",
         error: "Error!",
      });
   };

   if (loading || !user) {
      return "Loading user info...";
   }

   if (!data?.admin) {
      return "Not an admin";
   }

   return (
      <section className='mt-8 mx-auto max-w-2xl'>
         <UserTabs isAdmin={true} />
         <div className='mt-8'>
            <UserForm user={user} onSave={handleSaveButtonClick} loading={isSaving} setLoading={setIsSaving} />
         </div>
      </section>
   );
};

export default EditUserPage;
