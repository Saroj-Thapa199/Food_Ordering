import { connectDb } from "@/lib/connectDb";
import { Category } from "@/models/Category";
import { MenuItem } from "@/models/MenuItem";
import { isAdmin } from "../auth/[...nextauth]/route";

export async function POST(req) {
   const { name } = await req.json();

   await connectDb();

   try {
if (await isAdmin()) {
   const category = await Category.create({ name });
   return Response.json(
      {
         success: true,
         ...category._doc,
      },
      { status: 200 }
   );
} else {
   return Response.json([])
}
   } catch (error) {
      console.log("Error in categories api", error);
      return Response.json(
         {
            success: false,
            message: "Something went wrong",
         },
         { status: 500 }
      );
   }
}

export async function GET() {
   await connectDb();

   return Response.json(await Category.find(), { status: 200 });
}

export async function PUT(req) {
   const { _id, name } = await req.json();

   await connectDb();
   try {
if (await isAdmin()) {
   await Category.updateOne({ _id }, { name });

   return Response.json(
      {
         success: true,
         message: "Category updated successfully",
      },
      { status: 200 }
   );
} else {
   return Response.json([])
}
   } catch (error) {
      console.log("Error in categories api", error);
      return Response.json(
         {
            success: false,
            message: "Something went wrong",
         },
         { status: 500 }
      );
   }
}

export async function DELETE(req) {
   const query = req.nextUrl.searchParams;
   const _id = query.get("id");

   await connectDb();

   try {
      if (await isAdmin()) {
         // check if the category is being used by any MenuItem
         const menuItemUsingCategory = await MenuItem.findOne({
            category: _id,
         });

         if (menuItemUsingCategory) {
            return Response.json(
               {
                  success: false,
                  message: "Category is in use.",
               },
               { status: 400 }
            );
         }

         await Category.deleteOne({ _id });
         return Response.json(
            {
               success: true,
               message: "Category deleted successfully.",
            },
            { status: 200 }
         );
      } else {
         return Response.json([])
      }
   } catch (error) {
      console.log("Error in categories api:", error);
      return Response.json(
         {
            success: false,
            message: "Something went wrong",
         },
         { status: 500 }
      );
   }
}
