"use client";

import { useState, useCallback, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BsGithub, BsGoogle } from "react-icons/bs";
import axios from "axios";
import { toast } from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import AuthSocialButton from "@/app/(side)/components/AuthSocialButton";
import Button from "@/app/components/Button";
import Input from "@/app/components/Input/InputBase";
import { toastOptions } from "@/app/const";

type VariantType = "LOGIN" | "REGISTER";
type SocialActionType = "google" | "github";

export interface FieldsModel {
  name: string;
  email: string;
  password: string;
}

const AuthForm = () => {
  const [variant, setVariant] = useState<VariantType>("LOGIN");
  const [loading, setLoading] = useState<boolean>(false);
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/users");
    }
  }, [session?.status, router]);

  const toggleVariant = useCallback(() => {
    variant === "LOGIN" ? setVariant("REGISTER") : setVariant("LOGIN");
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldsModel>({
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSubmit: SubmitHandler<FieldsModel> = (data) => {
    setLoading(true);
    if (variant === "REGISTER") {
      axios
        .post("/api/register", data)
        .then(() => {
          signIn("credentials", { ...data });
          toast.success("User has been registered", toastOptions);
        })
        .catch((error: unknown) => {
          const errorMessage =
            error instanceof Error ? error.message : "Something went wrong";
          toast.error(errorMessage, toastOptions);
        })
        .finally(() => {
          setLoading(false);
        });
    }
    if (variant === "LOGIN") {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid credentials", toastOptions);
          }
          if (callback?.ok && !callback?.error) {
            router.push("/users");
            toast.success("User has been logged in", toastOptions);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const socialAction = (action: SocialActionType) => {
    setLoading(true);
    signIn(action, {
      redirect: false,
    })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Invalid credentials", toastOptions);
        }
        if (callback?.ok && !callback?.error) {
          toast.success("User has been logged in", toastOptions);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div
      className="
        mt-4
        mx-auto
        w-full
      "
    >
      <div
        className="
          bg-white
          mx-2
          p-4
          shadow
          rounded-lg
        "
      >
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <Input
              label="Name"
              type="text"
              id="name"
              register={register}
              errors={errors}
              disabled={loading}
            />
          )}
          <Input
            label="Email"
            type="email"
            id="email"
            register={register}
            errors={errors}
            disabled={loading}
          />
          <Input
            label="Password"
            id="password"
            type="password"
            register={register}
            errors={errors}
            disabled={loading}
          />
          <Button fullWidth type="submit" disabled={loading}>
            {variant === "LOGIN" ? "Sign in" : "Register"}
          </Button>
        </form>
        <div className="mt-4">
          <div className="relative">
            <div
              className="
                absolute
                flex
                inset-0
                items-center
              "
            >
              <div
                className="
                  w-full
                  border-t
                  border-gray-300
                "
              />
            </div>
            <div
              className="
                justify-center
                flex
                relative
                text-sm
              "
            >
              <span
                className="
                  px-2
                  bg-white
                  text-gray-500
                "
              >
                Or continue with
              </span>
            </div>
          </div>
          <div className="mt-4 flex gap-1">
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialAction("github")}
              disabled={loading}
            />
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialAction("google")}
              disabled={loading}
            />
          </div>
          <div
            className="
              flex
              gap-2
              justify-center
              text-sm
              mt-6
              px-2
              text-gray-500
            "
          >
            <div>
              {variant === "LOGIN"
                ? "New to Messenger?"
                : "Already have an account?"}
            </div>
            <div
              onClick={toggleVariant}
              className="
                underline
                cursor-pointer
                text-sky-600
              "
            >
              {variant === "LOGIN" ? "Create an account" : "Login"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
