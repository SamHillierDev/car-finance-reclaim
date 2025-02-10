import { useState } from "react";
import MotorFinanceForm from "./components/MotorFinanceForm";
import PersonalDetailsForm from "./components/PersonalDetailsForm";
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

    console.log("Motor Finance Form Data:", motorFinanceData);
    console.log("Personal Details Form Data:", personalDetailsData);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-semibold">Car Finance Reclaim</h2>

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
      </div>
    </div>
  );
}

export default App;
