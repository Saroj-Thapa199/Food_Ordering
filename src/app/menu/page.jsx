"use client";

import SectionHeaders from "@/components/layout/SectionHeaders";
import MenuItem from "@/components/menu/MenuItem";
import axios from "axios";
import React, { useEffect, useState } from "react";

const MenuPage = () => {
   const [categories, setCategories] = useState([]);
   const [menuItems, setMenuItems] = useState([]);

   useEffect(() => {
      Promise.all([
         axios.get("/api/categories"),
         axios.get("/api/menu-items"),
      ]).then(([categoriesRes, menuItemsRes]) => {
         setCategories(categoriesRes.data);
         setMenuItems(menuItemsRes.data.menuList);
      });
   }, []);

   return (
      <section className='mt-8'>
         {categories?.length > 0 &&
            categories.map((c) => (
               <div key={c._id}>
                  <div className='text-center'>
                     <SectionHeaders mainHeader={c.name} />
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4 mt-6 mb-12">
                     {menuItems
                        .filter((item) => item.category === c._id)
                        .map((item) => (
                           <MenuItem key={item._id} {...item} />
                        ))}
                  </div>
               </div>
            ))}
      </section>
   );
};

export default MenuPage;
