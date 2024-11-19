"use client";

import { useEffect, useState } from "react";
import CheckComp from "../addStudent/CheckComp";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import useSWR from "swr";

const StudentForm = () => {
  const [checks, setChecks] = useState(Array<string>);
  const [error, setError] = useState();
  const idStudent = uuidv4();
  // HOOKS
  const router = useRouter();
  const [nomeAluno, setNomeAluno] = useState("");

  const fetcher = (url: string) =>
    fetch(`${process.env.HOST}/api/student/add_student`, {
      method: "POST",
      body: JSON.stringify({
        idAluno: idStudent,
        nome: nomeAluno.trim(),
        preparatorio: checks,
        token,
      }),
    })
      .then(async (res) => {
        return res;
      })
      .catch((err) => setError(err.message));

  const { data, mutate } = useSWR(
    `${process.env.HOST}/api/student/add_student`,
    fetcher
  );

  //zerando
  useEffect(() => setChecks([]), []);

  // Salvando checkbox marcados nos states
  const onChangeInput = () => {
    try {
      document.getElementsByName("checkItem").forEach((check: any) => {
        if (check.checked && !checks.includes(check.value)) {
          checks.push(check.value);
        }
      });
    } catch (error: any) {
      setError(error.message);
    }
  };

  // Definindo body para enviar
  const token = getCookie("authorization");

  // FUNÇÃO QUE FAZ O POST
  const submitFormStudent = (e: any) => {
    e.preventDefault();
    try {
      // Verificações
      if (!nomeAluno) throw new Error("por favor, insira um nome válido.");
      onChangeInput();
      if (checks.length === 0)
        throw new Error("Escolha ao menos um preparatório.");
      mutate();
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="px-8 md:self-center rounded-lg md:px-6 md:py-5 md:w-[400px] md:border-zinc-800 md:border-2">
      <form method="POST" className="form_student">
        <h2 className="h1_form">Adicionar Aluno</h2>
        <div className="container_check flex flex-col gap-2">
          <input
            type="text"
            name="nome"
            id="nome_aluno"
            placeholder="Nome do aluno"
            className="input_email_username"
            autoComplete="off"
            onChange={(e) => {
              e.preventDefault();
              setNomeAluno(e.target.value);
            }}
          />

          <h2 className="text-xl font-medium tracking-wide py-1 px-1 text-zinc-200">
            Preparatório
          </h2>
          <CheckComp
            text="Aplicação"
            name="checkItem"
            id="aplicacao"
            htmlFor="aplicacao"
            value="aplicação"
          />
          <CheckComp
            text="CPM"
            name="checkItem"
            id="cpm"
            htmlFor="cpm"
            value="cpm"
          />
          <CheckComp
            text="CEMAM"
            name="checkItem"
            id="cemam"
            htmlFor="cemam"
            value="cemam"
          />
        </div>
        {error ? (
          <p className="text-[14px] py-0.5 bg-zinc-900 text-center text-[#FAA139]">
            {error}
          </p>
        ) : (
          <></>
        )}

        <button
          type="submit"
          className="btn_submit_form"
          onClick={(e: any) => {
            e.preventDefault();
            try {
              // Verificações
              if (!nomeAluno)
                throw new Error("por favor, insira um nome válido.");
              onChangeInput();
              if (checks.length === 0)
                throw new Error("Escolha ao menos um preparatório.");
              submitFormStudent(e);
              router.push(`/add_student/subjects/${idStudent}`);
            } catch (error: any) {
              setError(error.message);
            }
          }}
        >
          Avançar
        </button>
      </form>
    </div>
  );
};

export default StudentForm;
