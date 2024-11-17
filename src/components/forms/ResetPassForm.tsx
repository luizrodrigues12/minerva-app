"use client";

import { getCookie } from "cookies-next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const ForgetPassForm = () => {
  const [finalizado, setFinalizado] = useState(false);

  //PEgando params
  const _id = usePathname();
  const realId = _id.slice(20);

  //Função pra mostar senha
  const showPassFunction = () => {
    const senha: any = document.getElementById("input-password");
    if (senha.type === "password") {
      senha.setAttribute("type", "text");
    } else {
      senha.setAttribute("type", "password");
    }
  };

  const handleFormEdit = (event: any, name: string) => {
    setFormData({ ...formData, [name]: event.target.value });
  };

  const handleForm = async (e: any) => {
    try {
      e.preventDefault();
      //Enviando post dos dados
      const response = await fetch(
        `${process.env.HOST}/api/user/reset_password/`,
        {
          method: "PUT",
          body: JSON.stringify(formData),
        }
      );

      setFinalizado(true);
    } catch (error: any) {
      console.log(error.message);
    }
  };
  //
  //
  const [formData, setFormData] = useState({
    newPass: "",
    _id: realId,
  });
  return (
    <>
      {!finalizado ? (
        <div className="px-8 md:self-center rounded-lg md:px-6 md:py-4 my-2 md:w-[400px] md:border-zinc-800 md:border-2">
          <form method="POST" className="form_reset_password">
            <h1 className="h1_form">Redefinir Senha</h1>
            <div className="div_form">
              <div className="div_input_password">
                <input
                  type="password"
                  name="password"
                  id="input-password"
                  placeholder="Nova senha"
                  className="input_password"
                  value={formData.newPass}
                  required
                  onChange={(e) => {
                    e.preventDefault();
                    setFormData({
                      ...formData,
                      newPass: e.target.value,
                    });
                  }}
                />
                <button
                  type="button"
                  className="btn_show_password"
                  onClick={showPassFunction}
                >
                  show
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="btn_submit_form"
              onClick={async (e) => {
                await handleForm(e);
                window.location.replace("/login");
              }}
            >
              Redefinir
            </button>
          </form>
        </div>
      ) : (
        <div className="flex justify-center items-center pt-20">
          {" "}
          <Link
            href="/login"
            className=" bg-roxominerva rounded-lg p-2 text-2xl"
          >
            Fazer Login
          </Link>
        </div>
      )}
    </>
  );
};

export default ForgetPassForm;
