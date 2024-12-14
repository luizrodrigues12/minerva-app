import UserModel from "@/models/userModel";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function PUT(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { objMateria, idAluno, token } = await reqBody;

    if (objMateria.isChecked == false) {
      await UserModel.updateOne(
        { token: token },
        { "alunos.$[a].materias.$[m].isChecked": true },
        {
          arrayFilters: [
            { "a.idAluno": idAluno },
            {
              "m._id": mongoose.Types.ObjectId.createFromHexString(
                objMateria._id
              ),
            },
          ],
        }
      );
    } else if (objMateria.isChecked == true) {
      await UserModel.updateOne(
        { token: token },
        { "alunos.$[a].materias.$[m].isChecked": false },
        {
          arrayFilters: [
            { "a.idAluno": idAluno },
            {
              "m._id": mongoose.Types.ObjectId.createFromHexString(
                objMateria._id
              ),
            },
          ],
        }
      );
    }

    const user = await UserModel.findOne({ token: token });
    const alunos = await user.alunos;
    const aluno = alunos.filter((aluno: any) => aluno.idAluno === idAluno);

    return NextResponse.json({ aluno: aluno[0] });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
