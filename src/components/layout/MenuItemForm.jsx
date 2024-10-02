import { useEffect, useState } from "react";
import EditableImage from "./EditableImage";
import MenuItemPriceProps from "./MenuItemPriceProps";
import DeleteButton from "../DeleteButton";
import axios from "axios";

const MenuItemForm = ({ onSubmit, menuItem, edit, deleteMenu }) => {
   const [image, setImage] = useState(menuItem?.image || "");
   const [name, setName] = useState(menuItem?.name || "");
   const [description, setDescription] = useState(menuItem?.description || "");
   const [basePrice, setBasePrice] = useState(menuItem?.basePrice || "");
   const [isSaving, setIsSaving] = useState(false);
   const [sizes, setSizes] = useState(menuItem?.sizes || []);
   const [category, setCategory] = useState(menuItem?.category || "");
   const [categoriesList, setCategoriesList] = useState([]);
   const [extraIngredients, setExtraIngredients] = useState(
      menuItem?.extraIngredients || []
   );

   useEffect(() => {
      axios.get("/api/categories").then((res) => {
         const categories = res.data
         setCategoriesList(categories);

         if (categories.length > 0 && !category) {
            setCategory(categories[0]._id);
         }
   
      });
   }, []);

   return (
      <form
         onSubmit={(e) =>
            onSubmit(e, {
               image,
               name,
               description,
               basePrice,
               sizes,
               extraIngredients,
               category,
            })
         }
         className='mt-8 max-w-2xl mx-auto'
      >
         <div className='sm:flex items-start gap-4 w-full'>
            <div>
               <EditableImage
                  link={image}
                  setLink={setImage}
                  isSaving={isSaving}
                  setIsSaving={setIsSaving}
                  width={96}
                  height={96}
               />
            </div>

            <div className='grow w-full'>
               <label>Item name</label>
               <input
                  type='text'
                  disabled={isSaving}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
               />

               <label>Description</label>
               <input
                  type='text'
                  disabled={isSaving}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
               />

               <label>Select a category</label>
               <select
                  value={category && category}
                  onChange={(e) => setCategory(e.target.value)}
               >
                  {categoriesList?.length > 0 &&
                     categoriesList.map((c) => (
                        <option key={c._id} value={c._id}>{c.name}</option>
                     ))}
               </select>

               <label>Base price</label>
               <input
                  type='text'
                  disabled={isSaving}
                  value={basePrice}
                  onChange={(e) => setBasePrice(e.target.value)}
               />

               <MenuItemPriceProps
                  name={"Sizes"}
                  addLabel={"Add item size"}
                  props={sizes}
                  setProps={setSizes}
               />

               <MenuItemPriceProps
                  name={"Extra ingredients"}
                  addLabel={"Add ingredients prices"}
                  props={extraIngredients}
                  setProps={setExtraIngredients}
               />

               <button type='submit'>Save</button>

               {edit && (
                  <div className='mt-2'>
                     <DeleteButton
                        label={"Delete this menu Item"}
                        onDelete={deleteMenu}
                     />
                  </div>
               )}
            </div>
         </div>
      </form>
   );
};

export default MenuItemForm;
