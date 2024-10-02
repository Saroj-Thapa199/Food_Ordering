import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
   {
      name: { type: String },
      email: {
         type: String,
         required: [true, "Email is required"],
         unique: [true, "Email must be unique"],
         match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            "Please enter a valid email address",
         ],
      },
      password: {
         type: String,
         required: [true, "Password is required"],
         validate: {
            validator: (pass) => pass.length >= 5,
            message: "Password must be at least 5 characters",
         },
      },
      image: { type: String },
      phone: { type: String },
      zip: { type: String },
      city: { type: String },
      country: { type: String },
      street: { type: String },
      admin: { type: Boolean, default: false },
   },

   { timestamps: true }
);

export const User = models?.User || model("User", UserSchema);
