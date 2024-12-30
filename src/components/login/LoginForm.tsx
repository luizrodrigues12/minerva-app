"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "nextjs-toploader/app";

const LoginForm = () => {
  // State com os dados
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  // Manipulando submit do formulário
  const handleLogin = async (e: any) => {
    try {
      e.preventDefault();
      //Enviando post dos dados
      const res = await fetch(`${process.env.HOST}/api/user/login`, {
        method: "POST",
        body: JSON.stringify(formData),
      });
      //Mostrando error
      const { error } = await res.json();
      if (error) throw new Error(error);
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

  return (
    <div className="w-full px-8 md:self-center rounded-lg md:px-6 md:w-[400px] md:border-zinc-800 md:border-2 height_pattern">
      <form method="POST" className="flex flex-col gap-2 my-4">
        <h1 className="text-zinc-200 text-2xl font-medium mb-1">Fazer login</h1>
        <div className="flex flex-col gap-2">
          <input
            type="email"
            name="email"
            id=""
            autoComplete="email"
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
              className="btn_show_password hover:text-zinc-300"
              onClick={showPassFunction}
            >
              mostrar
            </button>
          </div>
        </div>
        {error && <p>{error}</p>}
        <button
          className="btn_submit_form hover:bg-[#453e92] text-zinc-300"
          type="submit"
          onClick={(e) => handleLogin(e)}
        >
          Login
        </button>
        <div className="flex justify-between items-center">
          <Link href={"/register"} prefetch={true} className="paragraph_form">
            Crie sua conta.
          </Link>
          <Link href={"/forget_pass"} prefetch className="paragraph_form">
            Esqueceu sua senha?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
