"use client";

import AddressForm from "@/components/layout/AddressForm";
import SectionHeaders from "@/components/layout/SectionHeaders";
import CartProduct from "@/components/menu/CartProduct";
import { CartContext, cartProductPrice } from "@/context/AppContext";
import axios from "axios";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const OrderPage = () => {
   const { clearCart } = useContext(CartContext);
   const { id } = useParams();

   const [order, setOrder] = useState();
   const [loadingOrder, setLoadingOrder] = useState(false);
   const [address, setAddress] = useState({
      phone: "",
      city: "",
      zip: "",
      country: "",
      street: "",
   });

   useEffect(() => {
      if (typeof window.console !== "undefined") {
         if (window.location.href.includes("clear-cart=1")) {
            clearCart();
         }
      }
      if (id) {
         setLoadingOrder(true);
         axios
            .get(`/api/orders/?_id=${id}`)
            .then((res) => {
               setOrder(res.data);
            })
            .finally(() => setLoadingOrder(false));
      }
   }, []);

   let subtotal = 0;
   if (order?.cartProducts) {
      for (const product of order?.cartProducts) {
         subtotal += cartProductPrice(product);
      }
   }

   return (
      <section className='mx-auto mt-8'>
         <div className='text-center'>
            <SectionHeaders mainHeader={"Your order"} />
            <div className='mt-4 mb-8'>
               <p>Thanks for your order</p>
               <p>We will call you when your order will be on the way</p>
            </div>
         </div>
         {loadingOrder && (
            <div>Loading order...</div>
         )}
         {order && (
            <div className='grid md:grid-cols-2 gap-10 mt-8'>
               <div>
                  {order.cartProducts.map((product, index) => (
                     <CartProduct product={product} key={`${product}${index}`} />
                  ))}
                  <div className='text-right py-2 text-gray-500'>
                     Subtotal:{" "}
                     <span className='text-black font-bold inline-block w-6'>
                        ${subtotal}
                     </span>
                     <br />
                     Delivery:{" "}
                     <span className='text-black font-bold inline-block w-6'>
                        $5
                     </span>
                     <br />
                     Total:{" "}
                     <span className='text-black font-bold inline-block w-6'>
                        ${subtotal + 5}
                     </span>
                     <br />
                  </div>
               </div>
               <div>
                  <div className='bg-gray-100 p-4 rounded-lg'>
                     <AddressForm disabled={true} address={{ ...order }} />
                  </div>
               </div>
            </div>
         )}
      </section>
   );
};

export default OrderPage;
