"use client";

import clsx from "clsx";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { FieldsModel } from "@/app/(side)/components/AuthForm";

interface InputProps {
  placeholder?: string;
  label?: string;
  id: keyof FieldsModel;
  type?: "password" | "text" | "number" | "email";
  errors: FieldErrors;
  register: UseFormRegister<FieldsModel | FieldValues>;
  disabled?: boolean;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  placeholder,
  errors,
  register,
  type = "text",
  required,
  disabled,
}) => {
  return (
    <div>
      {label && (
        <label
          className="
            block
            text-sm
            font-medium
            leading-6
            text-gray-900
          "
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <div className="mt-2 bg-white">
        <input
          id={id}
          required={required}
          type={type}
          disabled={disabled}
          autoComplete={id}
          placeholder={placeholder}
          {...register(id, { required })}
          className={clsx(
            `
            form-input
            block
            w-full
            rounded-md
            border-0
            p-2
            text-gray-900
            shadow-sm
            ring-1
            ring-inset
            ring-gray-300
            placeholder:text-gray-400
            focus:ring-2
            focus:ring-outset
            focus:ring-sky-600
            sm:text-sm
            sm:leading-6
          `,
            errors[id] && "focus:ring-rose-500",
            disabled && "opacity-50 cursor-default"
          )}
        />
      </div>
    </div>
  );
};

export default Input;
