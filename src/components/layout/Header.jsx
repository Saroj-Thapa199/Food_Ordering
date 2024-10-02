"use client";

import { CartContext } from "@/context/AppContext";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useContext, useEffect } from "react";
import ShoppingCart from "../icons/ShoppingCart";
import MobileHeader from "./MobileHeader";

export const Header = () => {
   const session = useSession();
   const { status, data } = session;
   const userData = data?.user;
   let userName = userData?.name || userData?.email;
   if (userName && userName.includes(" ")) {
      userName = userName.split(" ")[0];
   }

   const { cartProducts } = useContext(CartContext);

   return (
      <header>
         <MobileHeader cartProducts={cartProducts} status={status} signOut={signOut}/>

         <div className='hidden md:flex items-center justify-between'>
            <nav className='flex items-center gap-8 text-gray-500 font-semibold'>
               <Link className='text-primary font-semibold text-2xl' href='/'>
                  ST PIZZA
               </Link>
               <Link href='/'>Home</Link>
               <Link href='/menu'>Menu</Link>
               <Link href='/#about'>About</Link>
               <Link href='/#contact'>Contact</Link>
            </nav>
            <nav className='flex items-center gap-4 text-gray-500 font-semibold'>
               {status === "authenticated" ? (
                  <>
                     <Link href={"/profile"} className='whitespace-nowrap'>
                        Hello, {userName}
                     </Link>
                     <button
                        onClick={() => signOut()}
                        className='bg-primary rounded-full text-white px-8 py-2 '
                     >
                        Logout
                     </button>
                  </>
               ) : (
                  <>
                     <Link href={"/login"}>Login</Link>
                     <Link
                        href='/register'
                        className='bg-primary rounded-full text-white px-8 py-2 '
                     >
                        Register
                     </Link>
                  </>
               )}
               <Link href={"/cart"} className='relative'>
                  <ShoppingCart />{" "}
                  {cartProducts.length > 0 && (
                     <span className='absolute -top-2 -right-2 bg-primary text-white text-xs px-[4px] py-[1px] leading-none rounded-full'>
                        {cartProducts.length}
                     </span>
                  )}
               </Link>
            </nav>
         </div>
      </header>
   );
};
