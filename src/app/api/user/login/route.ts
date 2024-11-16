import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/models/userModel";
import connectDB from "@/dbConfig/dbConfig";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import useUserStore from "@/stores/userStore";
import bcrypt from "bcrypt";

connectDB();

export async function POST(req: NextRequest) {
  try {
    // Pegando o body da requisição
    const { email, password } = await req.json();
    const user = await UserModel.findOne({ email: email });
    if (!user) throw new Error("Usuário não encontrado.");

    if (!(await bcrypt.compare(password, user.password)))
      throw new Error("Senha inválida.");
    if (!user.token) {
      // Criando token e verificando se já existe token
      const token = jwt.sign(
        { _id: user._id },
        process.env.JWT_SECRET as string,
        { expiresIn: "90d" }
      );
      // Salvando token nos cookies
      (await cookies()).set("authorization", token);
      (await cookies()).set("username", user.username);

      //Salvando alunos no Zustand
      const alunos = await user.alunos; // ALUNOS NO BANCO DE DADOS
      // Adicionando token ao user
      await UserModel.updateOne({ email: email }, { token: token });
    } else {
      // Salvando token existente nos cookies
      (await cookies()).set("authorization", user.token);
      (await cookies()).set("username", user.username);
    }
    return NextResponse.json({ loggedUser: true }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
