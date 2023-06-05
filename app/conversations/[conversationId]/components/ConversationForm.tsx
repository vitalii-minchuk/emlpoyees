"use client";

import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import { CldUploadButton } from "next-cloudinary";

import useConversation from "@/app/hooks/useConversation";
import MessageInput from "@/app/conversations/[conversationId]/components/MessageInput";

const ConversationForm = () => {
  const { conversationId } = useConversation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    axios.post("/api/messages", {
      ...data,
      conversationId,
    });
  };

  const handelUpload = (result: any) => {
    axios.post("/api/messages", {
      image: result?.info?.secure_url,
      conversationId,
    });
  };

  return (
    <div
      className="
          p-4
          bg-white
          border-t
          flex
          items-center
          justify-between
          gap-2
          lg:gap-4
          w-full
          mt-auto
        "
    >
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onUpload={handelUpload}
        uploadPreset="kf17bwas"
      >
        <HiPhoto size={24} className="text-sky-500" />
      </CldUploadButton>
      <form
        className="
          flex
          items-center
          gap-2
          lg:gap-4
          w-full
        "
        onSubmit={handleSubmit(onSubmit)}
      >
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          required
          placeholder="Wright a message"
        />
        <button
          type="submit"
          className="
              bg-sky-500
              hover:bg-sky-600
              p-2
              rounded-full
              cursor-pointer
              transition
            "
        >
          <HiPaperAirplane size={18} className="text-white" />
        </button>
      </form>
    </div>
  );
};

export default ConversationForm;
