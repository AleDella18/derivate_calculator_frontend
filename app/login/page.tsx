"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLoginUser } from "@/app/hooks/useLoginUser";
import Link from "next/link";
import Alert from "../components/Badge";
import Loader from "../components/Loader";
import PasswordInput from "../components/PasswordInput";

export default function LoginPage() {
  const router = useRouter();
  const { mutate, isPending, isSuccess, isError, error } = useLoginUser();

  const [showError, setShowError] = useState(true);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    remember: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowError(true);

    mutate(
      {
        username: formData.username,
        password: formData.password,
      },
      {
        onSuccess: () => {
          router.push("/");
        },
      },
    );
  };

  const getErrorMessage = () => {
    if (!error?.message) return "Something went wrong";

    try {
      const parsed = JSON.parse(error.message);
      return parsed.detail || error.message;
    } catch {
      return error.message;
    }
  };

  return (
    <>
      {isPending && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <Loader />
        </div>
      )}

      {isError && showError && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
          <Alert
            message={getErrorMessage()}
            onClose={() => setShowError(false)}
          />
        </div>
      )}

      <section
        className="min-h-screen bg-no-repeat opacity-80"
        style={{
          fontFamily: "Consolas, monospace",
          backgroundImage: "url('/background.svg')",
          backgroundPosition: "bottom right",
          backgroundSize: "cover",
        }}
      >
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen lg:py-0">
          <div className="relative w-full sm:max-w-md xl:p-0 rounded-[40px] shadow-[0_20px_60px_rgba(0,0,0,0.25)] overflow-hidden">
            <div className="absolute inset-0 bg-[#8fa3ba] opacity-30 backdrop-blur-md"></div>
            <div className="relative p-6 space-y-4 sm:p-8">
              <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-[#9f9fed] md:text-2xl">
                Sign in to your Account
              </h1>

              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-bold text-gray-500"
                  >
                    Your username
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="username"
                    required
                    value={formData.username}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-400 dark:focus:border-gray-400"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-bold text-gray-500"
                  >
                    Your Password
                  </label>
                  <PasswordInput
                    name="password"
                    id="password"
                    placeholder="********"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-400 dark:focus:border-gray-400"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full text-white bg-[#9f9fed] hover:bg-[#8a8ae6] disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-sm px-5 py-2.5 transition duration-200"
                >
                  {isPending ? "Signing in..." : "Sign in"}
                </button>

                <p className="text-sm text-gray-500">
                  Don’t have an account yet?{" "}
                  <Link
                    href="/registration"
                    className="font-medium text-[#9f9fed] hover:text-[#8a8ae6] transition"
                  >
                    Sign up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
