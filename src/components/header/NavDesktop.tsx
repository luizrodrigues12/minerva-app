import { useSectionContext } from "@/contexts/section";
import { motion } from "motion/react";

const NavDesktop = () => {
  const { section, setSection } = useSectionContext();

  return (
    <nav className="hidden lg:block">
      <ul className="flex gap-[50px] text-[20px] lg:text-[16px] xl:text-[18px]">
        <motion.li
          whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
          className={`cursor-pointer hover:text-roxominerva ${
            section === "home" ? "text-roxominerva" : 0
          }`}
          onClick={() => setSection("home")}
        >
          home
        </motion.li>
        <motion.li
          whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
          className={`cursor-pointer hover:text-roxominerva ${
            section === "login" ? "text-roxominerva" : 0
          }`}
          onClick={() => setSection("login")}
        >
          login
        </motion.li>
        <motion.li
          whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
          className={`cursor-pointer hover:text-roxominerva ${
            section === "register" ? "text-roxominerva" : 0
          }`}
          onClick={() => setSection("register")}
        >
          registrar
        </motion.li>
      </ul>
    </nav>
  );
};

export default NavDesktop;
