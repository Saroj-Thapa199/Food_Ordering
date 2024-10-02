import { metadata } from "@/app/layout";
import { connectDb } from "@/lib/connectDb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { Order } from "@/models/Order";
import { MenuItem } from "@/models/MenuItem";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
   const { address, cartProducts } = await req.json();

   const session = await getServerSession(authOptions);
   const userEmail = session?.user?.email;

   await connectDb();

   try {
      const orderDoc = await Order.create({
         userEmail,
         ...address,
         cartProducts,
      });

      const stripeLineItems = [];

      for (const cartProduct of cartProducts) {
         const productInfo = await MenuItem.findById(cartProduct._id);

         let productPrice = productInfo.basePrice;

         if (cartProduct.size) {
            const size = productInfo.sizes.find(
               (size) => size._id.toString() === cartProduct.size._id.toString()
            );
            productPrice += size.price;
         }

         if (cartProduct.extras?.length > 0) {
            for (const cartProductExtra of cartProduct.extras) {
               const extraIngredientInfo = productInfo.extraIngredients.find(
                  (extra) =>
                     extra._id.toString() === cartProductExtra._id.toString()
               );
               productPrice += extraIngredientInfo.price;
            }
         }

         const productName = cartProduct.name;

         stripeLineItems.push({
            quantity: 1,
            price_data: {
               currency: "USD",
               product_data: {
                  name: productName,
               },
               unit_amount: productPrice * 100,
            },
         });
      }

      const stripeSession = await stripe.checkout.sessions.create({
         line_items: stripeLineItems,
         mode: "payment",
         customer_email: userEmail,
         success_url: process.env.NEXTAUTH_URL + "/orders/" + orderDoc._id.toString() + '?clear-cart=1',
         cancel_url: process.env.NEXTAUTH_URL + "/cart?canceled=1",
         metadata: { orderId: orderDoc._id.toString() },
         payment_intent_data: {
            metadata: { orderId: orderDoc._id.toString() },
         },
         shipping_options: [
            {
               shipping_rate_data: {
                  display_name: "Delivery fee",
                  type: "fixed_amount",
                  fixed_amount: { amount: 500, currency: "USD" },
               },
            },
         ],
      });

      return Response.json(stripeSession.url, {status: 200})
   } catch (error) {
    console.log(error)
    return Response.json({
        success: false,
        message: 'Internal server error'
    }, {status: 500})
   }
}
