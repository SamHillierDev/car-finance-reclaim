import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import ClaimForm from "./components/ClaimForm";

const homePageVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -50 },
};

function App() {
  const [showForm, setShowForm] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showEmailTemplate, setShowEmailTemplate] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");

  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <AnimatePresence mode="wait">
        {!showForm ? (
          <motion.div
            key="home"
            className="flex min-h-screen w-full flex-col items-center justify-center px-6 text-center sm:px-10"
            variants={homePageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
          >
            <h1 className="mb-6 text-4xl font-semibold text-[#C58F60]">
              Car Finance Reclaim
            </h1>
            <p className="mb-8 max-w-md text-lg text-gray-600">
              Find out if you are eligible for a refund on your car finance
              agreements.
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="cursor-pointer rounded-md bg-[#C58F60] px-6 py-3 text-lg font-semibold text-white shadow-md transition-all hover:bg-[#B07D50]"
            >
              Find my agreements
            </button>
          </motion.div>
        ) : (
          <ClaimForm
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            showEmailTemplate={showEmailTemplate}
            setShowEmailTemplate={setShowEmailTemplate}
            direction={direction}
            setDirection={setDirection}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
