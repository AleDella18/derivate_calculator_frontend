interface InputFieldProps {
  placeholder: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const InputField = ({ placeholder, value, setValue }: InputFieldProps) => {
  return (
    <>
      <input
        className={`rounded-md bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow w-full`}
        placeholder={placeholder}
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
    </>
  );
};

export default InputField;
