import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    const res = await mongoose.connect(process.env.MONGO_URI);

    console.log('MongoDB connection successful');
  } catch (error) {
    console.error('Mongoose connection failed:', error.message);
  }
};
