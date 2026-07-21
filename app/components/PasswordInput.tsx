"use client";

import { useState, type InputHTMLAttributes } from "react";
import { Eye, EyeOff } from "lucide-react";

type PasswordInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

const PasswordInput = ({ className = "", ...props }: PasswordInputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <div className="relative">
      <input
        {...props}
        type={isPasswordVisible ? "text" : "password"}
        className={`${className} pr-10`}
      />
      <button
        type="button"
        aria-label={isPasswordVisible ? "Hide password" : "Show password"}
        onClick={() => setIsPasswordVisible((isVisible) => !isVisible)}
        className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 transition hover:text-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gray-500 dark:text-gray-400 dark:hover:text-gray-200"
      >
        {isPasswordVisible ? (
          <EyeOff aria-hidden="true" className="size-5" />
        ) : (
          <Eye aria-hidden="true" className="size-5" />
        )}
      </button>
    </div>
  );
};

export default PasswordInput;
