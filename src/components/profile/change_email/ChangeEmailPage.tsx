"use client";

import Button from "@/components/layout/Button";
import Container from "@/components/layout/Container";
import Loading from "@/components/layout/Loading";
import { useUserContext } from "@/contexts/userData";
import { useRouter } from "nextjs-toploader/app";
import { useEffect, useState } from "react";

type ChangeEmailProps = {
  emailTokenReceived: string;
};

const ChangeEmailPage = ({ emailTokenReceived }: ChangeEmailProps) => {
  const [isPosting, setIsPosting] = useState<boolean>();
  const [error, setError] = useState("");
  const [message, setMessage] = useState();
  const { refetch } = useUserContext();
  const router = useRouter();

  const changeEmailPut = async () => {
    try {
      setIsPosting(true);
      const res = await fetch(`/api/user/change_email`, {
        method: "PUT",
        body: JSON.stringify({ emailTokenReceived, changeEmail: true }),
      });
      const data = await res.json();
      const { success, error } = data;
      setIsPosting(false);
      success ? setMessage(success) : setError(error);
    } catch (error: any) {
      setError(error.message);
    }
  };

  useEffect(() => {
    changeEmailPut();
  }, []);

  return (
    <Container>
      {!isPosting ? (
        <div className="flex flex-col gap-3 text-black p-4 bg-background03 rounded-md shadow-sm">
          <div className="py-4 bg-background02 rounded-md text-[14px] md:text-[16px] text-center">
            {message ? message : error}
          </div>

          <Button onClick={() => router.replace("/home")}>Finalizar</Button>
        </div>
      ) : (
        <Loading />
      )}
    </Container>
  );
};

export default ChangeEmailPage;
