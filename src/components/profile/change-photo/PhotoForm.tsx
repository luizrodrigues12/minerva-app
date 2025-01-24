"use client";

import Button from "@/components/layout/Button";
import { Image as ImageIcon } from "flowbite-react-icons/outline";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "motion/react";
import { useUserContext } from "@/contexts/userData";

interface PhotoFormProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const PhotoForm = ({ setIsOpen }: PhotoFormProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");

  const onDrop = useCallback((files: File[]) => {
    if (files[0]) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const previewImage: HTMLImageElement =
          document.querySelector("#preview-image")!;
        previewImage.id = "preview-image";
        previewImage.src = e.target?.result as string;
      };

      reader.readAsDataURL(files[0]);
      setFile(files[0]);

      return;
    }
    setError("Arquivo inválido.");
  }, []);

  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    onDrop,
    maxSize: 10485760,
    onDropRejected(fileRejections, event) {
      console.log(fileRejections);
    },
    accept: {
      "image/*": [".png", ".jpeg", ".jpg"],
    },
  });

  return (
    <motion.div
      animate={{ opacity: [0, 1] }}
      transition={{ duration: 0.15 }}
      className="p-6 w-[280px] bg-background03 rounded-md border-[1px] border-borderColor modal text-[14px] md:text-[16px] text-textColor md:w-[300px] flex flex-col gap-4 items-center justify-center"
    >
      <div className="flex flex-col items-center justify-center text-center">
        <p className="w-[80%]">
          Clique na imagem ou arraste o arquivo até aqui.
        </p>
        <div {...getRootProps()} id="container-avatar">
          {file ? (
            <img
              id="preview-image"
              className={`rounded-full my-5 w-[150px] h-[150px] border-[2px] border-textColor cursor-pointer hover:brightness-75 ${
                isDragActive ? "brightness-75" : "brightness-100"
              }`}
              onClick={() => setError("")}
            />
          ) : (
            <ImageIcon
              className={`size-32 stroke-[0.5px] hover:text-corIcones cursor-pointer ${
                isDragActive ? "text-corIcones" : "text-textColor"
              }`}
              onClick={() => setError("")}
            />
          )}
        </div>
        <p className="text-[12px] md:text-[14px] text-inputText ">
          {file ? file.name : "JPG, JPEG ou PNG até 10MB."}
        </p>

        {error && (
          <p className="text-errorColor text-[12px] md:text-[14px] mt-2 pb-0">
            {error}
          </p>
        )}
        <input {...getInputProps()} className="hidden" />
      </div>

      <div className="flex flex-col gap-1.5 w-full">
        <Button
          className="w-full"
          onClick={async () => {
            console.log("clicado");
          }}
        >
          Salvar
        </Button>
        <Button className="w-full" onClick={() => setIsOpen(false)}>
          Cancelar
        </Button>
      </div>
    </motion.div>
  );
};

export default PhotoForm;
