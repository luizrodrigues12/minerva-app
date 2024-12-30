import MateriasModel, { MateriaType } from "@/models/MateriasModel";
import UserModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

type bodyType = {
  idAluno: string;
  nome: string;
  preparatorio: Array<string>;
  token: string;
  checkeds: Array<string>;
};

export async function POST(req: NextRequest) {
  try {
    const arrayMaterias: Array<any> = [];
    // Pegando body da requisição
    const bodyReq = await req.json();
    const { idAluno, nome, preparatorio, token, checkeds }: bodyType = bodyReq;

    // Transformando ids em Matérias
    for (let i = 0; i < checkeds.length; i++) {
      const materiaDB = await MateriasModel.findOne<MateriaType>({
        _id: checkeds[i],
      });
      arrayMaterias.push(materiaDB!);
    }

    // Identificando usuário
    const user = await UserModel.findOne({ token: token });

    // Adicionando aluno
    await UserModel.updateOne(
      { token: token },
      {
        alunos: [
          ...user.alunos,
          {
            idAluno: idAluno,
            nome: nome,
            preparatorio: preparatorio,
            materias: arrayMaterias,
          },
        ],
      }
    );

    user.save();

    return NextResponse.json({ alunos: user.alunos });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
