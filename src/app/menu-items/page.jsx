"use client";

import Right from "@/components/icons/Right";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/hooks/useProfile";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const MenuItemsPage = () => {
   const { loading, data } = useProfile();
   const [menuItemsLoading, setMenuItemsLoading] = useState(false);

   const [menuItems, setMenuItems] = useState([]);

   useEffect(() => {
      setMenuItemsLoading(true);
      const fetchMenuList = async () => {
         try {
            const res = await axios.get("/api/menu-items");
            if (res.data.success) {
               setMenuItems(res.data.menuList);
            }
         } catch (error) {
            console.log(error);
         } finally {
            setMenuItemsLoading(false);
         }
      };
      fetchMenuList();
   }, []);

   if (loading) {
      return "Loading user info...";
   }

   if (!data?.admin) {
      return "Not an admin.";
   }

   if (menuItemsLoading) {
      return "Loading menu items...";
   }

   return (
      <section className='mt-8 max-w-2xl mx-auto'>
         <UserTabs isAdmin={true} />
         <div className='mt-8'>
            <Link className='button flex' href={"/menu-items/new"}>
               Create new menu item
               <Right />
            </Link>
         </div>
         <div>
            <h2 className='text-sm text-gray-500 mt-8'>Edit menu Item:</h2>
            <div className='grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-2 place-items-center'>
               {menuItems?.length > 0 &&
                  menuItems.map((item) => (
                     <Link
                        key={item._id}
                        href={`/menu-items/edit/${item._id}`}
                        className='bg-gray-200 rounded-lg p-4 h-full'
                     >
                        <div className='relative'>
                           <Image
                              className='rounded-md aspect-square'
                              src={item.image}
                              width={180}
                              height={180}
                              alt='menu-item'
                           />
                        </div>
                        <div className='text-center'>{item.name}</div>
                     </Link>
                  ))}
            </div>
         </div>
      </section>
   );
};

export default MenuItemsPage;
