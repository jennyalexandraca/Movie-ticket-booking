import React, { useState } from 'react';
import './ProgressLine.css'
const ProgressLine = () => {
  const [activeStep, setActiveStep] = useState(1);

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <div>
      <div className="progress-line">
        <div className={`step ${activeStep === 1 ? 'active' : ''}`} />
        <div className={`step ${activeStep === 2 ? 'active' : ''}`} />
        <div className={`step ${activeStep === 3 ? 'active' : ''}`} />
      </div>
      <div className="step-buttons">
       <hr className='h'/>
        <button
          className={`step-button ${activeStep === 1 ? 'active' : ''}`}
          onClick={() => handleStepChange(3)}
        >
           1
        </button>
        <button
          className={`step-button ${activeStep === 1 ? 'active' : ''}`}
          onClick={() => handleStepChange(3)}
        >
         2
        </button>
        <button
          className={`step-button ${activeStep === 1? 'active' : ''}`}
          onClick={() => handleStepChange(3)}
        >
        3
        </button>
      </div>
    </div>
  );
};

export default ProgressLine;
