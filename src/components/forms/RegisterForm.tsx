"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useUserStore from "@/stores/userStore";
import { getCookie } from "cookies-next";
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from "@/utils/regex";

const RegisterForm = () => {
  const router = useRouter();

  // Redirecionando caso haja token
  useEffect(() => {
    //Verificando token
    const token = getCookie("authorization");
  });

  // State com os dados
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  //Mostrar senha
  const showPassFunction = () => {
    const senha: any = document.getElementById("input-password");
    if (senha.type === "password") {
      senha.setAttribute("type", "text");
    } else {
      senha.setAttribute("type", "password");
    }
  };

  //REGEX
  const emailTest = validateEmail.test(formData.email);
  const passwordTest = validatePassword.test(formData.password);
  const usernameTest = validateUsername.test(formData.username);

  // Setando Token ZUSTAND
  const { setToken } = useUserStore();
  useEffect(() => {
    const token = getCookie("authorization");
    setToken(token as string);
  }, []);

  const handleForm = async (e: any) => {
    try {
      e.preventDefault();
      // REGEX
      if (!emailTest) {
        setError("Digite um email válido.");
      }
      if (!passwordTest) {
        setError(
          "A senha deve conter pelo menos oito digitos, uma letra e um número."
        );
      }
      if (!usernameTest) {
        setError(
          "O nome de usuário só pode conter letras, números e underline. "
        );
      }
      //Enviando post dos dados
      if (passwordTest && emailTest && usernameTest) {
        const response = await fetch(`${process.env.HOST}/api/user/cadastro`, {
          method: "POST",
          body: JSON.stringify(formData),
        });
        const json = await response.json();
        if (response.status !== 201) {
          throw new Error(json.error);
        }
        router.push("/login");
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="px-8 md:self-center rounded-lg md:px-6 md:w-[400px] md:border-zinc-800 md:border-2">
      <form
        method="POST"
        onSubmit={handleForm}
        className="flex flex-col gap-2 my-4"
      >
        <h1 className="text-zinc-200 text-2xl font-medium mb-1">Registrar</h1>
        <div className="flex flex-col gap-2">
          {/* USERNAME*/}
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Usuário"
            className="input_email_username"
            required
            autoComplete="off"
            value={formData.username}
            onChange={(e) => {
              e.preventDefault();
              setFormData({
                ...formData,
                username: e.target.value.toLowerCase().trim(),
              });
            }}
            onFocus={() => {
              setError("");
            }}
          />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            className="input_email_username"
            required
            autoComplete="off"
            value={formData.email}
            onChange={(e) => {
              e.preventDefault();
              setFormData({
                ...formData,
                email: e.target.value.toLowerCase().trim(),
              });
            }}
            onFocus={() => {
              setError("");
            }}
          />
          <div className="div_input_password">
            <input
              type="password"
              name="password"
              id="input-password"
              placeholder="Senha"
              className="input_password"
              autoComplete="off"
              required
              value={formData.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value.trim() });
              }}
              onFocus={() => {
                setError("");
              }}
            />
            <button
              type="button"
              className="btn_show_password"
              onClick={showPassFunction}
            >
              mostrar
            </button>
          </div>
        </div>
        {error && <p className="error_form">{error}</p>}
        <button type="submit" className="btn_submit_form">
          Registrar
        </button>
        <Link href={"/login"} className="paragraph_form">
          Já tem uma conta?
        </Link>
      </form>
    </div>
  );
};

export default RegisterForm;
