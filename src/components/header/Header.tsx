"use client";

import Image from "next/image";
import NavHeader from "./NavHeader";
import Link from "next/link";
import Container from "../layout/Container";

const Header = () => {
  return (
    <header className="bg-roxominerva px-5 md:p-0 h-16 text-lg w-full md:h-20 md:text-2xl lg:h-[72px] xl:h-[72px] flex justify-center">
      <Container>
        <div className="flex flex-row justify-between items-center w-full">
          <Link href={"/"} className="flex justify-center items-center">
            <Image
              src={"/images/logo.png"}
              width={50}
              height={50}
              alt="Logo minerva"
              priority
              className="hover:brightness-[90%] size-[45px] md:size-[55px] lg:size-[3.6rem] xl:size-[3.4rem]"
            />
          </Link>
          {/* Dinamic NAV */}
          <div>
            <NavHeader />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
