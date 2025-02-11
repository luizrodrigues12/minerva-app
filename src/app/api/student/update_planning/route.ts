import UserModel, {
  dataMongoUser,
  daysAndSubjectsType,
  PlanningObj,
} from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

interface bodyProps {
  daysAndSubjects: Array<daysAndSubjectsType>;
  subjectPerDay: number;
  idAluno: string;
  planningId: string;
}

export async function PUT(req: NextRequest) {
  try {
    const { daysAndSubjects, subjectPerDay, idAluno, planningId }: bodyProps =
      await req.json();

    if (!daysAndSubjects) throw new Error("dias e matérias não enviados.");
    if (!subjectPerDay)
      throw new Error("Variável 'matérias por dia' não enviada.");
    if (!idAluno) throw new Error("idAluno não enviado.");
    if (!planningId) throw new Error("planningId não enviado.");

    const anoAtual = new Date().getFullYear();

    const user = await UserModel.findOne<dataMongoUser>({
      "alunos.idAluno": idAluno,
    });

    const planningExisting = user?.alunos
      ?.filter((aluno) => aluno.idAluno === idAluno)[0]
      .planning?.filter((planning) => planning.id === planningId)[0];

    const newPlanning = {
      id: planningExisting?.id,
      daysAndSubjects,
      subjectPerDay,
      year: anoAtual,
    };

    const newUser = await UserModel.findOneAndUpdate<dataMongoUser>(
      { "alunos.idAluno": idAluno },
      {
        "alunos.$[a].planning.$[p]": {
          ...planningExisting,
          daysAndSubjects,
          subjectPerDay,
          anoAtual,
        },
      },
      { arrayFilters: [{ "a.idAluno": idAluno }, { "p.id": planningId }] }
    );

    return NextResponse.json({ user: newUser });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
