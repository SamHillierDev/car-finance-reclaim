import { useState } from "react";
import MotorFinanceForm from "./components/MotorFinanceForm";
import PersonalDetailsForm from "./components/PersonalDetailsForm";
import {
  MotorFinanceFormData,
  PersonalDetailsFormData,
} from "./types/FormData";
import { getLicensePlateError } from "./utils/inputValidations";

function App() {
  const [motorFinanceData, setMotorFinanceData] =
    useState<MotorFinanceFormData>({
      multipleAgreements: "",
      financeProvider: "",
      policyNumberKnown: "",
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
    });

  const [errors, setErrors] = useState<{ vehicleNumber?: string }>({});

  const handleMotorFinanceChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    if (name === "vehicleNumber") {
      const error = getLicensePlateError(value);
      setErrors((prev) => ({ ...prev, vehicleNumber: error }));
    }

    setMotorFinanceData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePersonalDetailsChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    setPersonalDetailsData((prev) => ({ ...prev, [name]: value }));
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
            className="w-full cursor-pointer rounded-md bg-blue-500 py-2 text-white transition hover:bg-blue-600"
            disabled={!!errors.vehicleNumber}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
