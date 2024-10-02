import Ham from "../icons/Ham";
import HomeIcon from "../icons/HomeIcon";
import MenuIcon from "../icons/MenuIcon";
import InfoIcon from "../icons/InfoIcon";
import PhoneIcon from "../icons/PhoneIcon";
import UserIcon from "../icons/UserIcon";
import LogoutIcon from "../icons/LogoutIcon";
import LoginIcon from "../icons/LoginIcon";
import RegisterIcon from "../icons/RegisterIcon";
import ShoppingCart from "../icons/ShoppingCart";
import Link from "next/link";
import CrossIcon from "../icons/CrossIcon";
import { useState } from "react";

const MobileHeader = ({ cartProducts, signOut, status }) => {
   const [showSideNav, setShowSideNav] = useState(false);
   return (
      <nav>
         <div className='flex md:hidden justify-between items-center'>
            <Link className='text-primary font-semibold text-2xl' href='/'>
               ST PIZZA
            </Link>
            <div className='flex items-center gap-6 sm:gap-8'>
               <Link href={"/cart"} className='relative'>
                  <ShoppingCart />{" "}
                  {cartProducts.length > 0 && (
                     <span className='absolute -top-2 -right-2 bg-primary text-white text-xs px-[4px] py-[1px] leading-none rounded-full'>
                        {cartProducts.length}
                     </span>
                  )}
               </Link>
               <button className='py-1 px-2 rounded-md' onClick={() => setShowSideNav(true)}>
                  <Ham />
               </button>
            </div>
         </div>

         {showSideNav && (
            <div className='fixed z-10 inset-0 bg-black/40 md:hidden' onClick={() => setShowSideNav(false)}>
               <div className='absolute z-100 h-screen w-[45vw] bg-slate-600 shadow-2xl shadow-white/50 text-white/70 top-0 right-0 p-4 pt-6 px-5 sm:px-6 text-lg sm:text-xl' onClick={(e) => e.stopPropagation()}>
                  <button className="w-0 p-0 border-0" onClick={() => setShowSideNav(false)}>
                  <CrossIcon className='size-6 absolute top-1 right-1 text-white/75' />
                  </button>
                  <Link
                     className='text-primary font-semibold text-2xl block text-center'
                     href='/'
                  >
                     ST PIZZA
                  </Link>
                  <div className='h-full flex flex-col justify-between gap-4 py-10 text-white/70'>
                     <div className='flex flex-col gap-4'>
                        <Link
                           href='/'
                           className='flex items-center gap-6 sm:gap-8'
                        >
                           <HomeIcon />
                           <span>Home</span>
                        </Link>
                        <Link
                           href='/menu'
                           className='flex items-center gap-6 sm:gap-8'
                        >
                           <MenuIcon />
                           <span>Menu</span>
                        </Link>
                        <Link
                           href='/#about'
                           className='flex items-center gap-6 sm:gap-8'
                        >
                           <InfoIcon />
                           <span>About</span>
                        </Link>
                        <Link
                           href='/#contact'
                           className='flex items-center gap-6 sm:gap-8'
                        >
                           <PhoneIcon />
                           <span>Contact</span>
                        </Link>
                        {status === "authenticated" && (
                           <Link
                              href={"/profile"}
                              className='whitespace-nowrap flex items-center gap-6 sm:gap-8'
                           >
                              <UserIcon />
                              <span>Profile</span>
                           </Link>
                        )}
                     </div>
                     <div className='flex flex-col gap-4'>
                        {status === "authenticated" ? (
                           <>
                              <button
                                 onClick={() => signOut()}
                                 className='flex items-center gap-6 sm:gap-8 text-white/70 p-0 border-0 justify-start'
                              >
                                 <LogoutIcon />
                                 <span>Logout</span>
                              </button>
                           </>
                        ) : (
                           <>
                              <Link
                                 href={"/login"}
                                 className='flex items-center gap-6 sm:gap-8'
                              >
                                 <LoginIcon />
                                 <span>Login</span>
                              </Link>
                              <Link
                                 href='/register'
                                 className='bg-primary rounded-full text-white py-2 px-3 flex items-center justify-center gap-3 sm:gap-5'
                              >
                                 <span>Register</span>
                                 <RegisterIcon />
                              </Link>
                           </>
                        )}
                     </div>
                  </div>
               </div>
            </div>
         )}
      </nav>
   );
};

export default MobileHeader;
