import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { MotorFinanceFormProps } from "../types/FormTypes";
import { motorFinanceProviders } from "../utils/constants";
import { getLicensePlateError } from "../utils/inputValidations";
import SelectInput from "./SelectInput";
import TextInput from "./TextInput";
import ToggleButtonGroup from "./ToggleButtonGroup";
import WarningMessage from "./WarningMessage";

const MotorFinanceForm = ({ formData, onChange }: MotorFinanceFormProps) => {
  const [errors, setErrors] = useState<{ vehicleNumber?: string }>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    if (name === "vehicleNumber") {
      const error = getLicensePlateError(value as string);
      setErrors((prev) => ({ ...prev, vehicleNumber: error }));
    }

    onChange(e);
  };

  const selectedProvider = motorFinanceProviders.find(
    (provider) => provider.name === formData.financeProvider,
  );
  const showProviderWarning = selectedProvider?.warning || false;
  const isOtherProvider =
    formData.financeProvider === "Other (not in the list)";

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-[#C58F60]">
        About your motor finance agreement
      </h2>

      <ToggleButtonGroup
        label="Did you have more than one finance agreement?"
        name="multipleAgreements"
        value={formData.multipleAgreements}
        onChange={(_, value) =>
          onChange({ target: { name: "multipleAgreements", value } } as any)
        }
      />

      <AnimatePresence mode="wait">
        {formData.multipleAgreements && (
          <WarningMessage
            color="yellow"
            message={[
              <strong>If they were with the SAME provider:</strong>,
              " No problem, just carry on, you can put more than one financial agreement in.",
              <strong>If they were with DIFFERENT providers:</strong>,
              " You will need to restart this process for each finance provider.",
            ]}
          />
        )}
      </AnimatePresence>

      <SelectInput
        label="Who provided your motor finance?"
        name="financeProvider"
        value={formData.financeProvider}
        options={[
          ...motorFinanceProviders.map((provider) => provider.name),
          "Other (not in the list)",
        ]}
        onChange={onChange}
      />

      <AnimatePresence mode="wait">
        {isOtherProvider && (
          <WarningMessage
            color="yellow"
            message={[
              "You can still generate an enquiry/complaint, but ",
              <strong>
                you will have to find the provider’s contact details yourself.
              </strong>,
            ]}
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {isOtherProvider && (
          <TextInput
            label="Tell us the provider's name so we can add it in the future (optional)"
            name="otherProviderName"
            value={formData.otherProviderName ?? ""}
            placeholder="Enter provider name"
            onChange={onChange}
          />
        )}
      </AnimatePresence>

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
        label={`With ${
          isOtherProvider
            ? "this provider"
            : selectedProvider?.name || "this provider"
        }, do you have more than one agreement?`}
        name="providerMultipleAgreements"
        value={formData.providerMultipleAgreements}
        onChange={(_, value) =>
          onChange({
            target: { name: "providerMultipleAgreements", value },
          } as any)
        }
      />

      <ToggleButtonGroup
        label={
          formData.providerMultipleAgreements
            ? "Do you know any of your agreement policy numbers?"
            : "Do you know your finance agreement policy number?"
        }
        name="policyNumberKnown"
        value={formData.policyNumberKnown}
        onChange={(_, value) =>
          onChange({ target: { name: "policyNumberKnown", value } } as any)
        }
      />

      {formData.policyNumberKnown && (
        <TextInput
          label={
            formData.providerMultipleAgreements
              ? "Policy references/numbers"
              : "Policy reference/number"
          }
          name="policyNumber"
          value={formData.policyNumber ?? ""}
          placeholder="e.g. 12-123456"
          onChange={onChange}
        />
      )}

      <AnimatePresence mode="wait">
        {formData.policyNumberKnown === false && (
          <WarningMessage
            color="yellow"
            message={[
              "We'll amend the wording to ask the finance provider to use the details you've supplied to locate any agreements in your name. Please provide as many details as you can or there's a risk they won't find your agreement.",
            ]}
          />
        )}
      </AnimatePresence>

      <TextInput
        label={
          formData.providerMultipleAgreements
            ? formData.policyNumberKnown === false
              ? "Number plate of one vehicle you had finance on"
              : "Number plate(s) of the vehicle(s) you financed"
            : "Number plate of the vehicle you financed"
        }
        name="vehicleNumber"
        value={formData.vehicleNumber ?? ""}
        placeholder="ENTER REG"
        onChange={handleInputChange}
        error={errors.vehicleNumber}
        showGBFlag={true}
        className="border-gray-400 bg-yellow-200 text-center font-mono tracking-widest uppercase"
      />

      {formData.policyNumberKnown === false && (
        <>
          <TextInput
            label="The dealer or broker you bought the vehicle from? (optional)"
            name="dealerOrBroker"
            value={formData.dealerOrBroker ?? ""}
            placeholder="Enter dealer or broker name"
            onChange={onChange}
          />

          <TextInput
            label="When did you buy the vehicle? (optional)"
            name="purchaseDate"
            type="date"
            value={formData.purchaseDate ?? ""}
            onChange={onChange}
          />
        </>
      )}
    </div>
  );
};

export default MotorFinanceForm;
