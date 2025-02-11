import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import GeneratedEmail from "./components/GeneratedEmail";
import MotorFinanceForm from "./components/MotorFinanceForm";
import PersonalDetailsForm from "./components/PersonalDetailsForm";
import {
  MotorFinanceFormData,
  PersonalDetailsFormData,
} from "./types/FormTypes";

function App() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [hasNavigated, setHasNavigated] = useState<boolean>(false);
  const [showGeneratedEmail, setShowGeneratedEmail] = useState<boolean>(false);

  const [motorFinanceData, setMotorFinanceData] =
    useState<MotorFinanceFormData>({
      multipleAgreements: null,
      financeProvider: "",
      providerMultipleAgreements: null,
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

  const handleMotorFinanceChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
      | { target: { name: string; value: boolean } },
  ) => {
    const { name, value } = e.target;
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

  const handleNextStep = () => {
    setDirection("right");
    setHasNavigated(true);
    setCurrentStep((prev) => prev + 1);
  };

  const handlePreviousStep = () => {
    setDirection("left");
    setHasNavigated(true);
    if (showGeneratedEmail) {
      setShowGeneratedEmail(false);
      setCurrentStep(2);
    } else {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowGeneratedEmail(true);
  };

  const pageVariants = {
    initial: (direction: "left" | "right") => ({
      x: hasNavigated ? (direction === "right" ? "100%" : "-100%") : 0,
      opacity: hasNavigated ? 0 : 1,
    }),
    animate: { x: 0, opacity: 1 },
    exit: (direction: "left" | "right") => ({
      x: direction === "right" ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-lg overflow-hidden rounded-lg bg-white p-6 shadow-md">
        <h1 className="mb-4 flex items-center justify-center text-2xl font-medium">
          Car Finance Reclaim
        </h1>

        <AnimatePresence custom={direction} mode="wait">
          {showGeneratedEmail ? (
            <motion.div
              key="generated-email"
              custom={direction}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ type: "tween", duration: 0.4 }}
            >
              <GeneratedEmail
                personalDetails={personalDetailsData}
                motorFinanceDetails={motorFinanceData}
              />
              <div className="mt-4">
                <button
                  type="button"
                  onClick={handlePreviousStep}
                  className="cursor-pointer rounded-md bg-gray-300 px-4 py-2"
                >
                  Back
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.form
              key={currentStep}
              onSubmit={handleSubmit}
              className="space-y-6"
              custom={direction}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ type: "tween", duration: 0.4 }}
            >
              {currentStep === 1 && (
                <MotorFinanceForm
                  formData={motorFinanceData}
                  onChange={handleMotorFinanceChange}
                />
              )}

              {currentStep === 2 && (
                <PersonalDetailsForm
                  formData={personalDetailsData}
                  onChange={handlePersonalDetailsChange}
                />
              )}

              <div className="flex justify-between gap-2">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={handlePreviousStep}
                    className="cursor-pointer rounded-md bg-gray-300 px-4 py-2"
                  >
                    Back
                  </button>
                )}

                {currentStep === 1 && (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="ml-auto cursor-pointer rounded-md bg-blue-600 px-4 py-2 text-white"
                  >
                    Next
                  </button>
                )}

                {currentStep === 2 && (
                  <button
                    type="submit"
                    className="ml-auto cursor-pointer rounded-md bg-[#C58F60] px-4 py-2 text-white"
                  >
                    Generate my enquiry / complaint
                  </button>
                )}
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
