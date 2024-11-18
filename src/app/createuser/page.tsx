"use client"
import React, { useState } from 'react';
import StepOneForm from './StepOneForm';
import StepTwoForm from './StepTwoForm';
import StepThreeForm from './StepThreeForm';
import StepFourForm from './StepFourForm';

const ParentForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded">
      {/* Step Indicator */}
      <div className="mb-6">
        <div className="flex justify-between items-center">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex flex-col items-center">
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full text-white ${
                  currentStep >= step ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              >
                {step}
              </div>
              <span
                className={`mt-2 text-sm ${
                  currentStep >= step ? 'text-blue-500 font-bold' : 'text-gray-400'
                }`}
              >
                {step === 1
                  ? 'User Info'
                  : step === 2
                  ? 'Address'
                  : step === 3
                  ? 'Upload File'
                  : 'Multiple Uploads & Location'}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 h-1 bg-gray-300">
          <div
            className="bg-blue-500 h-1"
            style={{
              width: `${(currentStep / 4) * 100}%`,
            }}
          ></div>
        </div>
      </div>

      {/* Current Step Content */}
      <div className="mb-6">
        {currentStep === 1 && <StepOneForm />}
        {currentStep === 2 && <StepTwoForm />}
        {currentStep === 3 && <StepThreeForm />}
        {currentStep === 4 && <StepFourForm />}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={handlePreviousStep}
          disabled={currentStep === 1}
          className={`py-2 px-4 rounded ${
            currentStep === 1
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gray-500 text-white hover:bg-gray-600'
          }`}
        >
          Previous
        </button>
        <button
          type="button"
          onClick={handleNextStep}
          disabled={currentStep === 4}
          className={`py-2 px-4 rounded ${
            currentStep === 4
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ParentForm;
