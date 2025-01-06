import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/models/userModel";
import connectDB from "@/dbConfig/dbConfig";
import bcrypt from "bcrypt";

connectDB();

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { password, id } = await body;
    if (!password) throw new Error("Senha inválida ou inexistente.");

    // Acessando user no DB e mudando senha
    const senhaCripto = await bcrypt.hash(password, 10);
    await UserModel.updateOne({ _id: id }, { password: senhaCripto });

    return NextResponse.json(
      { sucess: "Senha alterada com sucesso." },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 204 });
  }
}
