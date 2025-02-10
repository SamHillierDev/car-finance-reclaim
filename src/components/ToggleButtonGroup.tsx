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
      <div className="flex gap-2">
        {["Yes", "No"].map((option) => {
          const booleanValue = option === "Yes" ? true : false;
          return (
            <button
              key={option}
              type="button"
              className={`cursor-pointer rounded-lg px-4 py-2 transition ${
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
    </>
  );
};

export default ToggleButtonGroup;
