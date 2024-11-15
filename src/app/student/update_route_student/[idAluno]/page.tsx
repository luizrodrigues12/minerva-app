import { redirect } from "next/navigation";

const page = async ({ params }: { params: Promise<{ idAluno: string }> }) => {
  const parametros = await params;

  redirect(`/student/${parametros.idAluno}`);
};

export default page;
