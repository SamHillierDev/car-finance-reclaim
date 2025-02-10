import { ToggleButtonGroupProps } from "../types/FormTypes";

const ToggleButtonGroup: React.FC<ToggleButtonGroupProps> = ({
  label,
  name,
  value,
  onChange,
}) => {
  return (
    <>
      <label className="font-medium">{label}</label>
      <div className="flex gap-4">
        {["Yes", "No"].map((option) => (
          <button
            key={option}
            type="button"
            className={`cursor-pointer rounded-md px-4 py-2 transition ${
              value === option ? "bg-[#C58F60] text-white" : "bg-gray-200"
            }`}
            onClick={() => onChange(name, option)}
          >
            {option}
          </button>
        ))}
      </div>
    </>
  );
};

export default ToggleButtonGroup;
