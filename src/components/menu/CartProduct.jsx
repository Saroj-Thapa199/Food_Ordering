import { cartProductPrice } from "@/context/AppContext";
import Image from "next/image";
import React from "react";
import Trash from "../icons/Trash";

const CartProduct = ({ product, onRemove }) => {
   return (
      <div
         className='flex items-center gap-6 mb-6 border-b pb-4'
      >
         {/* Product Image */}
         <div className='w-24 h-24'>
            <Image
               src={product.image}
               width={96}
               height={96}
               sizes='100vw'
               className='aspect-square rounded-md object-cover'
               alt={product?.name || 'product-image'}
            />
         </div>
         {/* Product Details */}
         <div className='grow'>
            <h3 className='text-lg font-semibold mb-2'>{product.name}</h3>
            {product.size && (
               <div className='text-sm text-gray-700 mb-1'>
                  Size: <span className='font-medium'>{product.size.name}</span>
               </div>
            )}
            {product.extras?.length > 0 && (
               <div className='text-sm text-gray-600'>
                  {product.extras.map((extra, index) => (
                     <div key={index} className='mb-1'>
                        {extra.name} +${extra.price}
                     </div>
                  ))}
               </div>
            )}
         </div>
         {/* Price */}
         <div className='text-lg font-semibold text-gray-900'>
            ${cartProductPrice(product)}
         </div>
         {/* Remove Button */}
         {!!onRemove && (
            <div>
               <button
                  type='button'
                  onClick={() => onRemove(index)}
                  className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600'
               >
                  <Trash />
               </button>
            </div>
         )}
      </div>
   );
};

export default CartProduct;
