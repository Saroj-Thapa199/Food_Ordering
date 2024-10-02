import mongoose from "mongoose";

const connection = {
   isConnected: 0,
};

export const connectDb = async () => {
   if (connection.isConnected) {
      console.log("Already connected to database");
      return;
   }

   try {
      const db = await mongoose.connect(process.env.MONGO_URI);

      connection.isConnected = db.connections[0].readyState;

      console.log('Database connected successfully')
   } catch (error) {
      console.log("Database connection failed", error);
      // process.exit(1);
   }
};
