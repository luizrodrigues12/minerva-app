"use client";

import Container from "@/components/layout/Container";
import Image from "next/image";
import { motion } from "motion/react";
import { useRouter } from "nextjs-toploader/app";

const PrincipalPage = () => {
  const router = useRouter();
  return (
    <Container>
      <section className="from-[#CFCFCF] to-[#5249B6]"></section>
    </Container>
  );
};

export default PrincipalPage;
