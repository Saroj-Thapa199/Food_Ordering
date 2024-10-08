"use client";

import { SessionProvider } from "next-auth/react";
import { createContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export const CartContext = createContext({});

export const cartProductPrice = (cartProduct) => {
   let price = cartProduct.basePrice;
   if (cartProduct.size) {
      price += cartProduct.size.price;
   }
   if (cartProduct.extras?.length > 0) {
      for (const extra of cartProduct.extras) {
         price += extra.price;
      }
   }
   return price;
};

export function AppProvider({ children }) {
   const [cartProducts, setCartProducts] = useState([]);
   const localStorage =
      typeof window !== "undefined" ? window.localStorage : null;

   const saveCartProductsToLocalStorage = (cartProducts) => {
      if (localStorage) {
         localStorage.setItem("cart", JSON.stringify(cartProducts));
      }
   };

   useEffect(() => {
      if (localStorage && localStorage.getItem("cart")) {
         setCartProducts(JSON.parse(localStorage.getItem("cart")));
      }
   }, []);

   const removeCartProduct = (indexToRemove) => {
      setCartProducts((prevCartProducts) => {
         const newCartProducts = prevCartProducts.filter(
            (v, index) => index !== indexToRemove
         );
         saveCartProductsToLocalStorage(newCartProducts);
         return newCartProducts;
      });
      toast.success("Product removed");
   };

   const clearCart = () => {
      setCartProducts([]);
      saveCartProductsToLocalStorage([]);
   };

   const addToCart = (product, size = null, extras = []) => {
      setCartProducts((prevProducts) => {
         const cartProduct = { ...product, size, extras };
         const newProducts = [...prevProducts, cartProduct];
         saveCartProductsToLocalStorage(newProducts);
         return newProducts;
      });
   };

   return (
      <SessionProvider>
         <CartContext.Provider
            value={{
               cartProducts,
               setCartProducts,
               addToCart,
               removeCartProduct,
               clearCart,
            }}
         >
            {children}
            <Toaster />
         </CartContext.Provider>
      </SessionProvider>
   );
}
