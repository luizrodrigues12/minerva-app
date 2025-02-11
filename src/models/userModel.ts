import { Schema, model, models } from "mongoose";
import connectDB from "@/dbConfig/dbConfig";
import { MateriaType } from "./MateriasModel";

connectDB();

export interface daysAndSubjectsType {
  date: number;
  day: string;
  month: number;
  subjects: Array<MateriaType>;
}

export type PlanningObj = {
  id: string;
  daysAndSubjects: Array<daysAndSubjectsType>;
  subjectPerDay: number;
  year: number;
};

export type AlunoObj = {
  idAluno?: string;
  nome?: string;
  preparatorio?: Array<String>;
  materias?: Array<MateriaType>;
  planning?: Array<PlanningObj>;
};

export interface dataMongoUser {
  name: string;
  avatar?: string;
  avatar_key?: string;
  email: string;
  password: string;
  token?: string;
  isVerified: boolean;
  alunos?: AlunoObj[];
}

const userSchema = new Schema<dataMongoUser>(
  {
    name: {
      type: String,
      required: [true, "Digie seu nome."],
    },
    avatar: {
      type: String,
    },
    avatar_key: {
      type: String,
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
        planning: { type: Array<PlanningObj> },
      },
    ],
  },
  { timestamps: true }
);

const UserModel = models.professores || model("professores", userSchema);

export default UserModel;
