import { Header } from "@/components/layout/Header";
import Hero from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu";
import SectionHeaders from "@/components/layout/SectionHeaders";

export const metadata = {
   title: "Food Ordering App",
   description:
      "Order your favorite meals effortlessly with our food ordering app. Browse restaurants, explore menus, and enjoy quick delivery or convenient pickup",
};

export default function Home() {
   return (
      <>
         <Hero />
         <HomeMenu />
         <section className='text-center my-16' id='about'>
            <SectionHeaders subHeader={"Our story"} mainHeader={"About us"} />
            <div className='text-gray-500 max-w-md mx-auto mt-8 flex flex-col gap-4'>
               <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Inventore ad quisquam ipsum magni reprehenderit vero illo
                  repudiandae nemo, atque, soluta veniam dolore dolorem quos
                  corporis expedita nulla et. Dolorem, libero.
               </p>
               <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
                  praesentium nam illum ducimus consequatur? Nostrum
                  exercitationem dolor eos aliquam, a nemo voluptatum doloribus.
               </p>
               <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Deserunt ad accusantium, a velit alias quas!
               </p>
            </div>
         </section>
         <section className='text-center my-8' id='contact'>
            <SectionHeaders
               subHeader={"Don't hesitate"}
               mainHeader={"Contact us"}
            />
            <div className='mt-8'>
               <a className='text-4xl underline' href='tel:+9779845483963'>
                  +977 9845483963
               </a>
            </div>
         </section>
      </>
   );
}
