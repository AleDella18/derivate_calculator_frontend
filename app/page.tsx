"use client";

import { useState } from "react";
import { useCreateExpression } from "@/app/hooks/useCreateExpression";
import InputField from "@/app/components/InputField";
import PayLoad from "@/app/models/expression";
import ButtonGrid from "./components/ButtonGrid";
import InputRow from "./components/InputRow";
import LatexPreview from "./components/LatexPreview";
import Alert from "./components/Badge";
import Button from "./components/Button";
import ShowGraphPopup from "./components/ShowGraphPopup";
import CoffeeButton from "./components/CoffeeButton";
import Loader from "./components/Loader";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export default function Calculator() {
  const [value, setValue] = useState<string>("");
  const [diffVar, setDiffVar] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [showError, setShowError] = useState(true);
  const [openFns, setOpenFns] = useState(false);

  const [imgPath, setImgPath] = useState<string>("");
  const [showGraphPopup, setShowGraphPopup] = useState(false);

  const { mutate, isPending, isError, error } = useCreateExpression();

  const resetValue = () => {
    setValue("");
    setDiffVar("");
    setResult("");
    setImgPath("");
    setShowGraphPopup(false);
    setOpenFns(false);
  };

  const getErrorMessage = (err: any) => {
    if (!err) return "Something went wrong";

    try {
      const parsed =
        typeof err.message === "string" ? JSON.parse(err.message) : err.message;

      if (parsed?.detail) return parsed.detail;
    } catch (e) {
      console.log("Error parsing error message:", e);
    }

    return err.message || "Something went wrong";
  };

  const handleSubmit = () => {
    const normalized = value.replaceAll("×", "*").replaceAll("÷", "/");

    const payload: PayLoad = {
      expr: normalized,
      diff_var: diffVar,
    };

    setShowError(true);

    mutate(payload, {
      onSuccess: (data) => {
        setResult(data.derivative);
        setImgPath(data.img_path || "");
      },
    });
  };

  const insertFunction = (fn: string) => {
    setValue((prev) => prev + fn);
    setOpenFns(false);
  };

  const functionButtons = [
    { type: "exp()", value: "exp(" },
    { type: "ln()", value: "ln(" },
    { type: "√", value: "sqrt(" },
    { type: "sin()", value: "sin(" },
    { type: "cos()", value: "cos(" },
    { type: "tan()", value: "tan(" },
    { type: "sec()", value: "sec(" },
    { type: "csc()", value: "csc(" },
    { type: "cot()", value: "cot(" },
    { type: "arcsin()", value: "arcsin(" },
    { type: "arccos()", value: "arccos(" },
    { type: "arctan()", value: "arctan(" },
    { type: "arcsec()", value: "arcsec(" },
    { type: "arccsc()", value: "arccsc(" },
    { type: "arccot()", value: "arccot(" },
    { type: "sinh()", value: "sinh(" },
    { type: "cosh()", value: "cosh(" },
    { type: "tanh()", value: "tanh(" },
    { type: "sech()", value: "sech(" },
    { type: "csch()", value: "csch(" },
    { type: "coth()", value: "coth(" },
    { type: "arcsinh()", value: "arcsinh(" },
    { type: "arccosh()", value: "arccosh(" },
    { type: "arctanh()", value: "arctanh(" },
    { type: "arcsech()", value: "arcsech(" },
    { type: "arccsch()", value: "arccsch(" },
    { type: "arccoth()", value: "arccoth(" },
  ];

  const fullImageUrl = imgPath
    ? `${BACKEND_URL}${imgPath.startsWith("/") ? "" : "/"}${imgPath}`
    : "";

  return (
    <>
      {isPending && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <Loader />
        </div>
      )}

      {isError && showError && (
        <div className="fixed top-4 left-1/2 z-50 -translate-x-1/2">
          <Alert
            message={getErrorMessage(error)}
            onClose={() => setShowError(false)}
          />
        </div>
      )}

      <ShowGraphPopup
        isOpen={showGraphPopup}
        imageUrl={fullImageUrl}
        onClose={() => setShowGraphPopup(false)}
      />

      <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-4">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: "url('/background_calculator.svg')",
          }}
        />

        <div className="relative z-10 flex flex-col items-center">
          <div className="relative flex flex-col items-center px-0 py-0 sm:px-10 sm:py-17">
            <div className="absolute inset-0 hidden sm:block sm:rounded-[2rem] sm:bg-[#96ADC8] sm:opacity-50"></div>

            <div className="relative z-10 flex flex-col items-center">
              <h1
                className="mb-8 hidden text-4xl font-bold tracking-wide text-[#8a8ae6] sm:block"
                style={{ fontFamily: "Consolas, monospace" }}
              >
                Derivative calculator
              </h1>

              <div className="flex flex-col gap-4 rounded-[2rem] bg-[#e6e8e6] p-7">
                <InputRow
                  value={value}
                  setValue={setValue}
                  diffVar={diffVar}
                  setDiffVar={setDiffVar}
                />

                <LatexPreview expression={value} content="Preview expression" />

                <InputField
                  placeholder="Res"
                  value={result}
                  setValue={setResult}
                />

                <LatexPreview expression={result} content="Preview result" />

                {imgPath && (
                  <Button
                    type="Show graph"
                    onClick={() => setShowGraphPopup(true)}
                    color="bg-[#96ADC8]"
                    hover="hover:bg-[#96ADC8]"
                    border="border-[#96ADC8]"
                    className="rounded-lg px-4 py-2"
                  />
                )}

                {openFns && (
                  <div className="grid grid-cols-3 gap-3">
                    {functionButtons.map((fn) => (
                      <Button
                        key={fn.type}
                        color="bg-[#96ADC8]"
                        hover="hover:bg-[#7f7f7f]"
                        border="border-[#96ADC8] rounded"
                        type={fn.type}
                        onClick={() => insertFunction(fn.value)}
                      />
                    ))}
                  </div>
                )}

                <ButtonGrid
                  resetValue={resetValue}
                  setValue={setValue}
                  onSubmit={handleSubmit}
                  onToggleFunctions={() => setOpenFns((prev) => !prev)}
                />
              </div>
            </div>
          </div>

          <CoffeeButton />
        </div>
      </div>
    </>
  );
}