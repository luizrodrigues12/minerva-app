import { Schema, model, models } from "mongoose";
import connectDB from "@/dbConfig/dbConfig";
import { MateriaType } from "./MateriasModel";

connectDB();

export type AlunoObj = {
  idAluno?: string;
  nome?: string;
  preparatorio?: Array<String>;
  materias?: Array<MateriaType>;
};

export interface dataMongoUser {
  username: string;
  email: string;
  password: string;
  token: string;
  isVerified: boolean;
  alunos?: [AlunoObj];
}

const userSchema = new Schema<dataMongoUser>(
  {
    username: {
      type: String,
      required: [true, "Escolha um nome de usuário."],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Digite um email válido."],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Digite uma senha válida."],
    },
    token: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    alunos: [
      {
        idAluno: {
          type: String,
        },
        nome: {
          type: String,
        },
        preparatorio: { type: [String] },
        materias: { type: Array<MateriaType> },
      },
    ],
  },
  { timestamps: true }
);

const UserModel = models.professores || model("professores", userSchema);

export default UserModel;
