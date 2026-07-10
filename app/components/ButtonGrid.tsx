import { operator } from "../types/operators";
import Button from "./Button";

interface ButtonGridProps {
  resetValue: () => void;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: () => void;
  onToggleFunctions: () => void;
}

interface ButtonConfig {
  type: string;
  value?: operator;
  color: string;
  hover: string;
  border: string;
  action?: "reset" | "submit" | "backspace";
}

const ButtonList = ({
  resetValue,
  setValue,
  onSubmit,
  onToggleFunctions,
}: ButtonGridProps) => {
  const handleKeyPress = (type: operator) => {
    setValue((prev) => prev + type);
  };

  const handleBackspace = () => {
    setValue((prev) => prev.slice(0, -1));
  };

  const buttons: ButtonConfig[] = [
    {
      type: "CLR",
      action: "reset",
      color: "bg-[#CB04A5]",
      hover: "hover:bg-[#FC75E9]",
      border: "border-[#CB04A5]",
    },
    {
      type: "C",
      action: "backspace",
      color: "bg-[#CB04A5]",
      hover: "hover:bg-[#FC75E9]",
      border: "border-[#CB04A5]",
    },
    {
      type: "^",
      value: "^",
      color: "bg-[#9F9FED]",
      hover: "hover:bg-[#C9C9F5]",
      border: "border-[#9F9FED]",
    },
    {
      type: "÷",
      value: "/",
      color: "bg-[#9F9FED]",
      hover: "hover:bg-[#C9C9F5]",
      border: "border-[#9F9FED]",
    },
    {
      type: "7",
      value: "7",
      color: "bg-[#96ADC8]",
      hover: "hover:bg-[#D1DBE7]",
      border: "border-[#96ADC8]",
    },
    {
      type: "8",
      value: "8",
      color: "bg-[#96ADC8]",
      hover: "hover:bg-[#D1DBE7]",
      border: "border-[#96ADC8]",
    },
    {
      type: "9",
      value: "9",
      color: "bg-[#96ADC8]",
      hover: "hover:bg-[#D1DBE7]",
      border: "border-[#96ADC8]",
    },
    {
      type: "×",
      value: "*",
      color: "bg-[#9F9FED]",
      hover: "hover:bg-[#C9C9F5]",
      border: "border-[#9F9FED]",
    },
    {
      type: "4",
      value: "4",
      color: "bg-[#96ADC8]",
      hover: "hover:bg-[#D1DBE7]",
      border: "border-[#96ADC8]",
    },
    {
      type: "5",
      value: "5",
      color: "bg-[#96ADC8]",
      hover: "hover:bg-[#D1DBE7]",
      border: "border-[#96ADC8]",
    },
    {
      type: "6",
      value: "6",
      color: "bg-[#96ADC8]",
      hover: "hover:bg-[#D1DBE7]",
      border: "border-[#96ADC8]",
    },
    {
      type: "-",
      value: "-",
      color: "bg-[#9F9FED]",
      hover: "hover:bg-[#C9C9F5]",
      border: "border-[#9F9FED]",
    },
    {
      type: "1",
      value: "1",
      color: "bg-[#96ADC8]",
      hover: "hover:bg-[#D1DBE7]",
      border: "border-[#96ADC8]",
    },
    {
      type: "2",
      value: "2",
      color: "bg-[#96ADC8]",
      hover: "hover:bg-[#D1DBE7]",
      border: "border-[#96ADC8]",
    },
    {
      type: "3",
      value: "3",
      color: "bg-[#96ADC8]",
      hover: "hover:bg-[#D1DBE7]",
      border: "border-[#96ADC8]",
    },
    {
      type: "+",
      value: "+",
      color: "bg-[#9F9FED]",
      hover: "hover:bg-[#C9C9F5]",
      border: "border-[#9F9FED]",
    },
    {
      type: "f(x)",
      color: "bg-[#4A5565]",
      hover: "hover:bg-[#AEB7C4]",
      border: "border-[#4A5565]",
    },
    {
      type: "0",
      value: "0",
      color: "bg-[#96ADC8]",
      hover: "hover:bg-[#D1DBE7]",
      border: "border-[#96ADC8]",
    },
    {
      type: ",",
      value: ".",
      color: "bg-[#4A5565]",
      hover: "hover:bg-[#AEB7C4]",
      border: "border-[#4A5565]",
    },
    {
      type: "=",
      action: "submit",
      color: "bg-[#C4F1BE]",
      hover: "hover:bg-[#D9F6D5]",
      border: "border-[#C4F1BE]",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-3">
      {buttons.map((btn) => (
        <Button
          key={btn.type}
          color={btn.color}
          hover={btn.hover}
          border={btn.border}
          type={btn.type}
          className="font-[Consolas]"
          textColor={btn.type === "=" ? "text-black" : "text-white"}
          onClick={() => {
            if (btn.type === "f(x)") return onToggleFunctions();
            if (btn.action === "reset") return resetValue();
            if (btn.action === "submit") return onSubmit();
            if (btn.action === "backspace") return handleBackspace();
            if (btn.value) return handleKeyPress(btn.value);
          }}
        />
      ))}
    </div>
  );
};

export default ButtonList;