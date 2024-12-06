"use client";

import { useEffect, useState } from "react";
import CheckComp from "../addStudent/CheckComp";
import { AlunosObj } from "@/stores/userStore";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { Spinner } from "flowbite-react";

const UpdateStudentForm = ({ idAluno }: { idAluno: string }) => {
  const router = useRouter();
  const [nomeAluno, setNomeAluno] = useState("");
  const [checks, setChecks] = useState(Array<string>);
  const token = getCookie("authorization");

  const getChecks = async () => {
    document.getElementsByName("checkItem").forEach((checkBox: any) => {
      if (checkBox.checked) checks.push(checkBox.value);
    });
  };

  // Pegando dados do aluno
  const fetcher = (url: string) =>
    fetch(`${process.env.HOST}/api/student/get_student`, {
      method: "POST",
      body: JSON.stringify({ idAluno: idAluno, token: token }),
    }).then(async (res) => {
      const { aluno } = await res.json();
      return aluno[0];
    });

  const { data: oneStudent, mutate } = useSWR(
    `${process.env.HOST}/api/student/get_student`,
    fetcher
  );

  const updateAluno = async () => {
    const result = await fetch(
      `${process.env.HOST}/api/student/update_student`,
      {
        method: "PUT",
        body: JSON.stringify({
          token,
          idAluno,
          nomeAluno: nomeAluno.trim(),
          checks,
        }),
      }
    );
  };

  useEffect(() => {
    setChecks([]);
    mutate();
  }, []);

  return (
    <div className="px-8 md:self-center rounded-lg md:px-6 md:py-5 md:w-[400px] md:border-zinc-800 md:border-2">
      {!oneStudent?.nome ? (
        <div className="flex flex-col justify-center items-center py-5">
          <Spinner />
        </div>
      ) : (
        <form method="POST" className="form_student 2xl:h-[350px] ">
          <h2 className="h1_form">Atualizar Dados</h2>

          <div className="container_check flex flex-col gap-2">
            <input
              type="text"
              name="nome"
              id="nome_aluno"
              placeholder={oneStudent?.nome!}
              autoComplete="off"
              className="input_email_username font-medium text-zinc-200"
              value={nomeAluno}
              onChange={(e) => {
                e.preventDefault();
                setNomeAluno(e.target.value);
              }}
            />

            <h2 className="text-xl font-medium tracking-wide py-1 px-1 text-zinc-200">
              Preparatório
            </h2>
            <CheckComp
              animateComp={{ opacity: [0, 1] }}
              delay={0}
              text="Aplicação"
              name="checkItem"
              id="aplicacao"
              htmlFor="aplicacao"
              value="aplicação"
            />
            <CheckComp
              animateComp={{ opacity: [0, 1] }}
              delay={0.2}
              text="CPM"
              name="checkItem"
              id="cpm"
              htmlFor="cpm"
              value="cpm"
            />
            <CheckComp
              animateComp={{ opacity: [0, 1] }}
              delay={0.4}
              text="CEMAM"
              name="checkItem"
              id="cemam"
              htmlFor="cemam"
              value="cemam"
            />
          </div>
          {/* {error ? (
          <p className="text-[14px] py-0.5 bg-zinc-900 text-center text-[#FAA139]">
            {error}
          </p>
        ) : (
          <></>
        )} */}
          <button
            type="submit"
            className="btn_submit_form"
            onClick={async (e) => {
              e.preventDefault();
              await getChecks();
              await updateAluno();
              window.location.href = `/student/${idAluno}`;
            }}
          >
            Salvar
          </button>
        </form>
      )}
    </div>
  );
};

export default UpdateStudentForm;
