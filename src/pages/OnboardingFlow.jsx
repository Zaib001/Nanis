import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OnboardingFlow() {
  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const navigate = useNavigate();

  const categories = [
    'Website / Landing Page',
    'SaaS App',
    'Design',
    'E-commerce',
    'Games',
    'Internal Tools',
    'Prototyping/MVP',
    'Side Projects',
    'Other'
  ];

  const handleCategoryClick = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  const handleSubmit = () => {
    console.log({ fullName, selectedCategories });
    navigate('/dashboard'); // or wherever needed
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EDEDDF] font-inter px-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-sm p-6 space-y-6">
        <div className="text-3xl font-bold">Nanis</div>

        {step === 1 && (
          <>
            <h2 className="text-xl font-semibold text-black">
              Let's personalize your<br /> Lovable
            </h2>
            <div className="space-y-2">
              <label className="text-sm font-medium text-black">What's your name?</label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none"
              />
            </div>
            <button
              disabled={!fullName.trim()}
              onClick={() => setStep(2)}
              className={`w-full text-white rounded-md py-2 text-sm font-semibold ${fullName.trim() ? 'bg-black' : 'bg-gray-400 cursor-not-allowed'
                }`}
            >
              Continue
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-xl font-semibold text-black">
              What are you building with Lovable?
            </h2>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className={`px-3 py-1 rounded-md text-sm border transition-all duration-200 font-medium ${selectedCategories.includes(category)
                      ? 'bg-black text-white border-black'
                      : 'bg-[#F8F8F7] text-black border-gray-300'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setStep(1)}
                className="text-sm text-black border border-gray-300 px-4 py-2 rounded-md"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                className="text-sm text-white bg-black px-4 py-2 rounded-md font-semibold"
              >
                Submit
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
