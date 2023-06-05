import Image from "next/image";
import AuthForm from "@/app/(side)/components/AuthForm";

export default function Home() {
  return (
    <main
      className="
        flex
        min-h-screen
        justify-center
        py-12
        sm:px-6
        lg:px-8
        bg-gray-200
      "
    >
      <div
        className="
          m-auto
          w-full
          max-w-md
        "
      >
        <Image
          alt="logo"
          src="/img/logo.png"
          width="38"
          height="38"
          className="mx-auto w-auto"
        />
        <h2
          className="
            mt-3
            text-center
            text-lg
            tracking-tight
            text-gray-800
          "
        >
          Sign in to your account
        </h2>
        <AuthForm />
      </div>
    </main>
  );
}
