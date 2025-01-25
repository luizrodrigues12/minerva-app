import { UserCircle } from "flowbite-react-icons/outline";
import Container from "../layout/Container";
import { useUserContext } from "@/contexts/userData";
import Image from "next/image";

const PerfilContainer = () => {
  const { user } = useUserContext();

  return (
    <Container className="border-b-[1px] border-borderColor">
      {user && (
        <div className="flex items-center justify-center">
          <div className="flex items-center text-textColor justify-center w-full gap-2">
            <div className="flex-grow size-[88px] bg-background03 rounded-md">
              {user.avatar ? (
                <Image
                  src={user.avatar}
                  alt={`Avatar de ${user.username}`}
                  width={90}
                  height={90}
                  className="min-w-[88px] max-h-[88px] rounded-md object-cover"
                />
              ) : (
                <UserCircle size={88} strokeWidth={0.5} />
              )}
            </div>

            <div className="flex flex-col justify-between h-full gap-2 w-full flex-shrink">
              <div className="w-full flex items-center justify-center bg-background03 rounded-md p-2 pl-2.5">
                {user.username.length <= 17
                  ? user.username
                  : user.username.slice(0, 17) + "..."}
              </div>
              <div className="flex items-center justify-center bg-background03 rounded-md w-full p-2 pl-2.5">
                Educador(a)
              </div>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default PerfilContainer;
