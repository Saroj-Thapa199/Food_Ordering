"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const UserTabs = ({ isAdmin }) => {
   const path = usePathname();

   return (
      <div className='flex justify-center gap-2 tabs flex-wrap'>
         <Link
            className={path === "/profile" ? "active" : ""}
            href={"/profile"}
         >
            Profile
         </Link>
         {isAdmin && (
            <>
               <Link
                  className={path === "/categories" ? "active" : ""}
                  href={"/categories"}
               >
                  Categories
               </Link>
               <Link
                  className={path.startsWith("/menu-items") ? "active" : ""}
                  href={"/menu-items"}
               >
                  Menu Items
               </Link>
               <Link
                  className={path.startsWith("/users") ? "active" : ""}
                  href={"/users"}
               >
                  Users
               </Link>
            </>
         )}
         <Link className={path === "/orders" ? "active" : ""} href={"/orders"}>
            Orders
         </Link>
      </div>
   );
};

export default UserTabs;
