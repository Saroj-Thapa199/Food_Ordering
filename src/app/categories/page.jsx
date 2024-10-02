"use client";

import DeleteButton from "@/components/DeleteButton";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/hooks/useProfile";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const CategoriesPage = () => {
   const [categoryName, setCategoryName] = useState("");
   const [categories, setCategories] = useState([]);
   const [editedCategory, setEditedCategory] = useState(null);

   const { loading: profileLoading, data: profileData } = useProfile();

   useEffect(() => {
      fetchCategories();
   }, []);

   const fetchCategories = async () => {
      const res = await axios.get("/api/categories");
      setCategories(res.data);
   };

   const handleCategorySubmit = async (e) => {
      e.preventDefault();
      const creationPromise = new Promise(async (resolve, reject) => {
         const data = {
            name: categoryName,
            ...(editedCategory && { _id: editedCategory._id }),
         };
         const res = await fetch("/api/categories", {
            method: editedCategory ? "PUT" : "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
         });
         setCategoryName("");
         setEditedCategory(null);
         if (res.ok) {
            fetchCategories();
            resolve();
         } else {
            reject();
         }
      });
      await toast.promise(creationPromise, {
         loading: editedCategory
            ? "Updating category "
            : "Creating your new category",
         success: editedCategory ? "Category updated" : "Category created",
         error: "Error, ",
      });
   };

   const handleDeleteCategory = async (id) => {
      const deletePromise = new Promise(async (resolve, reject) => {
         try {
            const res = await axios.delete(`/api/categories?id=${id}`);
            if (res.data.success) {
               resolve(res);
               fetchCategories();
            } else {
               reject(res);
            }
         } catch (error) {
            console.log(error);
            reject(error.response);
         }
      });

      await toast.promise(deletePromise, {
         loading: "Deleting category",
         success: (res) => `${res.data.message}`,
         error: (err) => `Error! ${err?.data?.message}`,
      });
   };

   if (profileLoading) {
      return "Loading profile info...";
   }

   if (!profileData?.admin) {
      return "Not an admin";
   }

   return (
      <section className='mt-8 max-w-2xl mx-auto'>
         <UserTabs isAdmin={true} />
         <form className='mt-8' onSubmit={handleCategorySubmit}>
            <div className='flex gap-2 items-end'>
               <div className='grow'>
                  <label>
                     {editedCategory ? "Update category" : "New category name"}
                     {editedCategory && (
                        <>
                           : <b>{editedCategory.name}</b>
                        </>
                     )}
                  </label>
                  <input
                     type='text'
                     value={categoryName}
                     onChange={(e) => setCategoryName(e.target.value)}
                  />
               </div>
               <div className='pb-2 flex gap-2'>
                  <button className='border' type='submit'>
                     {editedCategory ? "Update" : "Create"}
                  </button>
                  <button
                     type='button'
                     onClick={() => {
                        setEditedCategory(null);
                        setCategoryName("");
                     }}
                  >
                     Cancel
                  </button>
               </div>
            </div>
         </form>
         <div>
            <h2 className='mt-8 text-sm text-gray-500'>Existing categories:</h2>
            {categories?.length > 0 &&
               categories.map((c) => (
                  <div
                     key={c._id}
                     className='bg-gray-100 rounded-xl px-4 py-2 flex gap-1 mb-1 items-center'
                  >
                     <div className='grow'>{c.name}</div>
                     <div className='flex gap-1'>
                        <button
                           type='button'
                           onClick={() => {
                              setEditedCategory(c);
                              setCategoryName(c.name);
                           }}
                        >
                           Edit
                        </button>
                        <DeleteButton
                           label={"Delete"}
                           onDelete={() => handleDeleteCategory(c._id)}
                        />
                     </div>
                  </div>
               ))}
         </div>
      </section>
   );
};

export default CategoriesPage;
