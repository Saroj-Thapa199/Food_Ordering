"use client";

import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/hooks/useProfile";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const UsersPage = () => {
   const { data, loading } = useProfile();

   const [users, setUsers] = useState([]);
   const [usersLoading, setUsersLoading] = useState(false);

   useEffect(() => {
      setUsersLoading(true);
      axios
         .get("/api/users")
         .then((res) => setUsers(res.data.allUsers))
         .finally(() => setUsersLoading(false));
   }, []);

   if (loading) {
      return "Loading user info...";
   }

   if (!data?.admin) {
      return "Not an admin";
   }

   return (
      <section className='mt-8 max-w-2xl mx-auto'>
         <UserTabs isAdmin={true} />
         <div className='mt-8'>
            {users?.length > 0 &&
               users.map((user) => (
                  <div
                     key={user._id}
                     className='bg-gray-100 rounded-lg mb-2 py-2 px-4 flex items-center'
                  >
                     <div className='grid sm:grid-cols-2 md:grid-cols-3 sm:gap-4 grow'>
                        <div className='text-gray-900'>
                           {user.name && <span>{user.name}</span>}
                           {!user.name && (
                              <span className='italic'>No name</span>
                           )}
                        </div>
                        <span className='text-gray-500 text-sm'>
                           {user.email}
                        </span>
                     </div>
                     <div>
                        <Link
                           href={
                              data._id === user._id
                                 ? "/profile"
                                 : `/users/${user._id}`
                           }
                           className='button hover:bg-white'
                        >
                           Edit
                        </Link>
                     </div>
                  </div>
               ))}
         </div>
      </section>
   );
};

export default UsersPage;
