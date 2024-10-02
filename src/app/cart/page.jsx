"use client";

import Trash from "@/components/icons/Trash";
import AddressForm from "@/components/layout/AddressForm";
import SectionHeaders from "@/components/layout/SectionHeaders";
import CartProduct from "@/components/menu/CartProduct";
import { CartContext, cartProductPrice } from "@/context/AppContext";
import { useProfile } from "@/hooks/useProfile";
import axios from "axios";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const CartPage = () => {
   const { cartProducts, removeCartProduct } = useContext(CartContext);

   const { data: profileData } = useProfile();

   const [address, setAddress] = useState({
      phone: "",
      city: "",
      zip: "",
      country: "",
      street: "",
   });

   useEffect(() => {
      if (typeof window !== "undefined") {
         if (window.location.href.includes("canceled=1")) {
            setTimeout(() => {
               toast.error("Payment failed");
            }, 100);
            console.log("canceled");
         }
      }
   }, []);

   useEffect(() => {
      // const { phone = '', city = '', zip = '', country = '', street = '' } = profileData;
      // const addressData = {phone, city, zip, country, street}
      setAddress({
         phone: profileData?.phone || "",
         city: profileData?.city || "",
         zip: profileData?.zip || "",
         country: profileData?.country || "",
         street: profileData?.street || "",
      });
   }, [profileData]);

   const handleAddressChange = (e) => {
      setAddress({
         ...address,
         [e.target.name]: e.target.value,
      });
   };

   let subTotal = 0;
   for (const p of cartProducts) {
      subTotal += cartProductPrice(p);
   }

   const proceedToCheckout = async (e) => {
      e.preventDefault();
      const promise = new Promise((resolve, reject) => {
         axios
            .post("/api/checkout", {
               address,
               cartProducts,
            })
            .then((res) => {
               resolve();
               const link = res.data;
               window.location = link;
            })
            .catch((err) => {
               console.log(err);
               reject();
            });
      });
      toast.promise(promise, {
         loading: "Preparing your order...",
         success: "Redirecting to payment...",
         error: "Something went wrong, Please try again later!",
      });
   };

   if (cartProducts.length === 0) {
      return (
         <section className='mt-8 text-center'>
            <SectionHeaders mainHeader={"Cart"} />
            <p className='mt-4'>Your shopping cart is empty</p>
         </section>
      );
   }

   return (
      <section className='mt-8'>
         <div className='text-center'>
            <SectionHeaders mainHeader={"Cart"} />
         </div>
         <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mt-8'>
            {/* Cart Items */}
            <div>
               {cartProducts?.length === 0 ? (
                  <div className='text-center text-gray-600'>
                     No products in your shopping cart
                  </div>
               ) : (
                  cartProducts.map((product, index) => (
                     <CartProduct key={index}
                        product={product}
                        onRemove={removeCartProduct}
                        index={index}
                     />
                  ))
               )}
               <div className='mt-4 p-4 bg-gray-100 border border-gray-300 rounded-lg shadow-md'>
                  <div className='flex justify-between'>
                     <h2 className='text-lg font-medium mb-2'>Subtotal:</h2>
                     <div className='text-xl font-semibold text-gray-900'>
                        ${subTotal}
                     </div>
                  </div>
                  <div className='flex justify-between'>
                     <h2 className='text-lg font-medium mb-2'>Delivery fee:</h2>
                     <div className='text-xl font-semibold text-gray-900'>
                        ${5}
                     </div>
                  </div>
                  <div className='flex justify-between'>
                     <h2 className='text-lg font-medium mb-2'>Total:</h2>
                     <div className='text-xl font-semibold text-gray-900'>
                        ${5 + subTotal}
                     </div>
                  </div>
               </div>
            </div>
            {/* Summary or Additional Content */}
            <div className='relative'>
               {" "}
               <div className='bg-gray-100 p-6 rounded-lg shadow-md '>
                  <h2 className='text-xl font-semibold mb-4'>
                     Delivery Details
                  </h2>
                  <p className='text-sm text-gray-600 mb-4'>
                     Please confirm your delivery address below.
                  </p>
                  <form onSubmit={proceedToCheckout}>
                     <AddressForm
                        address={address}
                        handleAddressChange={handleAddressChange}
                     />
                     <button
                        onClick={() => console.log(address)}
                        className='primary'
                     >
                        Checkout - ${subTotal + 5}
                     </button>
                  </form>
               </div>
            </div>
         </div>
      </section>
   );
};

export default CartPage;
