import mongoose from "mongoose";

export async function connectDB() {
  if (mongoose.connections[0].readyState) {
    return true;
  }

  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.rnni7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
}

export default connectDB;
