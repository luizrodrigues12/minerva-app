"use client";

import Button from "@/components/layout/Button";
import Container from "@/components/layout/Container";
import Loading from "@/components/layout/Loading";
import { useUserContext } from "@/contexts/userData";
import { useRouter } from "nextjs-toploader/app";
import React, { useEffect, useState } from "react";

type EmailPageProps = {
  email: string;
};

const VerifyEmailPage = ({ email }: EmailPageProps) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [message, setMessage] = useState("");

  const verifyEmail = async () => {
    try {
      setIsPosting(true);
      const res = await fetch(`${process.env.HOST}/api/user/verify_email`, {
        method: "PUT",
        body: JSON.stringify({ email, verifyEmail: true }),
      });
      const { success, error } = await res.json();
      setIsPosting(false);
      if (error) throw new Error(error);
      if (success) setMessage(success);
    } catch (error: any) {
      setError(error.message);
    }

    setTimeout(() => {
      window.location.replace("/home");
    }, 5000);
  };

  useEffect(() => {
    verifyEmail();
  }, []);

  return (
    <Container>
      {!isPosting ? (
        <div className="flex flex-col gap-3 text-black p-4 bg-background03 rounded-md shadow-sm">
          <div className="py-4 bg-background02 rounded-md text-[14px] md:text-[16px] text-center">
            {message ? message : error}
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
