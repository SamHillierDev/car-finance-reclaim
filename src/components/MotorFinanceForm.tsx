import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FormData } from "../types/FormData";
import { motorFinanceProviders } from "../utils/constants";
import { isValidLicensePlate } from "../utils/inputValidations";
import SelectInput from "./SelectInput";
import TextInput from "./TextInput";
import ToggleButtonGroup from "./ToggleButtonGroup";
import WarningMessage from "./WarningMessage";

const MotorFinanceForm = () => {
  const [formData, setFormData] = useState<FormData>({
    multipleAgreements: "",
    financeProvider: "",
    policyNumberKnown: "",
    policyNumber: "",
    vehicleNumber: "",
    dealerOrBroker: "",
    purchaseDate: "",
  });

  const [errors, setErrors] = useState<{ vehicleNumber?: string }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    if (name === "vehicleNumber") {
      if (!isValidLicensePlate(value)) {
        setErrors((prev) => ({
          ...prev,
          vehicleNumber: "Invalid license plate format (e.g., AB12 CDE)",
        }));
      } else {
        setErrors((prev) => ({ ...prev, vehicleNumber: undefined }));
      }
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (errors.vehicleNumber) {
      return;
    }

    console.log("Form Data Submitted:", formData);
  };

  const selectedProvider = motorFinanceProviders.find(
    (provider) => provider.name === formData.financeProvider,
  );
  const showProviderWarning = selectedProvider?.warning || false;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <ToggleButtonGroup
        label="Did you have more than one finance agreement?"
        name="multipleAgreements"
        value={formData.multipleAgreements}
        onChange={(_, value) =>
          setFormData((prev) => ({ ...prev, multipleAgreements: value }))
        }
      />

      <AnimatePresence mode="wait">
        {formData.multipleAgreements === "Yes" && (
          <WarningMessage
            color="yellow"
            message={[
              <strong>If they were with the SAME provider:</strong>,
              "No problem, just carry on, you can put more than one financial agreement in.",
              <strong>If they were with DIFFERENT providers:</strong>,
              "You will need to restart this process for each finance provider.",
            ]}
          />
        )}
      </AnimatePresence>

      <SelectInput
        label="Who provided your motor finance?"
        name="financeProvider"
        value={formData.financeProvider}
        options={motorFinanceProviders.map((provider) => provider.name)}
        onChange={handleChange}
      />

      <AnimatePresence mode="wait">
        {showProviderWarning && (
          <WarningMessage
            color="red"
            message={[
              "This company has already said it didn't engage in discretionary commission arrangements, so we think it's not worth you spending time contacting it to ask.",
            ]}
          />
        )}
      </AnimatePresence>

      <ToggleButtonGroup
        label="Do you know your finance agreement policy number?"
        name="policyNumberKnown"
        value={formData.policyNumberKnown}
        onChange={(_, value) =>
          setFormData((prev) => ({ ...prev, policyNumberKnown: value }))
        }
      />

      {formData.policyNumberKnown === "Yes" && (
        <TextInput
          label="Policy reference/number"
          name="policyNumber"
          value={formData.policyNumber ?? ""}
          placeholder="e.g. 12-123456"
          onChange={handleChange}
        />
      )}

      <AnimatePresence mode="wait">
        {formData.policyNumberKnown === "No" && (
          <WarningMessage
            color="yellow"
            message={[
              "We'll amend the wording to ask the finance provider to use the details you've supplied to locate any agreements in your name. Please provide as many details as you can or there's a risk they won't find your agreement.",
            ]}
          />
        )}
      </AnimatePresence>

      <TextInput
        label="Number plate of vehicle you had finance on"
        name="vehicleNumber"
        value={formData.vehicleNumber}
        placeholder="e.g. BG51 SMR"
        onChange={handleChange}
        error={errors.vehicleNumber}
      />

      {formData.policyNumberKnown === "No" && (
        <>
          <TextInput
            label="The dealer or broker you bought the vehicle from (optional)"
            name="dealerOrBroker"
            value={formData.dealerOrBroker ?? ""}
            placeholder="Enter dealer or broker name"
            onChange={handleChange}
          />

          <TextInput
            label="When did you buy the vehicle? (optional)"
            name="purchaseDate"
            type="date"
            value={formData.purchaseDate ?? ""}
            onChange={handleChange}
          />
        </>
      )}

      <button
        type="submit"
        className="w-full cursor-pointer rounded-md bg-blue-500 py-2 text-white transition hover:bg-blue-600"
        disabled={!!errors.vehicleNumber}
      >
        Submit
      </button>
    </form>
  );
};

export default MotorFinanceForm;
