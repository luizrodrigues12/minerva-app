"use client";

import Button from "@/components/layout/Button";
import { CloseCircle, Image as ImageIcon } from "flowbite-react-icons/outline";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "motion/react";
import { Spinner } from "flowbite-react";
import { useAvatarMutate } from "@/hooks/useAvatarMutate";
import { useQueryClient } from "@tanstack/react-query";
import { useUserContext } from "@/contexts/userData";
import { useDeleteAvatar } from "@/hooks/useDeleteAvatar";

interface PhotoFormProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const PhotoForm = ({ setIsOpen }: PhotoFormProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const { mutate, isPending } = useAvatarMutate();
  const { mutate: deleteMutate } = useDeleteAvatar();
  const { user } = useUserContext();
  const queryClient = useQueryClient();

  const onDrop = useCallback((files: File[]) => {
    try {
      if (files[0]) {
        setIsSuccess(false);

        const reader = new FileReader();

        if (files[0].size > 10000000) throw new Error("Tamanho máximo: 10MB.");

        reader.onload = (e) => {
          const previewImage: HTMLImageElement =
            document.querySelector("#preview-image")!;
          previewImage.id = "preview-image";
          previewImage.src = e.target?.result as string;
        };

        reader.readAsDataURL(files[0]);
        setFile(files[0]);
      }
    } catch (error: any) {
      setError(error.message);
    }
  }, []);

  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    onDrop,
    maxSize: 10485760,
    onDropRejected(fileRejections, event) {
      setError("Arquivo rejeitado.");
    },
    accept: {
      "image/*": [".png", ".jpeg", ".jpg"],
    },
  });

  const PutPhoto = async () => {
    if (!file) {
      setError("Escolha uma foto clicando na imagem.");
      return;
    }

    mutate(
      { file: file! },
      {
        onError(error) {
          setError(error.message);
        },

        onSuccess: async (data) => {
          setIsSuccess(true);
          queryClient.setQueryData(["data-usuario"], () => {
            return data;
          });
        },
      }
    );
  };

  const deletePhoto = async () => {
    try {
      if (!user.avatar) throw new Error("Você não tem foto de perfil.");
      deleteMutate();
      setIsOpen(false);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <motion.div
      animate={{ opacity: [0, 1] }}
      transition={{ duration: 0.15 }}
      className="p-6 w-[280px] bg-background03 rounded-md border-[1px] border-borderColor text-[14px] md:text-[16px] text-textColor md:w-[300px] flex flex-col gap-4 items-center justify-center absolute translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] z-20"
    >
      <CloseCircle
        className="text-textColor absolute top-2 right-2 hover:text-inputText cursor-pointer"
        onClick={() => setIsOpen(false)}
      />
      <div className="flex flex-col items-center justify-center text-center">
        <p className="w-[80%]">
          Clique na imagem ou arraste o arquivo até aqui.
        </p>
        <div {...getRootProps()} id="container-avatar">
          {file ? (
            <div className="relative">
              <img
                id="preview-image"
                className={`rounded-md my-5 w-[150px] h-[150px] border-[2px] border-textColor cursor-pointer hover:brightness-75 object-cover ${
                  isDragActive ? "brightness-75" : "brightness-100"
                }`}
                onClick={() => setError("")}
              />
              {isPending && (
                <div className="size-full flex items-center justify-center absolute translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] z-20 backdrop-blur-[1px] backdrop-brightness-75">
                  <Spinner className="fill-white" />
                </div>
              )}
              {isSuccess && (
                <div className="dark:bg-background03 bg-textColor text-background03 dark:text-textColor p-2 absolute translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] z-20 w-[97.5%] text-[14px] md:text-[16px]">
                  Sucesso!
                </div>
              )}
            </div>
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
            await PutPhoto();
          }}
        >
          Salvar
        </Button>
        <Button className="w-full" onClick={async () => await deletePhoto()}>
          Remover Foto
        </Button>
      </div>
    </motion.div>
  );
};

export default PhotoForm;
