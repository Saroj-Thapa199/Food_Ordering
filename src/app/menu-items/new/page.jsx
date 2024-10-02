"use client";

import Left from "@/components/icons/Left";
import EditableImage from "@/components/layout/EditableImage";
import MenuItemForm from "@/components/layout/MenuItemForm";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/hooks/useProfile";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const NewMenuItemPage = () => {
   const { loading, data } = useProfile();

   const router = useRouter()

   const handleFormSubmit = async (e, data) => {
      e.preventDefault();
      const savingPromise = new Promise(async (resolve, reject) => {
         try {
            const res = await axios.post("/api/menu-items", data);
            if (res.data.success) {
               resolve();
            } else {
               reject();
            }
         } catch (error) {
            console.log("Error in menu items:", error);
            reject();
         }
      });

      await toast.promise(savingPromise, {
         loading: "Creating menu item...",
         success: "Menu item created",
         error: "Error!",
      });

      router.push('/menu-items')
   };

   if (loading) {
      return "Loading user info...";
   }

   if (!data?.admin) {
      return "Not an admin.";
   }

   return (
      <section className='mt-8'>
         <UserTabs isAdmin={true} />
         <div className='max-w-xl mx-auto mt-8'>
            <Link href={"/menu-items"} className='button'>
               <Left />
               <span>Show all menu items</span>
            </Link>
         </div>
         <MenuItemForm menuItem={''} onSubmit={handleFormSubmit} />
      </section>
   );
};

export default NewMenuItemPage;
