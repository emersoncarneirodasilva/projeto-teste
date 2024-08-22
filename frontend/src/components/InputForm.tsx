import { ChangeEvent } from "react";

interface InputFormProps {
  labelName: string;
  id: string;
  type: string;
  required?: boolean;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const labelInputDiv = "flex justify-center items-center gap-x-7";

const inputStyles =
  "px-2 py-1 w-56 bg-transparent backdrop-blur-lg rounded-md border border-gray-100/30 px-2 py-1.5 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-md";

export default function InputForm({
  labelName,
  id,
  type,
  required = false,
  placeholder,
  value,
  onChange,
}: InputFormProps) {
  return (
    <div className={labelInputDiv}>
      <label htmlFor={id} className="w-24">
        {labelName}:
      </label>
      <input
        type={type}
        id={id}
        name={id}
        required={required}
        placeholder={placeholder}
        className={inputStyles}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
