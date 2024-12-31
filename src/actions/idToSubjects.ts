"use server";

import MateriasModel, { MateriaType } from "@/models/MateriasModel";

export async function idToSubjects(checkeds: Array<String>) {
  console.log(checkeds);
  const arrayMaterias: Array<any> = [];
  // Transformando ids em Matérias
  for (let i = 0; i < checkeds.length; i++) {
    const materiaDB = await MateriasModel.findOne<MateriaType>({
      _id: checkeds[i],
    });
    arrayMaterias.push(materiaDB!);
  }
  return arrayMaterias;
}
