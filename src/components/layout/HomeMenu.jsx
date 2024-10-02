"use client";

import Image from "next/image";
import MenuItem from "../menu/MenuItem";
import SectionHeaders from "./SectionHeaders";
import { useEffect, useState } from "react";
import axios from "axios";

const HomeMenu = () => {
   const [bestSellers, setBestSellers] = useState([]);

   useEffect(() => {
      axios.get("/api/menu-items").then((res) => {
         const { menuList } = res.data;
         setBestSellers(menuList?.slice(-3));
      });
   }, []);

   return (
      <section>
         <div className='absolute left-0 right-0 w-full'>
            <div className='absolute left-0 -top-[70px] -z-10'>
               <Image
                  src={"/sallad1.png"}
                  width={109}
                  height={189}
                  alt='sallad'
               />
            </div>
            <div className='absolute -top-[100px] right-0 -z-10'>
               <Image
                  src={"/sallad2.png"}
                  width={107}
                  height={195}
                  alt='sallad'
               />
            </div>
         </div>
         <div className='text-center mb-4'>
            <SectionHeaders
               subHeader={"Check out"}
               mainHeader={"Our Best Sellers"}
            />
         </div>
         <div className='grid sm:grid-cols-3 gap-4'>
            {bestSellers?.length > 0 &&
               bestSellers.map((item) => <MenuItem key={item._id} {...item} />)}
         </div>
      </section>
   );
};

export default HomeMenu;
