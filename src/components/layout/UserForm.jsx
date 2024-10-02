import { useState } from "react";
import EditableImage from "./EditableImage";
import { useProfile } from "@/hooks/useProfile";
import AddressForm from "./AddressForm";

const UserForm = ({ user, onSave, loading, setLoading }) => {
   const { data: loggedInUserData } = useProfile();

   const [image, setImage] = useState(user?.image || "");
   const [profile, setProfile] = useState({
      name: user?.name || "",
      phone: user?.phone || "",
      city: user?.city || "",
      zip: user?.zip || "",
      country: user?.country || "",
      street: user?.street || "",
      admin: user?.admin || false,
   });

   const handleProfileChange = (e) => {
      if (e.target.name === "admin") {
         setProfile({
            ...profile,
            [e.target.name]: e.target.checked,
         });
      } else {
         setProfile({
            ...profile,
            [e.target.name]: e.target.value,
         });
      }
   };

   return (
      <div className='sm:flex gap-4'>
         <div>
            <EditableImage
               link={image}
               setLink={setImage}
               loading={loading}
               setLoading={setLoading}
            />
         </div>
         <form
            className='grow'
            onSubmit={(e) => onSave(e, { ...profile, image })}
         >
            <label>First and last name:</label>
            <input
               name='name'
               type='text'
               placeholder='First and last name'
               disabled={loading}
               value={profile?.name}
               onChange={handleProfileChange}
            />
            <label>Email:</label>
            <input
               name='email'
               type='email'
               placeholder='email'
               disabled
               value={user?.email}
            />
            <AddressForm address={profile} handleAddressChange={handleProfileChange} />
            {loggedInUserData.admin && (
               <div>
                  <label
                     htmlFor='adminCheckBox'
                     className='p-2 inline-flex items-center gap-2 mb-2 select-none'
                  >
                     <input
                        id='adminCheckBox'
                        name='admin'
                        type='checkbox'
                        checked={profile?.admin}
                        onChange={handleProfileChange}
                     />
                     <span>Admin</span>
                  </label>
               </div>
            )}

            <button type='submit' disabled={loading}>
               Save
            </button>
         </form>
      </div>
   );
};

export default UserForm;
