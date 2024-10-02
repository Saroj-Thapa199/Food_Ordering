"use client";

import Image from "next/image";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";

const LoginPage = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [loginInProgress, setLoginInProgress] = useState(false);
   const [userCreated, setUserCreated] = useState(false);
   const [errorMessage, setErrorMessage] = useState("");

   const handleFormSubmit = async (e) => {
      e.preventDefault();
      setLoginInProgress(true);
      setUserCreated(false);
      setErrorMessage("");
      try {
         signIn("credentials", {
            email,
            password,
            callbackUrl: "/",
         });
      } catch (error) {
         console.log(error);
         setErrorMessage(error.response.data.message);
      } finally {
         setLoginInProgress(false);
      }
   };

   return (
      <section className='mt-8'>
         <h1 className='text-center text-primary text-4xl mb-4'>Login</h1>
         {userCreated && (
            <div className='text-center my-4 text-green-500 bg-green-100 p-2'>
               User created. Now you can{" "}
               <Link
                  className='underline text-blue-500 hover:text-blue-700'
                  href='/login'
               >
                  Login &raquo;
               </Link>
            </div>
         )}
         {errorMessage && (
            <div className='mt-3 text-center p-2 text-red-500 bg-red-100'>
               {errorMessage}
            </div>
         )}
         <form onSubmit={handleFormSubmit} className='block max-w-xs mx-auto'>
            <input
               name='email'
               type='email'
               placeholder='email'
               required
               disabled={loginInProgress}
               value={email}
               onChange={(e) => setEmail(e.target.value)}
            />
            <input
               name='password'
               type='password'
               placeholder='password'
               required
               disabled={loginInProgress}
               value={password}
               onChange={(e) => setPassword(e.target.value)}
            />
            <button disabled={loginInProgress} type='submit'>
               Login
            </button>
            <p className='my-4 text-center text-gray-500'>
               or Login with provider
            </p>
            <button
               type="button"
               onClick={() => signIn("google", { callbackUrl: "/" })}
               className='flex gap-4 justify-center items-center'
            >
               <Image src={"/google.png"} alt='' width={24} height={24} />
               Login with google
            </button>
            <div className='text-center my-4'>
               Don't have an account?{" "}
               <Link
                  className='underline text-gray-500 hover:text-blue-700'
                  href='/register'
               >
                  Register here &raquo;
               </Link>
            </div>
         </form>
      </section>
   );
};

export default LoginPage;
