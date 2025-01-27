import { NextRequest, NextResponse } from "next/server";
import UserModel, { AlunoObj, dataMongoUser } from "@/models/userModel";
import connectDB from "@/dbConfig/dbConfig";
import bcrypt from "bcrypt";
import { capitalize } from "@/utils/stringManipulation";

connectDB();

export async function POST(req: NextRequest) {
  try {
    //Pegando body do post.
    const { name, email, password }: dataMongoUser = await req.json();

    if (!name || !email || !password)
      throw new Error("Envie name, email e password.");

    //Verificando existência prévia
    const userEmail = await UserModel.findOne({ email: email });
    if (userEmail) throw new Error("Esse email já está sendo usado.");

    //Criptografando senha
    const senhaCripto = await bcrypt.hash(password, 10);

    //Criando usuário
    const newUser = await new UserModel<dataMongoUser>({
      name: capitalize(name),
      email: email,
      password: senhaCripto,
      isVerified: false,
    });

    // Salvando usuário
    newUser.save();
    return NextResponse.json({ success: "Usuário salvo com sucesso." });
  } catch (error: any) {
    //Enviando erro
    return NextResponse.json({ error: error.message });
  }
}
