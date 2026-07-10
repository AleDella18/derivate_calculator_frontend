interface ButtonProps {
  color: string;
  hover: string;
  border: string;
  type: string;
  onClick: () => void;
  className?: string;
  textColor?: string;
}

const Button = ({
  color,
  hover,
  border,
  type,
  onClick,
  className = "",
  textColor = "text-white",
}: ButtonProps) => {
  return (
    <button
      className={`w-full h-full ${color} ${hover} rounded-full ${textColor} font-bold text-sm sm:text-base md:text-lg py-2 px-4 border ${border} ${className}`}
      onClick={onClick}
    >
      {type}
    </button>
  );
};

export default Button;