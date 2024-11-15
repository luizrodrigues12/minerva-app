import UserModel from "@/models/userModel";
import jwt from "jsonwebtoken";
const SECRET = process.env.JWT_SECRET;

//TIPAGENS
interface dataMongoUser {
  username: string;
  email: string;
  password: string;
  isVerified: boolean;
}

export const SetIsChecked = async (
  objMateria: any,
  idAluno: string,
  token: string
) => {
  if (objMateria.isChecked === false) {
    await UserModel.updateOne(
      { token: token },
      { $Set: { "alunos.$[a].materias.$[m].isChecked": true } },
      {
        arrayFilters: [{ "a.idAluno": idAluno }, { "m._id": objMateria._id }],
      }
    );
  } else {
    await UserModel.updateOne(
      { token: token },
      {
        $Set: { "alunos.$[a].materias.$[m].isChecked": false },
      },
      {
        arrayFilters: [{ "a.idAluno": idAluno }, { "m._id": objMateria._id }],
      }
    );
  }
};
