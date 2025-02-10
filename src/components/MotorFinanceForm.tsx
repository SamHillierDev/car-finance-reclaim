import { AnimatePresence } from "framer-motion";
import { MotorFinanceFormProps } from "../types/FormData";
import { motorFinanceProviders } from "../utils/constants";
import SelectInput from "./SelectInput";
import TextInput from "./TextInput";
import ToggleButtonGroup from "./ToggleButtonGroup";
import WarningMessage from "./WarningMessage";

const MotorFinanceForm = ({
  formData,
  onChange,
  errors,
}: MotorFinanceFormProps) => {
  const selectedProvider = motorFinanceProviders.find(
    (provider) => provider.name === formData.financeProvider,
  );
  const showProviderWarning = selectedProvider?.warning || false;

  return (
    <div className="space-y-4">
      <ToggleButtonGroup
        label="Did you have more than one finance agreement?"
        name="multipleAgreements"
        value={formData.multipleAgreements}
        onChange={(_, value) =>
          onChange({ target: { name: "multipleAgreements", value } } as any)
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
        onChange={onChange}
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
          onChange({ target: { name: "policyNumberKnown", value } } as any)
        }
      />

      {formData.policyNumberKnown === "Yes" && (
        <TextInput
          label="Policy reference/number"
          name="policyNumber"
          value={formData.policyNumber ?? ""}
          placeholder="e.g. 12-123456"
          onChange={onChange}
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
        onChange={onChange}
        error={errors.vehicleNumber}
      />

      {formData.policyNumberKnown === "No" && (
        <>
          <TextInput
            label="The dealer or broker you bought the vehicle from (optional)"
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
