"use client";

import { useEffect, useState } from "react";
import CheckComp from "../../add_student/CheckComp";
import { getCookie } from "cookies-next";
import useSWR from "swr";
import Loading from "../../layout/Loading";
import { motion } from "motion/react";

const UpdateStudentForm = ({ idAluno }: { idAluno: string }) => {
  const [nomeAluno, setNomeAluno] = useState("");
  const [checks, setChecks] = useState(Array<string>);
  const token = getCookie("authorization");
  const [error, setError] = useState<string>();

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

  const {
    data: oneStudent,
    mutate,
    isValidating,
  } = useSWR(`${process.env.HOST}/api/student/get_student`, fetcher);

  const updateAluno = async () => {
    try {
      if (checks.length === 0 && nomeAluno.trim().length === 0)
        throw new Error("Faça alguma mudança antes de atualizar!");
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

      window.location.href = `/student/${idAluno}`;
    } catch (error: any) {
      setError(error.message);
    }
  };

  useEffect(() => {
    setChecks([]);
    mutate();
  }, []);

  return (
    <div className="w-full flex flex-col justify-center items-center height_pattern">
      {isValidating ? (
        <Loading />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="px-8 md:self-center rounded-lg md:px-6 md:py-5 md:w-[400px] md:border-zinc-800 md:border-2 w-full"
        >
          <form method="POST" className="form_student 2xl:h-[350px] ">
            <h2 className="h1_form">Atualizar Dados</h2>
            <div className="container_check flex flex-col gap-2">
              <input
                type="text"
                name="nome"
                id="nome_aluno"
                placeholder={oneStudent?.nome!}
                autoComplete="off"
                className="input_email_username !border-zinc-800 mt-2 placeholder:text-zinc-400 text-zinc-200 focus:border-zinc-800"
                value={nomeAluno}
                onChange={(e) => {
                  e.preventDefault();
                  setNomeAluno(e.target.value);
                }}
                onFocus={() => setError("")}
              />

              <h2 className="text-xl tracking-wide py-1 px-1 text-zinc-200">
                Preparatório
              </h2>
              <CheckComp
                animateComp={{ opacity: [0, 1] }}
                transition={{ duration: 0 }}
                text="Aplicação"
                name="checkItem"
                id="aplicacao"
                htmlFor="aplicacao"
                value="aplicação"
              />
              <CheckComp
                animateComp={{ opacity: [0, 1] }}
                transition={{ duration: 0 }}
                text="CPM"
                name="checkItem"
                id="cpm"
                htmlFor="cpm"
                value="cpm"
              />
              <CheckComp
                animateComp={{ opacity: [0, 1] }}
                transition={{ duration: 0 }}
                text="CEMAM"
                name="checkItem"
                id="cemam"
                htmlFor="cemam"
                value="cemam"
              />

              {error ? (
                <p className="text-[14px] tracking-wide bg-zinc-900 py-2 pb-1 text-center text-red-500">
                  {error}
                </p>
              ) : (
                <></>
              )}
              <motion.button
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="btn_submit_form mt-1"
                onClick={async (e) => {
                  e.preventDefault();
                  await getChecks();
                  await updateAluno();
                }}
              >
                ATUALIZAR
              </motion.button>
            </div>
          </form>
        </motion.div>
      )}
    </div>
  );
};

export default UpdateStudentForm;
