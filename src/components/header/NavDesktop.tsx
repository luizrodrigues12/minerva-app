import { useSectionContext } from "@/contexts/section";
import { motion } from "motion/react";
import { useRouter } from "nextjs-toploader/app";

const NavDesktop = () => {
  const { section } = useSectionContext();
  const router = useRouter();

  return (
    <nav className="hidden lg:block">
      <ul className="flex gap-[50px] text-[20px] lg:text-[16px] xl:text-[18px]">
        <motion.li
          whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
          whileTap={{ scale: 1 }}
          className={`cursor-pointer hover:text-roxominerva ${
            section === "home" ? "text-roxominerva" : 0
          }`}
          onClick={() => {
            router.push("/");
          }}
        >
          home
        </motion.li>
        <motion.li
          whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
          whileTap={{ scale: 1 }}
          className={`cursor-pointer hover:text-roxominerva ${
            section === "login" ? "text-roxominerva" : 0
          }`}
          onClick={() => {
            router.push("/login");
          }}
        >
          login
        </motion.li>
        <motion.li
          whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
          whileTap={{ scale: 1 }}
          className={`cursor-pointer hover:text-roxominerva ${
            section === "register" ? "text-roxominerva" : 0
          }`}
          onClick={() => {
            router.push("/register");
          }}
        >
          registrar
        </motion.li>
      </ul>
    </nav>
  );
};

export default NavDesktop;
