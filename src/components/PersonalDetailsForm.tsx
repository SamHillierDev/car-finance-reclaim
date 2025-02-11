import { useState } from "react";
import { PersonalDetailsFormProps } from "../types/FormTypes";
import { getFullNameError } from "../utils/inputValidations";
import TextInput from "./TextInput";
import ToggleButtonGroup from "./ToggleButtonGroup";

const PersonalDetailsForm = ({
  formData,
  onChange,
}: PersonalDetailsFormProps) => {
  const [errors, setErrors] = useState<{ fullName?: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "fullName") {
      const error = getFullNameError(value);
      setErrors((prev) => ({ ...prev, fullName: error }));
    }

    onChange(e);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-[#C58F60]">About you</h2>

      <TextInput
        label="Your full name"
        name="fullName"
        value={formData.fullName}
        placeholder="Enter your full name"
        onChange={handleInputChange}
        error={errors.fullName}
      />

      <TextInput
        label="Your date of birth"
        name="dateOfBirth"
        type="date"
        value={formData.dateOfBirth}
        onChange={onChange}
      />

      <TextInput
        label="Your current address & postcode"
        name="address"
        value={formData.address}
        placeholder="Enter your current address & postcode"
        onChange={onChange}
      />

      <ToggleButtonGroup
        label="Is your address the same as when you took out the motor finance?"
        name="addressSameAsFinance"
        value={formData.addressSameAsFinance}
        onChange={(_, value) =>
          onChange({ target: { name: "addressSameAsFinance", value } } as any)
        }
      />

      {formData.addressSameAsFinance === false && (
        <TextInput
          label="Your address & postcode at the time"
          name="previousAddress"
          value={formData.previousAddress ?? ""}
          placeholder="Enter your previous address & postcode"
          onChange={onChange}
        />
      )}
    </div>
  );
};

export default PersonalDetailsForm;
