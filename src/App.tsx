import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import SelectInput from "./components/SelectInput";
import TextInput from "./components/TextInput";
import ToggleButtonGroup from "./components/ToggleButtonGroup";
import WarningMessage from "./components/WarningMessage";
import { FormData } from "./types/FormData";
import { motorFinanceProviders } from "./utils/constants";

function App() {
  const [formData, setFormData] = useState<FormData>({
    multipleAgreements: "",
    financeProvider: "",
    policyNumberKnown: "",
    vehicleNumber: "",
    dealerOrBroker: "",
    purchaseDate: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleButtonClick = (name: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-semibold">Car Finance Reclaim</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <ToggleButtonGroup
            label="Did you have more than one finance agreement?"
            name="multipleAgreements"
            value={formData.multipleAgreements}
            onChange={handleButtonClick}
          />

          <AnimatePresence mode="wait">
            {formData.multipleAgreements === "Yes" && (
              <WarningMessage
                message={[
                  {
                    bold: "If they were with the SAME provider:",
                    text: "No problem, just carry on, you can put more than one financial agreement in.",
                  },
                  {
                    bold: "If they were with DIFFERENT providers:",
                    text: "You will need to restart this process for each finance provider.",
                  },
                ]}
              />
            )}
          </AnimatePresence>

          <SelectInput
            label="Who provided your motor finance?"
            name="financeProvider"
            value={formData.financeProvider}
            options={motorFinanceProviders}
            onChange={handleChange}
          />

          <ToggleButtonGroup
            label="Do you know your finance agreement policy number?"
            name="policyNumberKnown"
            value={formData.policyNumberKnown}
            onChange={handleButtonClick}
          />

          <TextInput
            label="Number plate of vehicle you had finance on"
            name="vehicleNumber"
            value={formData.vehicleNumber}
            placeholder="Enter vehicle number plate"
            onChange={handleChange}
          />

          <TextInput
            label="The dealer or broker you bought the vehicle from (optional)"
            name="dealerOrBroker"
            value={formData.dealerOrBroker}
            placeholder="Enter dealer or broker name"
            onChange={handleChange}
          />

          <TextInput
            label="When did you buy the vehicle? (optional)"
            name="purchaseDate"
            type="date"
            value={formData.purchaseDate}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full cursor-pointer rounded-md bg-blue-500 py-2 text-white transition hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
