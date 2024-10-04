import { Roboto } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { AppProvider } from "@/context/AppContext";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata = {
   title: "Food Ordering App",
   description:
      "Order your favorite meals effortlessly with our food ordering app. Browse restaurants, explore menus, and enjoy quick delivery or convenient pickup.",
      icons: {
         icon: '/pizza.png'
      },
      openGraph: {
         images: [
           {
             url: '/pizza-app.png',
             alt: 'food-del-app-cover-photo',
           },
         ],
       },
};

export default function RootLayout({ children }) {
   return (
      <html lang='en' className="scroll-smooth">
         <body className={roboto.className}>
            <AppProvider>
               <main className='max-w-4xl mx-auto p-4 '>
                  <Header />
                  {children}
                  <footer className='border-t p-8 text-center text-gray-500 mt-16'>
                     &copy; 2024 All rights reserved
                  </footer>
               </main>
            </AppProvider>
         </body>
      </html>
   );
}
