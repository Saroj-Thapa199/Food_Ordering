import mongoose, { model, models, Schema } from "mongoose";

const ExtrasSchema = new Schema({
   name: String,
   price: Number,
});

const MenuItemSchema = new Schema(
   {
      image: { type: String },
      name: { type: String },
      description: { type: String },
      category: { type: mongoose.Types.ObjectId },
      basePrice: { type: Number },
      sizes: { type: [ExtrasSchema] }, // this means the type will be array of ExtrasSchema
      extraIngredients: { type: [ExtrasSchema] },
   },
   { timestamps: true }
);

export const MenuItem = models?.MenuItem || model("MenuItem", MenuItemSchema);
