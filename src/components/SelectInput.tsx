interface SelectInputProps {
  label: string;
  name: string;
  value: string;
  options: string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  name,
  value,
  options,
  onChange,
}) => {
  return (
    <div className="flex flex-col">
      <label className="mb-2 font-semibold">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-md border p-2"
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
