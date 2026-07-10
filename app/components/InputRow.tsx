import InputField from "./InputField";

interface InputRowProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  diffVar: string;
  setDiffVar: React.Dispatch<React.SetStateAction<string>>;
}

const InputRow = ({ value, setValue, diffVar, setDiffVar }: InputRowProps) => {
  return (
    <div className="flex flex-row gap-2">
      <div className="basis-2/3 min-w-0">
        <InputField
          placeholder="Function to differentiate"
          value={value}
          setValue={setValue}
        />
      </div>
      <div className="basis-1/3 min-w-0">
        <InputField
          placeholder="Diff var"
          value={diffVar}
          setValue={setDiffVar}
        />
      </div>
    </div>
  );
};

export default InputRow;