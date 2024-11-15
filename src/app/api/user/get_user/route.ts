import UserModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { token } = await reqBody;
    const user = await UserModel.findOne({ token: token });
    if (!user) throw new Error("Usuário não encontrado.");

    return NextResponse.json({ user });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
