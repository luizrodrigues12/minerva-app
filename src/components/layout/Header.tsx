"use client";

import Image from "next/image";
import NavHeader from "./NavHeader";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-roxominerva h-16 pl-5 pr-5 text-lg md:px-6 w-screen md:h-20 md:text-2xl lg:h-[72px] xl:h-[72px] flex justify-center">
      <div className="flex flex-row justify-between items-center md:w-[80vw] lg:w-[90vw] xl:w-[95vw] w-screen  ">
        <Link href={"/home"} prefetch>
          <Image
            src={"/images/logo.png"}
            width={50}
            height={50}
            alt="Logo minerva"
            priority
            className="hover:brightness-75 w-12 h-12 md:w-16 md:h-16 lg:w-[4.0rem] lg:h-[4.0rem] xl:w-[60px] xl:h-[60px]"
          />
        </Link>
        {/* Dinamic NAV */}
        <div>
          <NavHeader />
        </div>
      </div>
    </header>
  );
};

export default Header;
