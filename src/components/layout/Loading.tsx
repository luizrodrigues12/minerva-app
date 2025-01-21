"use client";

import { useThemeContext } from "@/contexts/darkMode";
import { Spinner } from "flowbite-react";

const Loading = ({ className }: { className?: string }) => {
  const { theme } = useThemeContext();

  return (
    <div
      className={`min-h-screen w-full flex items-center justify-center fixed z-[100] top-0 left-0 ${
        theme === "dark" ? "dark:bg-[#151515]" : "bg-[#d4d4d4]"
      }   ${className}`}
    >
      <Spinner className="size-[25px] text-[#ffffffda] fill-[#4F47A8]" />
    </div>
  );
};

export default Loading;
