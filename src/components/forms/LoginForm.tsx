"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import useUserStore from "@/stores/userStore";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const token = getCookie("authorization");
  const router = useRouter();

  // State com os dados
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  // Manipulando submit do formulário
  const handleForm = async (e: any) => {
    try {
      e.preventDefault();

      //Enviando post dos dados
      await fetch(`${process.env.HOST}/api/user/login`, {
        method: "POST",
        body: JSON.stringify(formData),
      });
      //Enviando para a home.
      setTimeout(() => {
        console.log("Acabou");
        router.push("/home");
      }, 2000);
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
    setToken(token!);
  }, []);

  return (
    <div className="px-8 md:self-center rounded-lg md:px-6 md:w-[400px] md:border-zinc-800 md:border-2">
      <form
        method="POST"
        className="flex flex-col gap-2 my-4"
        onSubmit={handleForm}
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
        <button className="btn_submit_form" type="submit">
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
