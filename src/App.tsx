import { useState } from "react";
import MotorFinanceForm from "./components/MotorFinanceForm";
import PersonalDetailsForm from "./components/PersonalDetailsForm";
import GeneratedEmail from "./components/GeneratedEmail";
import {
  MotorFinanceFormData,
  PersonalDetailsFormData,
} from "./types/FormTypes";
import { getLicensePlateError } from "./utils/inputValidations";

function App() {
  const [motorFinanceData, setMotorFinanceData] =
    useState<MotorFinanceFormData>({
      multipleAgreements: null,
      financeProvider: "",
      policyNumberKnown: null,
      policyNumber: "",
      vehicleNumber: "",
      dealerOrBroker: "",
      purchaseDate: "",
    });

  const [personalDetailsData, setPersonalDetailsData] =
    useState<PersonalDetailsFormData>({
      fullName: "",
      dateOfBirth: "",
      address: "",
      addressSameAsFinance: null,
      previousAddress: "",
    });

  const [errors, setErrors] = useState<{ vehicleNumber?: string }>({});
  const [showGeneratedEmail, setShowGeneratedEmail] = useState<boolean>(false);

  const handleMotorFinanceChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
      | { target: { name: string; value: boolean } },
  ) => {
    const { name, value } = e.target;

    if (name === "vehicleNumber") {
      const error = getLicensePlateError(value as string);
      setErrors((prev) => ({ ...prev, vehicleNumber: error }));
    }

    setMotorFinanceData((prev) => ({
      ...prev,
      [name]: typeof value === "boolean" ? value : value,
    }));
  };

  const handlePersonalDetailsChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | { target: { name: string; value: boolean } },
  ) => {
    const { name, value } = e.target;

    setPersonalDetailsData((prev) => ({
      ...prev,
      [name]: typeof value === "boolean" ? value : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (errors.vehicleNumber) return;

    setShowGeneratedEmail(true);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-md">
        <h1 className="mb-4 flex items-center justify-center text-2xl font-medium">
          Car Finance Reclaim
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <MotorFinanceForm
            formData={motorFinanceData}
            onChange={handleMotorFinanceChange}
            errors={errors}
          />
          <PersonalDetailsForm
            formData={personalDetailsData}
            onChange={handlePersonalDetailsChange}
          />

          <button
            type="submit"
            className="w-full cursor-pointer rounded-md bg-[#C58F60] py-3 font-light text-white transition hover:bg-[#C58F60]/90"
            disabled={!!errors.vehicleNumber}
          >
            Generate my enquiry / complaint
          </button>
        </form>

        {showGeneratedEmail && (
          <GeneratedEmail
            personalDetails={personalDetailsData}
            motorFinanceDetails={motorFinanceData}
          />
        )}
      </div>
    </div>
  );
}

export default App;
