"use client";

import { UserCircle } from "flowbite-react-icons/outline";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { usePathname } from "next/navigation";

const NavHeader = () => {
  const tokenCookie = getCookie("authorization");
  const [token, setToken] = useState("");
  const path = usePathname();

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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      {!(
        path === "/login" ||
        path === "/register" ||
        path === "/forget_pass"
      ) ? (
        <Link href={"/profile"} prefetch>
          <UserCircle
            color={"rgb(228 228 231)"}
            className="mt-[2px] size-[45px] md:size-[55px] lg:size-[57px] stroke-[0.8] tracking-tighter"
          />
        </Link>
      ) : (
        <div>
          <ul className="flex gap-5 md:gap-7 lg:gap-8 xl:gap-12 lg:text-[22px] xl:text-2xl">
            <li>
              <Link
                href={"/login"}
                prefetch={true}
                className="hover:text-zinc-300 hover:shadow-sm hover:cursor-pointer"
              >
                Entrar
              </Link>
            </li>
            <li>
              <Link
                href={"/register"}
                prefetch={true}
                className="hover:text-zinc-300 hover:shadow-sm hover:cursor-pointer"
              >
                Registrar
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default NavHeader;
