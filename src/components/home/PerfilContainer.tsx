import Image from "next/image";

type PerfilProps = {
  username: string;
};

const PerfilContainer = ({ username }: PerfilProps) => {
  return (
    <div className="flex items-center justify-center border-b-2 border-borderColor">
      <div className="flex items-center text-[#202020] justify-center w-full gap-3 px-2 lg:py-4 2xl:py-6">
        <Image
          src={"/images/blank-user.jpg"}
          alt="Foto do usuário"
          width={100}
          height={100}
          className="rounded-lg size-[100px] lg:size-[90px] 2xl:size-[90px]"
          style={{ boxShadow: "0px 0px 4px #00000010" }}
        />

        <div
          className="h-full w-[60%] p-2 flex flex-col justify-between gap-3 bg-background01 rounded-md text-[14px] lg:gap-1 lg:p-2"
          style={{ boxShadow: "0px 0px 4px #00000010" }}
        >
          <div className="w-full flex items-center justify-start bg-background02 rounded-md p-2 pl-2.5">
            {username.length <= 17 ? username : username.slice(0, 17) + "..."}
          </div>
          <div className="flex items-center justify-start bg-background02 rounded-md w-full p-2 pl-2.5">
            Educador(a)
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfilContainer;
