"use client";

import Button from "@/components/layout/Button";
import Container from "@/components/layout/Container";
import Loading from "@/components/layout/Loading";
import { useVerifyMutate } from "@/hooks/useVerifyMutate";
import { useRouter } from "nextjs-toploader/app";
import React, { useEffect, useState } from "react";

type EmailPageProps = {
  email: string;
};

const VerifyEmailPage = ({ email }: EmailPageProps) => {
  const { data, mutateAsync } = useVerifyMutate();

  useEffect(() => {
    mutateAsync({ email });
  }, []);

  return (
    <Container>
      {data?.error || data?.success ? (
        <div className="flex flex-col gap-3 text-black p-4 bg-background03 rounded-md shadow-sm">
          <div className="py-4 bg-background02 rounded-md text-[14px] md:text-[16px] text-center">
            {data.error ? data.error : data.success}
          </div>
          <Button onClick={() => window.location.replace("/home")}>
            Finalizar
          </Button>
        </div>
      ) : (
        <Loading />
      )}
    </Container>
  );
};

export default VerifyEmailPage;
