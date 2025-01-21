import { useSectionContext } from "@/contexts/section";
import {
  CalendarWeek,
  Moon,
  ProfileCard,
  Sun,
  UsersGroup,
} from "flowbite-react-icons/outline";
import { useRouter } from "nextjs-toploader/app";
import MoonIcon from "../header/svgs/moonIcon";
import { useUserContext } from "@/contexts/userData";
import { useThemeContext } from "@/contexts/darkMode";

const LinkContainer = () => {
  const { section } = useSectionContext();
  const router = useRouter();
  const { user } = useUserContext();
  const { toggleTheme, theme } = useThemeContext();

  return (
    <div>
      <div className="h-full text-textColor">
        <div
          className={`border-b-2  border-borderColor w-full p-2 px-3 hover:bg-background03 cursor-pointer ${
            section === "students" ? "bg-background03" : "bg-background02"
          }`}
          onClick={() => {
            router.push("/home");
          }}
        >
          <div className="flex items-center justify-start gap-3">
            <UsersGroup size={40} strokeWidth={1} />
            <div className="flex justify-between items-center w-full pr-4">
              <div>Alunos</div>
              <div>{user.alunos?.length}</div>
            </div>
          </div>
        </div>

        <div
          className={`border-b-2  border-borderColor w-full p-2 px-3 hover:bg-background03 cursor-pointer ${
            section === "planning" ? "bg-background03" : "bg-background02"
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
          className={`border-b-2  border-borderColor w-full p-2 px-3 hover:bg-background03 cursor-pointer ${
            section === "profile" ? "bg-background03" : "bg-background02"
          }`}
          onClick={() => {
            router.push("/profile");
          }}
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
        className={`border-b-2 border-borderColor w-full px-3 text-textColor hover:bg-background03 cursor-pointer flex justify-start items-center`}
        onClick={() => toggleTheme()}
      >
        <div
          className={`flex items-center justify-center  ${
            theme === "dark gap-[13px]" ? "py-[1px]" : "py-[3.5px] gap-[14px]"
          }`}
        >
          {theme == "dark" ? (
            <Sun size={50} strokeWidth={1.5} className="ml-[3px]" />
          ) : (
            <Moon size={45} strokeWidth={1} className="ml-[5px]" />
          )}

          <div className="flex justify-between items-center w-full">
            <div>{theme === "dark" ? "Claro" : "Escuro"}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkContainer;
