import { connectDb } from "@/lib/connectDb";
import { MenuItem } from "@/models/MenuItem";
import { isAdmin } from "../auth/[...nextauth]/route";

export async function POST(req) {
   const data = await req.json();

   await connectDb();

   try {
      const menuItem = await MenuItem.create(data);

      return Response.json(
         {
            success: true,
            ...menuItem._doc,
         },
         { status: 200 }
      );
   } catch (error) {
      console.log("Error in menu-items api", error);
      return Response.json(
         {
            success: false,
            message: "Something went wrong",
         },
         { status: 500 }
      );
   }
}

export async function PUT(req) {
   const { _id, ...data } = await req.json();

   await connectDb();

   try {
      if (await isAdmin()) {
         await MenuItem.findByIdAndUpdate(_id, data);
         return Response.json(
            {
               success: true,
               message: "Menu updated successfully",
            },
            { status: 200 }
         );
      } else {
         return Response.json([]);
      }
   } catch (error) {
      console.log("Error in menu-items api", error);
      return Response.json(
         {
            success: false,
            message: "Something went wrong",
         },
         { status: 500 }
      );
   }
}

export async function GET(req) {
   await connectDb();

   const query = req.nextUrl.searchParams;
   const id = query.get("id");

   try {
         const menuList = await MenuItem.find({
            ...(id && { _id: id }),
         });

         return Response.json(
            {
               success: true,
               menuList,
            },
            { status: 200 }
         );
   } catch (error) {
      console.log("Error in menu-items api", error);
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
         await MenuItem.deleteOne({ _id });
         return Response.json(
            {
               success: true,
               message: "MenuItem deleted successfully",
            },
            { status: 200 }
         );
      } else {
         return Response.json([]);
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
