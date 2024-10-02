import React, { useState } from "react";

const DeleteButton = ({ label, onDelete, className }) => {
   const [showConfirm, setShowConfirm] = useState(false);

   return (
      <>
         <button type='button' onClick={() => setShowConfirm(true)} className="hover:bg-white">
            {label}
         </button>

         {showConfirm && (
            <>
               <div
                  className='fixed bg-black/50 inset-0 flex items-center justify-center z-40'
                  onClick={() => setShowConfirm(false)}
               >
                  <div
                     className='bg-white p-6 rounded-lg shadow-lg max-w-sm w-full'
                     onClick={(e) => e.stopPropagation()}
                  >
                     <h2 className='pl-1 mb-4 text-center'>
                        Are you sure you want to delete?
                     </h2>
                     <div className='flex justify-center gap-4'>
                        <button
                           type='button'
                           onClick={() => setShowConfirm(false)}
                           className='bg-gray-100 hover:bg-gray-200 rounded-full'
                        >
                           Cancel
                        </button>
                        <button
                           type='button'
                           onClick={() => {
                              onDelete();
                              setShowConfirm(false);
                           }}
                           className='primary rounded-full'
                        >
                           Yes, delete
                        </button>
                     </div>
                  </div>
               </div>
            </>
         )}
      </>
   );
};

export default DeleteButton;
