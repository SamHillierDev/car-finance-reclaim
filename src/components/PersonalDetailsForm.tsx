import { PersonalDetailsFormProps } from "../types/FormTypes";
import TextInput from "./TextInput";
import ToggleButtonGroup from "./ToggleButtonGroup";

const PersonalDetailsForm = ({
  formData,
  onChange,
}: PersonalDetailsFormProps) => {
  return (
    <div className="space-y-4">
      <TextInput
        label="Your full name"
        name="fullName"
        value={formData.fullName}
        placeholder="Enter your full name"
        onChange={onChange}
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
