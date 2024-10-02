"use client";

import Left from "@/components/icons/Left";
import MenuItemForm from "@/components/layout/MenuItemForm";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/hooks/useProfile";
import axios from "axios";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const EditPage = () => {
   const { loading, data } = useProfile();

   const { id } = useParams();

   const router = useRouter();

   const [menuItem, setMenuItem] = useState(null);

   useEffect(() => {
      if (id) {
         axios.get(`/api/menu-items?id=${id}`).then((res) => {
            setMenuItem(res.data.menuList[0]);
         });
      }
   }, []);

   const handleFormSubmit = async (e, data) => {
      e.preventDefault();

      const savingPromise = new Promise(async (resolve, reject) => {
         try {
            const res = await axios.put("/api/menu-items", {
               ...data,
               _id: id,
            });
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
         loading: "Updated menu item...",
         success: "Menu item updated",
         error: "Error!",
      });

      router.push("/menu-items");
   };

   const handleDeleteMenu = async () => {
      const deletePromise = new Promise(async (resolve, reject) => {
         try {
            const res = await axios.delete(`/api/menu-items?id=${id}`);
            if (res.data.success) {
               resolve();
            } else reject();
         } catch (error) {
            console.log(error);
            reject();
         }
      });

      await toast.promise(deletePromise, {
         loading: "Deleting Menu Item...",
         success: "Deleted successfully",
         error: "Error!",
      });

      router.push("/menu-items");
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
         <div className='max-w-2xl mx-auto mt-8'>
            <Link href={"/menu-items"} className='button'>
               <Left />
               <span>Show all menu items</span>
            </Link>
         </div>
         <MenuItemForm
            onSubmit={handleFormSubmit}
            menuItem={menuItem}
            edit={true}
            deleteMenu={handleDeleteMenu}
         />
      </section>
   );
};

export default EditPage;
