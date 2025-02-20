import { ToggleButtonGroupProps } from "../types/FormTypes";

const ToggleButtonGroup: React.FC<ToggleButtonGroupProps> = ({
  label,
  name,
  value,
  onChange,
}) => {
  return (
    <div className="flex items-center justify-between gap-2">
      <label className="mb-2 font-semibold">{label}</label>
      <div className="flex gap-2">
        {["Yes", "No"].map((option) => {
          const booleanValue = option === "Yes" ? true : false;
          return (
            <button
              key={option}
              type="button"
              className={`cursor-pointer rounded-sm border border-gray-300 px-4 py-1 shadow-inner outline-gray-300 transition ${
                value === booleanValue
                  ? "border-[#C58F60] bg-[#C58F60] text-white shadow-amber-900"
                  : "bg-gray-200 shadow-gray-100 hover:bg-gray-300"
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
