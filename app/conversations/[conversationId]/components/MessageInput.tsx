"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface MessageInputProps {
  id: string;
  placeholder?: string;
  errors: FieldErrors;
  register: UseFormRegister<FieldValues>;
  required?: boolean;
}
const MessageInput: React.FC<MessageInputProps> = ({
  id,
  placeholder,
  errors,
  required,
  register,
}) => {
  return (
    <div className="relative w-full">
      <input
        id={id}
        required={required}
        autoComplete={id}
        placeholder={placeholder}
        {...register(id, { required })}
        className="
          text-gray-800
          font-light
          py-2
          px-4
          w-full
          bg-neutral-100
          rounded-full
          focus:outline-none
        "
      />
    </div>
  );
};

export default MessageInput;
