"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useUserStore from "@/stores/userStore";
import { getCookie } from "cookies-next";

const LoginForm = () => {
  // State com os dados
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  // Call useRouter
  const router = useRouter();

  // Manipulando submit do formulário
  const handleForm = async (e: any) => {
    try {
      e.preventDefault();
      //Enviando post dos dados
      const response = await fetch(
        `https://minerva-app.netlify.app/api/user/login`,
        {
          method: "POST",
          body: JSON.stringify(formData),
        }
      );

      const json = await response.json();
      if (response.status !== 200) {
        throw new Error(json.error);
      }
      //Enviando para a home.

      router.push("/home");
    } catch (err: any) {
      setError(err.message);
    }
  };

  //Função para mostrar senha
  const showPassFunction = () => {
    const senha: any = document.getElementById("input-password");
    if (senha.type === "password") {
      senha.setAttribute("type", "text");
    } else {
      senha.setAttribute("type", "password");
    }
  };

  // Setando Token ZUSTAND
  const { setToken } = useUserStore();
  useEffect(() => {
    const token = getCookie("authorization");
    setToken(token as string);
  }, []);

  return (
    <div className="px-8 md:self-center rounded-lg md:px-6 md:w-[400px] md:border-zinc-800 md:border-2">
      <form
        method="POST"
        onSubmit={handleForm}
        className="flex flex-col gap-2 my-4"
      >
        <h1 className="text-zinc-200 text-2xl font-medium mb-1">Fazer login</h1>
        <div className="flex flex-col gap-2">
          <input
            type="email"
            name="email"
            id=""
            autoComplete="off"
            placeholder="Email"
            className="input_email_username"
            value={formData.email}
            onChange={(e) => {
              e.preventDefault();
              setFormData({
                ...formData,
                email: e.target.value.toLowerCase().trim(),
              });
            }}
            required
          />
          <div className="div_input_password">
            <input
              type="password"
              name="password"
              autoComplete="off"
              id="input-password"
              placeholder="Senha"
              className="input_password"
              value={formData.password}
              required
              onChange={(e) => {
                e.preventDefault();
                setFormData({
                  ...formData,
                  password: e.target.value.trim(),
                });
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
        {error && <p>{error}</p>}
        <button type="submit" className="btn_submit_form">
          Login
        </button>
        <div className="flex justify-between items-center">
          <Link href="/register" className="paragraph_form">
            Crie sua conta.
          </Link>
          <Link href="/forget_pass" className="paragraph_form">
            Esqueceu sua senha?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
