"use client";

import Image from "next/image";
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/home");
  return (
    <main className="w-full h-full fundo_landing">
      <div className="flex justify-between">
        <div className=" h-screen flex flex-col justify-center items-center">
          <h2 className="font-medium text-[90px] text-zinc-800">MINERVA</h2>
        </div>
        <div className="image_persona w-[500px] h-screen"></div>
      </div>
    </main>
  );
}
