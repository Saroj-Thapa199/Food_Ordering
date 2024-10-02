import { CartContext } from "@/context/AppContext";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import MenuItemTile from "./MenuItemTile";
import Image from "next/image";

const MenuItem = (menuItem) => {
   const { image, name, description, basePrice, sizes, extraIngredients } =
      menuItem;
   const { addToCart } = useContext(CartContext);

   const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null);
   const [selectedExtras, setSelectedExtras] = useState([]);

   const [showPopup, setShowPopup] = useState(false);

   const handleAddToCartButtonClick = () => {
      const hasOptions = sizes.length > 0 || extraIngredients.length > 0;
      if (hasOptions && !showPopup) {
         setShowPopup(true);
         return;
      }

      addToCart(menuItem, selectedSize, selectedExtras);
      setShowPopup(false);
      setSelectedSize(sizes?.[0] || null);
      setSelectedExtras([]);
      toast.success("Added to cart!");
   };

   const handleExtraThingClick = (e, extraThing) => {
      const checked = e.target.checked;
      if (checked) {
         setSelectedExtras((prev) => [...prev, extraThing]);
      } else {
         setSelectedExtras((prev) =>
            prev.filter((item) => item !== extraThing)
         );
      }
   };

   let selectedPrice = basePrice;
   if (selectedSize) {
      selectedPrice += selectedSize.price;
   }
   if (selectedExtras?.length > 0) {
      for (const extra of selectedExtras) {
         selectedPrice += extra.price;
      }
   }

   return (
      <>
         {showPopup && (
            <div
               className='fixed bg-black/50 inset-0 flex items-center justify-center z-40'
               onClick={() => setShowPopup(false)}
               onScroll={(e) => {
                  console.log("scrolled");
                  e.stopPropagation();
               }}
            >
               <div
                  className='bg-white p-2 rounded-xl shadow-2xl max-w-lg w-full'
                  onClick={(e) => e.stopPropagation()}
                  onScroll={(e) => e.stopPropagation()}
               >
                  <div
                     className='overflow-y-auto p-4 relative popup-scroll'
                     style={{ maxHeight: "calc(100vh - 100px)" }}
                  >
                     {/* Close Button */}
                     <button
                        className='absolute top-2 right-4 text-gray-600 hover:text-gray-900 w-fit text-xl border-0 p-0'
                        onClick={() => setShowPopup(false)}
                     >
                        &times;
                     </button>

                     <Image
                        src={image}
                        alt={name}
                        width={0}
                        height={0}
                        sizes='100vw'
                        className='w-48 h-48 mx-auto aspect-square rounded-lg mb-4'
                     />
                     <h2 className='text-xl font-bold text-center text-gray-800 mb-3'>
                        {name}
                     </h2>
                     <p className='text-center text-gray-500 text-base mb-4'>
                        {description}
                     </p>

                     {sizes?.length > 0 && (
                        <div className='py-3'>
                           <h3 className='text-center text-gray-700 font-semibold mb-2'>
                              Choose your size
                           </h3>
                           <div className='grid grid-cols-2 gap-4'>
                              {sizes.map((size) => (
                                 <label
                                    key={size.name}
                                    className='flex items-center gap-2 p-2 bg-gray-100 rounded-lg hover:bg-gray-200'
                                 >
                                    <input
                                       type='radio'
                                       name='size'
                                       onChange={() => setSelectedSize(size)}
                                       checked={selectedSize.name === size.name}
                                       className='form-radio'
                                    />
                                    {size.name}
                                    <span className='ml-auto font-semibold'>
                                       ${(basePrice + size.price).toFixed(2)}
                                    </span>
                                 </label>
                              ))}
                           </div>
                        </div>
                     )}

                     {extraIngredients?.length > 0 && (
                        <div className='py-3'>
                           <h3 className='text-center text-gray-700 font-semibold mb-2'>
                              Add extra ingredients
                           </h3>
                           <div className='grid grid-cols-2 gap-4'>
                              {extraIngredients.map((extra) => (
                                 <label
                                    key={extra.name}
                                    className='flex items-center gap-2 p-2 bg-gray-100 rounded-lg hover:bg-gray-200 select-none'
                                 >
                                    <input
                                       type='checkbox'
                                       name={extra.name}
                                       checked={selectedExtras.includes(extra)}
                                       onChange={(e) =>
                                          handleExtraThingClick(e, extra)
                                       }
                                       className='form-checkbox'
                                    />
                                    {extra.name}
                                    <span className='ml-auto font-semibold'>
                                       +${extra.price.toFixed(2)}
                                    </span>
                                 </label>
                              ))}
                           </div>
                        </div>
                     )}

                     {/* Add to Cart Button */}
                     <button
                        className='primary mt-4 w-full hover:bg-[#ff430a] transition sticky bottom-0'
                        type='button'
                        onClick={() => {
                           handleAddToCartButtonClick();
                        }}
                     >
                        Add to Cart ${selectedPrice}
                     </button>
                     <button
                        onClick={() => {
                           setShowPopup(false);
                           setSelectedSize(sizes?.[0] || null);
                           setSelectedExtras([]);
                        }}
                        className='mt-2 hover:bg-gray-200'
                     >
                        Cancel
                     </button>
                  </div>
               </div>
            </div>
         )}
         <MenuItemTile onAddToCart={handleAddToCartButtonClick} {...menuItem} />
      </>
   );
};

export default MenuItem;
