import MateriasModel, { MateriaType } from "@/models/MateriasModel";
import UserModel, { dataMongoUser } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

type UpdateStudentProps = {
  token: string;
  idAluno: string;
  nome: string;
  checkedsPrep: Array<string>;
  checkedsSubjects: Array<string>;
};

export async function PUT(req: NextRequest) {
  try {
    const arrayMaterias: Array<MateriaType> = [];
    const bodyReq = await req.json();
    const {
      token,
      idAluno,
      nome,
      checkedsPrep,
      checkedsSubjects,
    }: UpdateStudentProps = await bodyReq;

    const user = await UserModel.find<dataMongoUser>({ token });
    const aluno = user[0].alunos?.filter(
      (aluno) => aluno.idAluno === idAluno
    )[0];

    if (nome)
      await UserModel.updateOne(
        { token: token },
        { $set: { "alunos.$[a].nome": nome } },
        { arrayFilters: [{ "a.idAluno": idAluno }] }
      );

    if (checkedsPrep.length > 0)
      await UserModel.updateOne(
        { token: token },
        { $set: { "alunos.$[a].preparatorio": checkedsPrep } },
        { arrayFilters: [{ "a.idAluno": idAluno }] }
      );

    if (checkedsSubjects.length > 0) {
      //fazendo parse das matérias
      checkedsSubjects.map((materia) =>
        arrayMaterias.push(JSON.parse(materia))
      );

      await UserModel.updateOne(
        { token: token },
        { $set: { "alunos.$[a].materias": arrayMaterias } },
        { arrayFilters: [{ "a.idAluno": idAluno }] }
      );
    }

    const alunos = user[0].alunos;

    return NextResponse.json({ alunos });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
