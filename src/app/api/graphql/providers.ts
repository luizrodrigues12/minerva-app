import { MateriaType } from "@/models/MateriasModel";
import UserModel, { dataMongoUser } from "@/models/userModel";
import mongoose from "mongoose";

export const getAllStudents = async (token: string) => {
  const user = await UserModel.findOne({
    token: token,
  });
  const alunos = user.alunos;
  return alunos;
};

export const getOneStudent = async (token: string, idAluno: string) => {
  try {
    const user = await UserModel.findOne<dataMongoUser>({ token: token });
    if (!user) throw new Error("Usuário não encontrado");
    const alunos = user?.alunos;
    const aluno = alunos?.filter((aluno) => {
      return aluno.idAluno === idAluno;
    });
    if (aluno) return aluno[0];
  } catch (error: any) {
    return { error: error.message };
  }
};

export const toggleIsChecked = async (
  token: string,
  idAluno: string,
  objMateria: MateriaType
) => {
  if (objMateria.isChecked == false) {
    await UserModel.updateOne(
      { token: token },
      { "alunos.$[a].materias.$[m].isChecked": true },
      {
        arrayFilters: [
          { "a.idAluno": idAluno },
          {
            "m._id": mongoose.Types.ObjectId.createFromHexString(
              objMateria._id!
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
              objMateria._id!
            ),
          },
        ],
      }
    );
  }

  const user = await UserModel.findOne({ token });
  const alunos = await user.alunos;
  return alunos[0];
};
