import { UserCircle } from "flowbite-react-icons/outline";
import Image from "next/image";

type PerfilProps = {
  username: string;
};

const PerfilContainer = ({ username }: PerfilProps) => {
  return (
    <div className="flex items-center justify-center border-b-2 border-borderColor">
      <div className="flex items-center text-[#202020] justify-center w-full gap-2 px-2 md:px-6 lg:py-6 2xl:py-8">
        <div className="bg-background03 text-[#414141] rounded-md">
          <UserCircle size={90} strokeWidth={0.5} />
        </div>
        <div className="flex flex-col justify-between h-full gap-2 w-full">
          <div className="w-full flex items-center justify-center bg-background03 rounded-md p-2 pl-2.5">
            {username.length <= 17 ? username : username.slice(0, 17) + "..."}
          </div>
          <div className="flex items-center justify-center bg-background03 rounded-md w-full p-2 pl-2.5">
            Educador(a)
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfilContainer;
