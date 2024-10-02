"use client";

import Image from "next/image";
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";

const RegisterPage = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [creatingUser, setCreatingUser] = useState(false);
   const [userCreated, setUserCreated] = useState(false);
   const [errorMessage, setErrorMessage] = useState("");

   const handleFormSubmit = async (e) => {
      e.preventDefault();
      setCreatingUser(true);
      setUserCreated(false);
      setErrorMessage("");
      try {
         const res = await axios.post("/api/register", {
            email,
            password,
         });
         if (res.data.success) setUserCreated(true);
      } catch (error) {
         console.log(error);
         setErrorMessage(error.response.data.message);
      } finally {
         setCreatingUser(false);
      }
   };

   return (
      <section className='mt-8'>
         <h1 className='text-center text-primary text-4xl mb-4'>Register</h1>
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
               type='email'
               placeholder='email'
               required
               disabled={creatingUser}
               value={email}
               onChange={(e) => setEmail(e.target.value)}
            />
            <input
               type='password'
               placeholder='password'
               required
               disabled={creatingUser}
               value={password}
               onChange={(e) => setPassword(e.target.value)}
            />
            <button disabled={creatingUser} type='submit'>
               Register
            </button>
            <p className='my-4 text-center text-gray-500'>
               or Login with provider
            </p>
            <button
               type='button'
               onClick={() => signIn("google", { callbackUrl: "/" })}
               className='flex gap-4 justify-center items-center'
            >
               <Image src={"/google.png"} alt='' width={24} height={24} />
               Login with google
            </button>
            <div className='text-center my-4'>
               Already have an account?{" "}
               <Link
                  className='underline text-blue-500 hover:text-blue-700'
                  href='/login'
               >
                  Login here &raquo;
               </Link>
            </div>
         </form>
      </section>
   );
};

export default RegisterPage;
