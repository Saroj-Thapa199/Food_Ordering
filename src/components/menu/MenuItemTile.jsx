import React from "react";
import AddToCartButton from "./AddToCartButton";

const MenuItemTile = ({ onAddToCart, ...item }) => {
   const { image, description, name, basePrice, sizes, extraIngredients } =
      item;
   const hasSizesOrExtras = sizes?.length > 0 || extraIngredients?.length > 0;
   return (
      <div className='bg-gray-200 p-4 rounded-lg text-center hover:bg-white hover:shadow-lg hover:shadow-black/25 transition-all'>
         <div className='text-center'>
            <img src={image} className='max-h-24 block mx-auto' alt='pizza' />
         </div>
         <h4 className='font-semibold text-xl my-3'>{name}</h4>
         <p className='text-gray-500 text-sm line-clamp-3'>{description}</p>
         <AddToCartButton
            hasSizesOrExtras={hasSizesOrExtras}
            onClick={onAddToCart}
            basePrice={basePrice}
         />
      </div>
   );
};

export default MenuItemTile;
