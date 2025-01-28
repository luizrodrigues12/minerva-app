"use client";

import Button from "@/components/layout/Button";
import React from "react";

interface DeleteAccountProps {
  deleteAccount: () => Promise<void>;
}

const DeleteAccount = ({ deleteAccount }: DeleteAccountProps) => {
  return (
    <div className="flex flex-col gap-2 text-textColor">
      <div className="p-3 bg-background03 rounded-md text-[14px] md:text-[16px]">
        Ao clicar em excluir, todos os seus dados serão permanentemente apagados
        desse site.
      </div>
      <Button className="dark:!bg-red-800 !bg-red-700" onClick={deleteAccount}>
        Excluir
      </Button>
    </div>
  );
};

export default DeleteAccount;
