import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/models/userModel";
import connectDB from "@/dbConfig/dbConfig";
import bcrypt from "bcrypt";

connectDB();

//TIPAGENS
interface dataMongoUser {
  username: string;
  email: string;
  password: string;
  isVerified: boolean;
  token: string;
  alunos?: {
    idAluno?: string;
    nome?: string;
    preparatorio?: string;
    materias?: Array<string>;
  };
}

export async function POST(req: NextRequest) {
  try {
    //Pegando body do post.
    const { username, email, password }: dataMongoUser = await req.json();
    //Verificando existência prévia
    const userEmail = await UserModel.findOne({ email: email });
    const userUsername = await UserModel.findOne({ username: username });
    if (userEmail) throw new Error("Esse email já está em uso!");
    if (userUsername) throw new Error("Nome de usuário em uso!");
    //Criando usuário

    //Criptografando senha
    const senhaCripto = await bcrypt.hash(password, 10);

    const newUser = await new UserModel<dataMongoUser>({
      username: username,
      email: email,
      password: senhaCripto,
      isVerified: false,
      token: "",
      alunos: {},
    });
    // Salvando usuário
    newUser.save();
    return NextResponse.json(
      { success: "Usuário salvo com sucesso." },
      { status: 201 }
    );
  } catch (error: any) {
    //Enviando erro
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
