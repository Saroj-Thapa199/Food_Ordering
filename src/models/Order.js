import { model, models, Schema } from "mongoose";

const orderSchema = new Schema(
   {
      userEmail: String,
      phone: String,
      street: String,
      zip: String,
      city: String,
      country: String,
      cartProducts: Object,
      paid: {type: Boolean, default: false}
   },
   { timestamps: true }
);

export const Order = models?.Order || model('Order', orderSchema)