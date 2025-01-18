import Button from "@/components/layout/Button";
import EyeComp from "@/components/layout/EyeComp";
import InputComp from "@/components/layout/InputComp";
import Loading from "@/components/layout/Loading";
import { useUserContext } from "@/contexts/userData";
import { validatePassword } from "@/utils/regex";
import { useState } from "react";

const ChangePasswordForm = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [isShowCurrent, setIsShowCurrent] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [isShowNew, setIsShowNew] = useState(false);
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");
  const { user } = useUserContext();
  const token = user.token;

  const changePassword = async () => {
    try {
      if (!currentPassword) throw new Error("Digite a senha atual.");
      if (!newPassword) throw new Error("Digite uma senha nova.");
      if (!validatePassword.test(newPassword))
        throw new Error("8 dígitos, uma letra maiúscula e um número.");
      if (!repeatPassword) throw new Error("Repita a senha.");
      if (newPassword !== repeatPassword)
        throw new Error("Senhas não condizentes.");

      setIsPosting(true);
      const res = await fetch(`${process.env.HOST}/api/user/change_password`, {
        method: "PUT",
        body: JSON.stringify({ token, currentPassword, newPassword }),
      });
      setIsPosting(false);
      const { success, error } = await res.json();
      if (success) {
        setMessage(success);
        setIsOpen(true);
      }
      if (error) throw new Error(error);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div>
      {!isPosting ? (
        <div>
          <div className="flex flex-col gap-1.5">
            <div className="relative">
              <InputComp
                placeholder="senha atual"
                className="!mt-0"
                type={isShowCurrent ? "text" : "password"}
                value={currentPassword || ""}
                onChange={(e) => setCurrentPassword(e.target.value)}
                onFocus={() => setError("")}
              />
              <EyeComp isShow={isShowCurrent} setIsShow={setIsShowCurrent} />
            </div>
            <div className="relative">
              <InputComp
                placeholder="nova senha"
                className="!mt-0"
                type={isShowNew ? "text" : "password"}
                value={newPassword || ""}
                onChange={(e) => setNewPassword(e.target.value)}
                onFocus={() => setError("")}
              />
              <EyeComp isShow={isShowNew} setIsShow={setIsShowNew} />
            </div>
            <div className="relative">
              <InputComp
                placeholder="repetir senha"
                className="!mt-0"
                type={isShowNew ? "text" : "password"}
                value={repeatPassword || ""}
                onChange={(e) => setRepeatPassword(e.target.value)}
                onFocus={() => setError("")}
              />
            </div>

            {error && (
              <p className="text-red-600 py-2.5 text-center text-[14px] md:text-[15px] bg-background03 rounded-md">
                {error}
              </p>
            )}
            <Button onClick={() => changePassword()}>Alterar senha</Button>

            {isOpen && (
              <div className="bg-background03 p-6 modal border-2 border-borderColor rounded-md shadow-md flex flex-col gap-2 w-[90%] md:w-[60%] lg:w-[30%] xl:w-[25%]">
                <div className="bg-background02 p-2.5 text-black rounded-md text-center text-[14px] md:text-[16px]">
                  {message}
                </div>
                <Button
                  whileHover={{ scale: 1.001 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setIsOpen(false)}
                >
                  Fechar
                </Button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default ChangePasswordForm;
