"use client";

import { UserCircle } from "flowbite-react-icons/outline";
import Link from "next/link";
import useUserStore from "@/stores/userStore";
import { useEffect, useState } from "react";
const NavHeader = () => {
  const { token: tokenCookie } = useUserStore();
  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(tokenCookie);
  });

  return (
    <>
      {!token ? (
        <div>
          <ul className="flex gap-5 md:gap-7 lg:gap-8 xl:gap-12 lg:text-[22px] xl:text-2xl">
            <li>
              <Link
                href={`${process.env.NEXT_PUBLIC_HOST}/login`}
                className="hover:text-zinc-300 hover:shadow-sm"
              >
                Entrar
              </Link>
            </li>
            <li>
              <Link
                href={`${process.env.NEXT_PUBLIC_HOST}/register`}
                className="hover:text-zinc-300 hover:shadow-sm"
              >
                Registrar
              </Link>
            </li>
          </ul>
        </div>
      ) : (
        <div>
          <Link href={`${process.env.NEXT_PUBLIC_HOST}/profile`}>
            <UserCircle size={40} color={"rgb(228 228 231)"} />
          </Link>
        </div>
      )}
    </>
  );
};

export default NavHeader;
