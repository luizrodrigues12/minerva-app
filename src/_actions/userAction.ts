"use server";

import UserModel from "@/models/userModel";
import connectDB from "@/dbConfig/dbConfig";

export async function getUsers() {
  try {
    await connectDB();
    return { msg: "GET" };
  } catch (error: any) {
    return { errMsg: error.message };
  }
}
