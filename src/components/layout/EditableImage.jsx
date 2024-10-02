import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";

const EditableImage = ({
   link,
   setLink,
   width = 96,
   height = 96,
   loading
}) => {
   const handleFileChange = async (e) => {
      const file = e.target?.files[0];
      if (!file) {
         return;
      }
      const formData = new FormData();
      formData.append("file", file);

      try {
         const uploadPromise = axios
            .post("/api/upload", formData, {
               headers: {
                  "Content-Type": "multipart/form-data",
               },
            })
            .then((response) => {
               if (response.data.success) {
                  return response.data.url;
               }
               throw new Error("Something went wrong");
            })
            .then((url) => {
               setLink(url);
            });

         toast.promise(uploadPromise, {
            loading: "Uploading...",
            success: "Upload complete",
            error: "Upload failed!",
         });
      } catch (error) {
         console.log(error);
      } 
   };
   return (
      <div className='flex flex-col gap-1 items-center max-sm:w-fit max-sm:mx-auto'>
         {link ? (
            <div className='bg-gray-100 p-2 rounded-2xl '>
               <Image
                  className='rounded-lg'
                  src={link}
                  width={width}
                  height={height}
                  alt='avatar'
               />
            </div>
         ) : (
            <div
               className={`w-24 h-24 bg-gray-200 flex items-center justify-center break-words`}
            >
               No image
            </div>
         )}
         <label
            className={`block border border-gray-300 rounded-lg p-2 w-full text-center m-0 ${
               loading
                  ? "bg-gray-300 text-gray-500"
                  : "hover:bg-slate-300 cursor-pointer"
            }`}
         >
            <input
               type='file'
               accept='image/*'
               onChange={handleFileChange}
               className='hidden'
            />
            <span>Edit</span>
         </label>
      </div>
   );
};
export default EditableImage;
