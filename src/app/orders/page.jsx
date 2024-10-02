"use client";

import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/hooks/useProfile";
import { dbTimeForHuman } from "@/lib/datetime";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const OrdersPage = () => {
   const [orders, setOrders] = useState([]);
   const { loading, data: profile } = useProfile();
   const [loadingOrders, setLoadingOrders] = useState(false);

   const fetchOrders = async () => {
      setLoadingOrders(true);
      axios
         .get("/api/orders")
         .then((res) => {
            setOrders(res.data.reverse());
            console.log(res.data);
         })
         .finally(() => setLoadingOrders(false));
   };

   useEffect(() => {
      fetchOrders();
   }, []);

   return (
      <section className='mt-8 max-w-2xl mx-auto'>
         <UserTabs isAdmin={profile.admin} />
         <div className='mt-8'>
            {loadingOrders && (
                <div>Loading orders...</div>
            )}
            <div className='text-center'></div>
            {orders?.length > 0 &&
               orders.map((order) => (
                  <div
                     key={order._id}
                     className='bg-gray-100 mb-2 p-4 rounded-lg md:flex items-center  gap-6'
                  >
                     <div className='grow flex items-center gap-6'>
                        <div className=''>
                           <div
                              className={`${
                                 order.paid ? "bg-green-500" : "bg-red-400"
                              } px-2 py-1.5 rounded-md text-white w-24 text-center`}
                           >
                              {order.paid ? "Paid" : "Not Paid"}
                           </div>
                        </div>
                        <div className='grow'>
                           <div className='sm:flex gap-2 items-center mb-1'>
                              <div className='grow'>{order.userEmail}</div>
                              <div className='text-gray-500 text-sm'>
                                 {dbTimeForHuman(order.createdAt)}
                              </div>
                           </div>
                           <div className='text-gray-500 text-xs'>
                              {order.cartProducts.map((p) => p.name).join(", ")}
                           </div>
                        </div>
                     </div>

                     <div className='justify-end flex gap-2 items-center whitespace-nowrap'>
                        <Link href={`/orders/${order._id}`} className='button'>
                           Show order
                        </Link>
                     </div>
                  </div>
               ))}
         </div>
      </section>
   );
};

export default OrdersPage;
