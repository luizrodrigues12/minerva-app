"use client";

import Image from "next/image";
import NavHeader from "./NavHeader";
import Link from "next/link";
import Container from "./Container";

const Header = () => {
  return (
    <header className="bg-roxominerva px-5 md:p-0 h-16 text-lg w-full md:h-20 md:text-2xl lg:h-[72px] xl:h-[72px] flex justify-center">
      <Container>
        <div className="flex flex-row justify-between items-center w-full">
          <Link href={"/"}>
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
      </Container>
    </header>
  );
};

export default Header;
