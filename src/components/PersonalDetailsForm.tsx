import { PersonalDetailsFormProps } from "../types/FormData";
import TextInput from "./TextInput";

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
    </div>
  );
};

export default PersonalDetailsForm;
