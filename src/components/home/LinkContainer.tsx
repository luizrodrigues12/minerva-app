import { useSectionContext } from "@/contexts/section";
import {
  CalendarWeek,
  ProfileCard,
  UsersGroup,
} from "flowbite-react-icons/outline";
import { useRouter } from "nextjs-toploader/app";
import MoonIcon from "../header/svgs/moonIcon";
import { useUserContext } from "@/contexts/userData";

const LinkContainer = () => {
  const { section } = useSectionContext();
  const router = useRouter();
  const { user } = useUserContext();

  return (
    <div>
      <div className="h-full">
        <div
          className={`border-b-2  border-borderColor w-full p-2 px-3 text-black hover:bg-background01 cursor-pointer ${
            section === "students" ? "bg-background01" : ""
          }`}
        >
          <div className="flex items-center justify-start gap-3">
            {section === "students" && (
              <div className="bg-roxominerva h-5 w-1 rounded-2xl" />
            )}
            <UsersGroup size={40} strokeWidth={1} />
            <div
              className="flex justify-between items-center w-full pr-4"
              onClick={() => {
                router.push("/home");
              }}
            >
              <div>Alunos</div>
              <div>{user.alunos?.length}</div>
            </div>
          </div>
        </div>

        <div
          className={`border-b-2  border-borderColor w-full p-2 px-3 text-black hover:bg-background01 cursor-pointer ${
            section === "planning" ? "bg-background01" : ""
          }`}
        >
          <div className="flex items-center justify-start gap-3">
            <CalendarWeek size={40} strokeWidth={1} />
            <div className="flex justify-between items-center w-full pr-4">
              <div>Planejamentos</div>
              <div>3</div>
            </div>
          </div>
        </div>

        <div
          className={`border-b-2  border-borderColor w-full p-2 px-3 text-black hover:bg-background01 cursor-pointer ${
            section === "profile" ? "bg-background01" : ""
          }`}
        >
          <div className="flex items-center justify-start gap-3">
            <ProfileCard size={37} strokeWidth={1} className="ml-[2px]" />
            <div className="flex justify-between items-center w-full pr-4">
              <div>Perfil</div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`border-t-2 border-borderColor w-full p-3.5 px-3 pl-[20px] text-black hover:bg-background01 cursor-pointer absolute bottom-0`}
      >
        <div className="flex items-center justify-start gap-3">
          <MoonIcon className="size-6 stroke-[0.5]" />
          <div className="flex justify-between items-center w-full">
            <div>Escuro</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkContainer;
