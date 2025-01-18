import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/models/userModel";
import connectDB from "@/dbConfig/dbConfig";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

connectDB();

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { password, id } = await body;

    console.log(id, password);

    if (!password) throw new Error("Senha não enviada.");
    if (!id) throw new Error("Id não enviado.");
    if (!jwt.verify(id, process.env.JWT_SECRET!))
      throw new Error("Token inválido.");

    // Extraindo id do token
    const { _id }: any = jwt.decode(id);

    // Acessando user no DB e mudando senha
    const senhaCripto = await bcrypt.hash(password, 10);
    await UserModel.updateOne({ _id: _id }, { password: senhaCripto });

    return NextResponse.json(
      {
        success:
          "Sua senha foi alterada com sucesso. Agora clique em fazer login e entre na sua conta.",
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
