import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import EmailTemplate from "./components/EmailTemplate";
import MotorFinanceForm from "./components/MotorFinanceForm";
import PersonalDetailsForm from "./components/PersonalDetailsForm";
import {
  MotorFinanceFormData,
  PersonalDetailsFormData,
} from "./types/FormTypes";

const pageVariants = {
  initial: ({
    direction,
    hasNavigated,
  }: {
    direction: "left" | "right";
    hasNavigated: boolean;
  }) => ({
    x: hasNavigated ? (direction === "right" ? "100%" : "-100%") : 0,
    opacity: hasNavigated ? 0 : 1,
  }),
  animate: { x: 0, opacity: 1 },
  exit: ({ direction }: { direction: "left" | "right" }) => ({
    x: direction === "right" ? "-100%" : "100%",
    opacity: 0,
  }),
};

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [hasNavigated, setHasNavigated] = useState(false);
  const [showEmailTemplate, setShowEmailTemplate] = useState(false);

  const [formData, setFormData] = useState({
    motorFinance: {
      multipleAgreements: null,
      financeProvider: "",
      providerMultipleAgreements: null,
      policyNumberKnown: null,
      policyNumber: "",
      vehicleNumber: "",
      dealerOrBroker: "",
      purchaseDate: "",
    } as MotorFinanceFormData,
    personalDetails: {
      fullName: "",
      dateOfBirth: "",
      address: "",
      addressSameAsFinance: null,
      previousAddress: "",
    } as PersonalDetailsFormData,
  });

  const isStepValid = () => {
    if (currentStep === 1) {
      return (
        formData.motorFinance.financeProvider?.trim() !== "" &&
        (formData.motorFinance.vehicleNumber ?? "").trim() !== "" &&
        formData.motorFinance.multipleAgreements !== null &&
        formData.motorFinance.providerMultipleAgreements !== null &&
        formData.motorFinance.policyNumberKnown !== null &&
        (formData.motorFinance.policyNumberKnown === true
          ? formData.motorFinance.policyNumber?.trim() !== ""
          : true)
      );
    } else if (currentStep === 2) {
      return (
        formData.personalDetails.fullName?.trim() !== "" &&
        formData.personalDetails.dateOfBirth?.trim() !== "" &&
        formData.personalDetails.address?.trim() !== "" &&
        formData.personalDetails.addressSameAsFinance !== null &&
        (formData.personalDetails.addressSameAsFinance === false
          ? formData.personalDetails.previousAddress?.trim() !== ""
          : true)
      );
    }
    return false;
  };

  const handleInputChange =
    (formKey: "motorFinance" | "personalDetails") =>
    (
      e:
        | React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
        | { target: { name: string; value: boolean } },
    ) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [formKey]: {
          ...prev[formKey],
          [name]: typeof value === "boolean" ? value : String(value),
        },
      }));
    };

  const handleNextStep = () => {
    if (isStepValid()) {
      setDirection("right");
      setHasNavigated(true);
      setCurrentStep((prev) => Math.min(2, prev + 1));
    }
  };

  const handlePreviousStep = () => {
    setDirection("left");
    setHasNavigated(true);
    if (showEmailTemplate) {
      setShowEmailTemplate(false);
      setCurrentStep(2);
    } else if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isStepValid()) {
      setDirection("right");
      setHasNavigated(true);
      setShowEmailTemplate(true);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="flex w-full max-w-5xl flex-col overflow-hidden rounded-lg bg-white shadow-md md:flex-row">
        <div className="w-full border-b border-gray-300 p-4 md:border-r md:border-b-0 md:p-6 lg:w-1/2">
          <h1 className="mb-4 text-center text-2xl font-medium">
            Car Finance Reclaim
          </h1>

          <AnimatePresence custom={{ direction, hasNavigated }} mode="wait">
            {!showEmailTemplate && (
              <motion.form
                key={currentStep}
                onSubmit={handleSubmit}
                className="space-y-6"
                custom={{ direction, hasNavigated }}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ type: "tween", duration: 0.4 }}
              >
                {currentStep === 1 && (
                  <MotorFinanceForm
                    formData={formData.motorFinance}
                    onChange={handleInputChange("motorFinance")}
                  />
                )}
                {currentStep === 2 && (
                  <PersonalDetailsForm
                    formData={formData.personalDetails}
                    onChange={handleInputChange("personalDetails")}
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
                      disabled={!isStepValid()}
                      className={`ml-auto rounded-md px-4 py-2 text-white ${
                        isStepValid()
                          ? "cursor-pointer bg-blue-600 hover:bg-blue-700"
                          : "cursor-not-allowed bg-gray-400"
                      }`}
                    >
                      Next
                    </button>
                  )}
                  {currentStep === 2 && (
                    <button
                      type="submit"
                      disabled={!isStepValid()}
                      className={`ml-auto rounded-md px-4 py-2 text-white ${
                        isStepValid()
                          ? "cursor-pointer bg-[#C58F60] hover:bg-[#B07D50]"
                          : "cursor-not-allowed bg-gray-400"
                      }`}
                    >
                      Generate my enquiry / complaint
                    </button>
                  )}
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        <div className="w-full p-4 lg:w-1/2 lg:p-6">
          {showEmailTemplate ? (
            <motion.div
              key="generated-email"
              custom={{ direction, hasNavigated }}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ type: "tween", duration: 0.4 }}
            >
              <EmailTemplate
                personalDetails={formData.personalDetails}
                motorFinanceDetails={formData.motorFinance}
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
            <div className="text-center text-gray-500">
              <p>Your generated email will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
