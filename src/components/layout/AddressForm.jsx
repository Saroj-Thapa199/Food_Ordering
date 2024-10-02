const AddressForm = ({ address, handleAddressChange, disabled = false }) => {
   return (
      <>
         <label>Phone:</label>
         <input
            disabled={disabled}
            name='phone'
            type='tel'
            placeholder='Phone'
            onChange={handleAddressChange}
            value={address?.phone}
         />
         <div className='grid grid-cols-2 gap-2'>
            <div>
               <label>Zip Code:</label>
               <input
                  disabled={disabled}
                  name='zip'
                  type='text'
                  placeholder='Zip Code'
                  value={address?.zip}
                  onChange={handleAddressChange}
               />
            </div>
            <div>
               <label>City:</label>
               <input
                  disabled={disabled}
                  name='city'
                  type='text'
                  placeholder='City'
                  value={address?.city}
                  onChange={handleAddressChange}
               />
            </div>
         </div>
         <label>Street Address:</label>
         <input
            disabled={disabled}
            name='street'
            type='text'
            placeholder='Street Address'
            value={address?.street}
            onChange={handleAddressChange}
         />
         <label>Country:</label>
         <input
            disabled={disabled}
            name='country'
            type='text'
            placeholder='Country'
            value={address?.country}
            onChange={handleAddressChange}
         />
      </>
   );
};

export default AddressForm;
