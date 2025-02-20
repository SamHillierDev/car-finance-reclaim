import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  MotorFinanceFormData,
  PersonalDetailsFormData,
} from "../types/FormTypes";
import EmailTemplate from "./EmailTemplate";
import MotorFinanceForm from "./MotorFinanceForm";
import PersonalDetailsForm from "./PersonalDetailsForm";

const stepVariants = {
  enter: (direction: "left" | "right") => ({
    x: direction === "right" ? "100%" : "-100%",
    opacity: 0,
  }),
  center: { x: "0%", opacity: 1 },
  exit: (direction: "left" | "right") => ({
    x: direction === "right" ? "-100%" : "100%",
    opacity: 0,
  }),
};

interface ClaimFormProps {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  showEmailTemplate: boolean;
  setShowEmailTemplate: React.Dispatch<React.SetStateAction<boolean>>;
  direction: "left" | "right";
  setDirection: (dir: "left" | "right") => void;
}

export default function ClaimForm({
  currentStep,
  setCurrentStep,
  showEmailTemplate,
  setShowEmailTemplate,
  direction,
  setDirection,
}: ClaimFormProps) {
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
      if (!showEmailTemplate) {
        setDirection("right");
        if (currentStep < 2) {
          setCurrentStep((prev) => prev + 1);
        } else {
          setShowEmailTemplate(true);
        }
      }
    }
  };

  const handlePreviousStep = () => {
    setDirection("left");
    if (showEmailTemplate) {
      setShowEmailTemplate(false);
    } else if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <motion.div
      key="form"
      className="w-full max-w-lg p-6"
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={showEmailTemplate ? "emailTemplate" : `step-${currentStep}`}
          custom={direction}
          variants={stepVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.4 }}
        >
          {!showEmailTemplate ? (
            <motion.form className="space-y-6">
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
                    className="cursor-pointer rounded-md bg-gray-400 px-4 py-2 font-semibold text-white shadow-inner shadow-gray-300 outline-gray-300 transition hover:bg-gray-500"
                  >
                    Back
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleNextStep}
                  disabled={!isStepValid()}
                  className={`ml-auto rounded-md px-4 py-2 font-semibold text-white shadow-inner outline-gray-300 transition-all ${
                    isStepValid()
                      ? "cursor-pointer bg-[#C58F60] shadow-amber-400 hover:bg-[#B07D50]"
                      : "cursor-not-allowed bg-gray-400 opacity-50"
                  }`}
                >
                  {currentStep === 2
                    ? "Generate my enquiry / complaint"
                    : "Next"}
                </button>
              </div>
            </motion.form>
          ) : (
            <motion.div className="w-full">
              <EmailTemplate
                personalDetails={formData.personalDetails}
                motorFinanceDetails={formData.motorFinance}
              />
              <div className="mt-4">
                <button
                  type="button"
                  onClick={handlePreviousStep}
                  className="cursor-pointer rounded-md bg-gray-400 px-4 py-2 font-semibold text-white shadow-inner shadow-gray-300 outline-gray-300 transition hover:bg-gray-500"
                >
                  Back
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
