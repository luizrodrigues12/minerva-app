import UserModel, {
  AlunoObj,
  dataMongoUser,
  PlanningObj,
} from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

interface BodyProps {
  planningId: string;
  idAluno: string;
}

export async function DELETE(req: NextRequest) {
  try {
    const { planningId, idAluno }: BodyProps = await req.json();
    if (!planningId) throw new Error("PlanningId não enviado.");

    const userData = await UserModel.findOne({
      "alunos.idAluno": idAluno,
    });

    const finalPlannings = userData?.alunos
      ?.filter((aluno: AlunoObj) => aluno.idAluno === idAluno)[0]
      .planning?.filter((planning: PlanningObj) => planning.id !== planningId);

    const user = await UserModel.findOneAndUpdate<dataMongoUser>(
      { "alunos.idAluno": idAluno },
      { "alunos.$[a].planning": finalPlannings },
      { arrayFilters: [{ "a.idAluno": idAluno }] }
    );

    return NextResponse.json({ planning: finalPlannings });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
