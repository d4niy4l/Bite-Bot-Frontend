import { useState } from 'react';
import { motion } from 'framer-motion';

const FormWizard = () => {
  const [step, setStep] = useState(0);

  // Step data (you can customize this to include actual forms)
  const steps = [
    <div key="step1" className="step">
      Step 1
    </div>,
    <div key="step2" className="step">
      Step 2
    </div>,
    <div key="step3" className="step">
      Step 3
    </div>,
  ];

  // Define motion variants for sliding effect
  const slideVariants = {
    hidden: { opacity: 0, x: '100%' },
    enter: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: '-100%' },
  };

  return (
    <div className="text-white max-w-[1000px] mx-auto">
      hello
      <div className="form-wizard">
        <motion.div
          className="steps-container"
          key={step}
          initial="hidden"
          animate="enter"
          exit="exit"
          variants={slideVariants}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {steps[step]}
        </motion.div>

        <div className="navigation">
          <button
            onClick={() => setStep((prevStep) => Math.max(prevStep - 1, 0))}
            disabled={step === 0}
          >
            Back
          </button>
          <button
            onClick={() =>
              setStep((prevStep) => Math.min(prevStep + 1, steps.length - 1))
            }
            disabled={step === steps.length - 1}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormWizard;
