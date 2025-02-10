import { ToggleButtonGroupProps } from "../types/FormTypes";

const ToggleButtonGroup: React.FC<ToggleButtonGroupProps> = ({
  label,
  name,
  value,
  onChange,
}) => {
  return (
    <div className="flex items-center gap-2">
      <label className="mb-2">{label}</label>
      <div className="flex gap-2">
        {["Yes", "No"].map((option) => {
          const booleanValue = option === "Yes" ? true : false;
          return (
            <button
              key={option}
              type="button"
              className={`cursor-pointer rounded-sm border border-gray-400 px-4 py-1 transition ${
                value === booleanValue
                  ? "bg-[#C58F60] text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              onClick={() => onChange(name, booleanValue)}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ToggleButtonGroup;
