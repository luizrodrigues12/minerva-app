import MateriasModel, { MateriaType } from "@/models/MateriasModel";
import UserModel, { dataMongoUser } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const arrayMaterias: Array<any> = [];
    const bodyReq = await req.json();
    const { token, idAluno, nome, checkedsPrep, checkedsSubjects } =
      await bodyReq;

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
      // Transformando ids em Matérias
      for (let i = 0; i < checkedsSubjects.length; i++) {
        const materiaDB = await MateriasModel.findOne<MateriaType>({
          _id: checkedsSubjects[i],
        });
        arrayMaterias.push(materiaDB!);
      }

      await UserModel.updateOne(
        { token: token },
        { $set: { "alunos.$[a].materias": arrayMaterias } },
        { arrayFilters: [{ "a.idAluno": idAluno }] }
      );
    }

    const user = await UserModel.find<dataMongoUser>({ token });
    const alunos = user[0].alunos;

    return NextResponse.json({ alunos });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
