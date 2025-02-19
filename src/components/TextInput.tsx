import euFlag from "../assets/eu-flag.svg";

interface TextInputProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  className?: string;
  showGBFlag?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  name,
  type = "text",
  value,
  placeholder,
  onChange,
  error,
  className = "",
  showGBFlag = false,
}) => {
  return (
    <div className="flex flex-col">
      <label className="mb-2 font-semibold">{label}</label>
      <div className="relative flex items-stretch">
        {showGBFlag && (
          <div className="flex flex-col items-center justify-center rounded-l-md border border-gray-400 bg-blue-600 px-2 py-1 text-yellow-200">
            <img src={euFlag} alt="EU Flag" className="h-6 w-6" />
            <span className="text-xs font-semibold">GB</span>
          </div>
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full rounded-md border p-2 ${
            error ? "border-red-500" : "border-gray-300"
          } ${className} ${showGBFlag ? "rounded-l-none" : ""}`}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default TextInput;
