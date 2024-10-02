import React from "react";

const AddToCartButton = ({ onClick, hasSizesOrExtras, basePrice }) => {
   return (
      <button
         type='button'
         onClick={onClick}
         className='mt-4 bg-primary text-white rounded-full px-8 py-2'
      >
         {hasSizesOrExtras ? (
            // <span>Starting at ${basePrice}</span>
            <span>Add to cart (from ${basePrice})</span>
         ) : (
            <span>Add to cart for ${basePrice}</span>
         )}
      </button>
   );
};

export default AddToCartButton;
