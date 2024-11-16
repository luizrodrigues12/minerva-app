"use client";

import { validateEmail } from "@/utils/regex";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ForgetPassForm = () => {
  const router = useRouter();
  const [error, setError] = useState();
  const [email, setEmail] = useState("");

  const emailTest = validateEmail.test(email);

  const handleForm = async (e: any) => {
    try {
      if (!emailTest) throw new Error("Por favor, digite um email válido.");
      e.preventDefault();
      //Enviando post dos dados
      const response = await fetch(
        `${process.env.HOST}/api/user/forget_password/`,
        {
          method: "POST",
          body: JSON.stringify({ email }),
        }
      );
      router.push("/login");
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="px-8 md:self-center rounded-lg md:px-6 md:py-5 md:w-[400px] md:border-zinc-800 md:border-2">
      <form method="POST" onSubmit={handleForm} className="form_login_register">
        <div className="flex flex-col gap-2">
          <h1 className="h1_form">Redefinir Senha</h1>

          <p className="text-sm lg:text-[16px] leading-5 w-[100%]">
            Caso exista uma conta com esse email, você receberá um link para
            alterar sua senha.
          </p>

          <div className="div_form">
            <input
              type="email"
              name="email"
              id=""
              placeholder="Email"
              className="input_email_username"
              value={email}
              onChange={(e) => {
                e.preventDefault();
                setEmail(e.target.value);
              }}
              required
            />
          </div>
          {error ? <p>{error}</p> : <></>}
          <button type="submit" className="btn_submit_form">
            Enviar Email
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgetPassForm;
