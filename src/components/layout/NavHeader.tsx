"use client";

import { UserCircle } from "flowbite-react-icons/outline";
import Link from "next/link";
import useUserStore from "@/stores/userStore";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
const NavHeader = () => {
  const tokenCookie = getCookie("authorization");
  const [token, setToken] = useState("");

  const getUser = async () => {
    const res = await fetch(`${process.env.HOST}/api/user/get_user`, {
      method: "POST",
      body: JSON.stringify({ token: tokenCookie }),
    });
    const { user } = await res.json();

    setToken(user.token);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      {!token ? (
        <div>
          <ul className="flex gap-5 md:gap-7 lg:gap-8 xl:gap-12 lg:text-[22px] xl:text-2xl">
            <li>
              <div
                onClick={() => (window.location.href = "/login")}
                className="hover:text-zinc-300 hover:shadow-sm hover:cursor-pointer"
              >
                Entrar
              </div>
            </li>
            <li>
              <div
                onClick={() => (window.location.href = "/register")}
                className="hover:text-zinc-300 hover:shadow-sm hover:cursor-pointer"
              >
                Registrar
              </div>
            </li>
          </ul>
        </div>
      ) : (
        <div>
          <div onClick={() => (window.location.href = "/profile")}>
            <UserCircle size={40} color={"rgb(228 228 231)"} />
          </div>
        </div>
      )}
    </>
  );
};

export default NavHeader;
