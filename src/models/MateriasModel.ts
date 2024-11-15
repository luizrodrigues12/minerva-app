import { Schema, model, models } from "mongoose";
import connectDB from "@/dbConfig/dbConfig";

connectDB();

export interface MateriaType {
  _id?: string;
  nome: string;
  isChecked: boolean;
  materia: string;
  ordem: number;
}

const materiaSchema = new Schema<MateriaType>({
  nome: { type: String, required: [true, "Informe o nome da assunto."] },
  isChecked: { type: Boolean, default: false },
  materia: { type: String, required: [true, "Especifique a matéria."] },
  ordem: {
    type: Number,
    require: [true, "Informe a importância da matéria em número."],
  },
});

const MateriasModel = models.materias || model("materias", materiaSchema);

export default MateriasModel;
