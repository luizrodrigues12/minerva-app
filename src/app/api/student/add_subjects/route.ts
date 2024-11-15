import MateriasModel from "@/models/MateriasModel";
import UserModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    // Pegando body
    const reqBody = await req.json();
    const { checkeds, token, idAluno } = await reqBody;
    // console.log({ checkeds, token, idAluno });
    // Atualizando materias do aluno
    const user = await UserModel.findOne({ token: token });
    const alunoCerto = user.alunos.filter((alunoObj: any) => {
      return alunoObj.idAluno === idAluno;
    });
    const { materias } = alunoCerto[0];

    // Pegando materias do DB e adicionando
    checkeds.map(async (idMateria: string) => {
      const materia = await MateriasModel.findOne({ _id: idMateria });
      await UserModel.updateOne(
        { token: token },
        { $addToSet: { "alunos.$[a].materias": materia } },
        { arrayFilters: [{ "a.idAluno": idAluno }] }
      );
    });

    user.save();

    return NextResponse.json({ res: materias });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
