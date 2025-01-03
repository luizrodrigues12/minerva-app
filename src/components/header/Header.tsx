"use client";

import { getCookie } from "cookies-next/client";
import { motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSectionContext } from "@/contexts/section";

const Header = () => {
  const tokenCookie = getCookie("authorization");
  const [token, setToken] = useState<string>();
  const { section, setSection } = useSectionContext();

  const getUser = async () => {
    try {
      const res = await fetch(`${process.env.HOST}/api/user/get_user`, {
        method: "POST",
        body: JSON.stringify({ token: tokenCookie }),
      });
      const { user } = await res.json();
      if (!user) throw new Error("Usuário não encontrado");

      setToken(user.token);
    } catch (error) {
      setToken("");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <header className="flex items-center h-[100px] w-full bg-background01 text-black font-inter border-b-2 border-borderColor">
      <div className="w-full px-[195px] flex items-center justify-between">
        <motion.div className="text-[24px] hover:text-roxominerva cursor-pointer leading-5">
          <Link href={token ? "/home" : "/"}>Minerva</Link>
        </motion.div>
        {token?.length === 0 ? (
          <nav>
            <ul className="flex gap-[50px] text-[20px]">
              <motion.li
                whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
                className={`cursor-pointer hover:text-roxominerva ${
                  section === "home" ? "text-roxominerva" : 0
                }`}
                onClick={() => setSection("home")}
              >
                home
              </motion.li>
              <motion.li
                whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
                className={`cursor-pointer hover:text-roxominerva ${
                  section === "login" ? "text-roxominerva" : 0
                }`}
                onClick={() => setSection("login")}
              >
                login
              </motion.li>
              <motion.li
                whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
                className={`cursor-pointer hover:text-roxominerva ${
                  section === "register" ? "text-roxominerva" : 0
                }`}
                onClick={() => setSection("register")}
              >
                registrar
              </motion.li>
            </ul>
          </nav>
        ) : (
          <nav>
            <div
              className="bg-roxominerva h-[50px] px-[30px] flex items-center rounded-[4px] text-zinc-200"
              style={{ boxShadow: "2px 2px 4px #00000020" }}
            >
              Logout
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
