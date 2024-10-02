import Trash from "../icons/Trash";
import Plus from "../icons/Plus";
import ChevronDown from "../icons/ChevronDown";
import { useState } from "react";
import ChevronUp from "../icons/ChevronUp";

const MenuItemPriceProps = ({ name, addLabel, props, setProps }) => {
   const [isOpen, setIsOpen] = useState(false);

   const addProp = () => {
      setProps((oldSizes) => {
         return [...oldSizes, { name: "", price: 0 }];
      });
   };

   const editProp = (e, index, prop) => {
      const newValue = e.target.value;
      setProps((prevSizes) => {
         const newSizes = [...prevSizes];
         newSizes[index][prop] = newValue; //if prop is name its like size[0].name = large
         return newSizes;
      });
   };

   const removeProp = (indexToRemove) => {
      setProps((prev) => prev.filter((v, index) => index !== indexToRemove));
   };

   return (
      <div className='bg-gray-200 p-2 rounded-md mb-2'>
         <button
            className='inline-flex p-1 border-0 justify-start'
            type='button'
            onClick={() => setIsOpen((value) => !value)}
         >
            {/* {isOpen ? <ChevronUp /> : <ChevronDown /> } */}
            <ChevronDown
               className={`size-6 chevron ${isOpen ? "chevron-up" : ""}`}
            />
            <span>{name}</span>
            <span>({props?.length})</span>
         </button>
         <div className={isOpen ? "slide-up" : "slide-down"}>
            {props?.length > 0 &&
               props.map((size, index) => (
                  <div className='flex gap-2 items-end' key={index}>
                     <div>
                        <label>Name</label>
                        <input
                           type='text'
                           placeholder='Size name'
                           value={size.name}
                           onChange={(e) => editProp(e, index, "name")}
                        />
                     </div>
                     <div>
                        <label>Extra price</label>
                        <input
                           type='text'
                           placeholder='Extra price'
                           value={size.price}
                           onChange={(e) => editProp(e, index, "price")}
                        />
                     </div>
                     <div>
                        <button
                           type='button'
                           onClick={() => removeProp(index)}
                           className='bg-white mb-2 px-2'
                        >
                           <Trash />
                        </button>
                     </div>
                  </div>
               ))}
            <button
               type='button'
               onClick={addProp}
               className='bg-white items-center'
            >
               <Plus className='size-4' />
               <span>{addLabel}</span>
            </button>
         </div>
      </div>
   );
};

export default MenuItemPriceProps;
