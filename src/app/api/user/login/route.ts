import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/models/userModel";
import connectDB from "@/dbConfig/dbConfig";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

connectDB();

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    // Pegando o body da requisiçã
    const { email, password } = await req.json();
    // Pegando User
    const user = await UserModel.findOne({ email: email });
    if (!user) throw new Error("Email não cadastrado.");

    if (!(await bcrypt.compare(password, user.password)))
      throw new Error("Senha incorreta.");

    if (!user.token) {
      // Criando token
      const token = jwt.sign(
        { _id: user._id },
        process.env.JWT_SECRET as string,
        { expiresIn: "90d" }
      );
      // Salvando token nos cookies
      cookieStore.set("authorization", token, {
        maxAge: 86400 * 90,
        secure: true,
        sameSite: "strict",
      });
      cookieStore.set("username", user.username, {
        maxAge: 86400 * 90,
        secure: true,
        sameSite: "strict",
      });

      //Salvando alunos no Zustand
      const alunos = await user.alunos; // ALUNOS NO BANCO DE DADOS
      // Adicionando token ao user
      await UserModel.updateOne({ email: email }, { token: token });
    } else {
      // Salvando token existente nos cookies
      cookieStore.set("authorization", user.token, {
        maxAge: 86400 * 90,
        secure: true,
        sameSite: "strict",
      });
      cookieStore.set("username", user.username, {
        maxAge: 86400 * 90,
        secure: true,
        sameSite: "strict",
      });
    }
    return NextResponse.json({ loggedUser: true }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
