import UserModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { token } = await reqBody;

    const tokenIsTrue = jwt.verify(token, process.env.JWT_SECRET!);
    if (!tokenIsTrue) throw new Error("Token inválido.");

    const user = await UserModel.findOne({ token: token });
    if (!user) throw new Error("Usuário não encontrado.");

    return NextResponse.json({ user });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
