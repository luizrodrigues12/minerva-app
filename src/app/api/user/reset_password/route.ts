import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/models/userModel";
import connectDB from "@/dbConfig/dbConfig";
import bcrypt from "bcrypt";

connectDB();

export async function PUT(req: NextRequest) {
  try {
    // Pegando ID do usuário que mudará a senha
    // Pegando a nova senha do body
    const body = await req.json();
    console.log(body);
    if (!body.newPass) throw new Error("Senha inválida ou inxistente.");
    // Acessando user no DB e mudando senha
    const senhaCripto = await bcrypt.hash(body.newPass, 10);
    await UserModel.updateOne({ _id: body._id }, { password: senhaCripto });

    return NextResponse.json(
      { sucess: "Senha alterada com sucesso." },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 204 });
  }
}

// EMAIL: `http://localhost:3000/api/user/reset_password/?_id=${userForgetId}`
