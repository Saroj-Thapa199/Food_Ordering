import axios from "axios";
import { useEffect, useState } from "react";

export const useProfile = () => {
   const [data, setData] = useState(false);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      setLoading(true);
      axios
         .get("/api/profile")
         .then((res) => {
            const userData = res.data.user;
            setData(userData);
            setLoading(false);
         })
         .catch((err) => console.log(err));
   }, []);

   return { loading, data };
};
