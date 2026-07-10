"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCreateUser } from "@/app/hooks/useCreateUser";
import Alert from "../components/Badge";
import Loader from "../components/Loader";

export default function RegisterPage() {
  const router = useRouter();
  const { mutate, isPending, isSuccess, isError, error } = useCreateUser();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [localError, setLocalError] = useState("");
  const [showError, setShowError] = useState(true);

  const getErrorMessage = () => {
    if (!error?.message) return "Failed to create account.";

    try {
      const parsed = JSON.parse(error.message);
      return parsed.detail || error.message;
    } catch {
      return error.message;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLocalError("");
    setShowError(true);

    if (formData.password !== formData.confirmPassword) {
      setLocalError("Passwords do not match.");
      return;
    }

    mutate(
      {
        username: formData.username,
        password: formData.password,
      },
      {
        onSuccess: () => {
          router.push("/login");
        },
      }
    );
  };

  return (
    <>
      {isPending && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <Loader />
        </div>
      )}

      {localError && showError && (
        <div className="fixed top-4 left-1/2 z-50 -translate-x-1/2">
          <Alert message={localError} onClose={() => setShowError(false)} />
        </div>
      )}

      {isError && showError && (
        <div className="fixed top-4 left-1/2 z-50 -translate-x-1/2">
          <Alert
            message={getErrorMessage()}
            onClose={() => setShowError(false)}
          />
        </div>
      )}

      <section
        className="min-h-screen bg-no-repeat opacity-"
        style={{
          fontFamily: "Consolas, monospace",
          backgroundImage: "url('/background.svg')",
          backgroundPosition: "bottom right",
          backgroundSize: "cover",
        }}
      >
        <div className="mx-auto flex min-h-screen flex-col items-center justify-center px-6 py-8 lg:py-0">
          <div className="relative w-full overflow-hidden rounded-[40px] shadow-[0_20px_60px_rgba(0,0,0,0.25)] sm:max-w-md xl:p-0">
            <div className="absolute inset-0 bg-[#8fa3ba] opacity-30 backdrop-blur-md"></div>

            <div className="relative space-y-4 p-6 sm:p-8">
              <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-[#9f9fed] md:text-2xl">
                Create an Account
              </h1>

              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="username"
                    className="mb-2 block text-sm font-bold text-gray-500"
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
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 placeholder-gray-400 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-bold text-gray-500"
                  >
                    Your Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="********"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 placeholder-gray-400 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                  />
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="mb-2 block text-sm font-bold text-gray-500"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="********"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 placeholder-gray-400 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                  />
                </div>

                {isSuccess && (
                  <p className="text-sm text-green-600">
                    Account created successfully.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full rounded-lg bg-[#9f9fed] px-5 py-2.5 text-sm text-white transition duration-200 hover:bg-[#8a8ae6] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isPending ? "Creating account..." : "Create an account"}
                </button>

                <p className="text-sm text-gray-500">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="font-medium text-[#9f9fed] transition hover:text-[#8a8ae6]"
                  >
                    Login here
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