import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { updateUserProfile } from '../services/api';
import { FaCheckCircle } from 'react-icons/fa';

export default function OnboardingFlow() {
  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState('');
  const [selectedUseCase, setSelectedUseCase] = useState('');
  const navigate = useNavigate();

  const useCases = [
    {
      title: 'For my team',
      description: 'Collaborate on your docs, projects, and wikis.',
      value: 'team',
      image: 'https://img.freepik.com/premium-vector/business-team-discussing-project-black-white-doodle-art-vector-flat-illustration_831490-5584.jpg'
    },
    {
      title: 'For personal use',
      description: 'Write better. Think more clearly. Stay organized.',
      value: 'personal',
      image: 'https://png.pngtree.com/png-clipart/20230929/original/pngtree-vector-spot-illustration-of-a-black-and-white-concept-for-a-png-image_12911159.png'
    },
    {
      title: 'For school',
      description: 'Keep your notes, research, and tasks all in one place.',
      value: 'school',
      image: 'https://media.istockphoto.com/id/1354365074/vector/black-and-white-vector-illustration-of-a-childrens-activity-coloring-book-page-with-a.jpg?s=612x612&w=0&k=20&c=WkN61UTGcjeRiToEW3RDFMpGYyJeZltukeLJEB75B0U='
    }
  ];

  console.log({selectedUseCase})

  const handleSubmit = async () => {
    try {
      await updateUserProfile({ name: fullName, preference: selectedUseCase });
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message || 'Could not enter data');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EDEDDF] font-inter px-4">
      <div className={`bg-white ${step === 2 ? 'w-[600px]' : 'w-full max-w-md'} rounded-xl shadow-sm p-6 space-y-6 text-center`}>        <div className="text-3xl font-bold">Nanis</div>

        {step === 1 && (
          <>
            <h2 className="text-xl font-semibold text-black">
              First things first, tell us a bit about yourself.
            </h2>
            <div className="flex flex-col items-center space-y-2">
              <div className="w-16 h-16 bg-[#F3F3F3] rounded-full flex items-center justify-center">
                <span className="text-sm text-gray-400">Add a photo</span>
              </div>
              <label className="text-sm font-medium text-black w-full text-left mt-4">
                What should we call you?
              </label>
              <input
                type="text"
                placeholder="Jane Smith"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none"
              />
            </div>
            <button
              disabled={!fullName.trim()}
              onClick={() => setStep(2)}
              className={`w-full text-white rounded-md py-2 text-sm font-semibold mt-4 ${fullName.trim() ? 'bg-black' : 'bg-gray-400 cursor-not-allowed'}`}
            >
              Continue
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-xl font-semibold text-black">
              How are you planning to use Nanis?
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              We’ll streamline your setup experience accordingly.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {useCases.map((useCase) => (
                <div
                  key={useCase.value}
                  onClick={() => setSelectedUseCase(useCase.value)}
                  className={`relative border rounded-md px-4 py-3 cursor-pointer transition-all duration-200 ${selectedUseCase === useCase.value
                      ? 'border-[#37352F] shadow-md'
                      : 'border-gray-300'
                    }`}
                >
                  {selectedUseCase === useCase.value && (
                    <FaCheckCircle className="absolute top-2 right-2 text-[#37352F]" />
                  )}
                  <div className="h-24 flex items-center justify-center">
                    <img src={useCase.image} alt={useCase.title} className="h-16" />
                  </div>
                  <div className="mt-2 font-semibold text-sm text-black">
                    {useCase.title}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {useCase.description}
                  </p>
                </div>
              ))}
            </div>
            <button
              onClick={handleSubmit}
              className="w-full mt-4 bg-black text-white py-2 rounded-md font-semibold text-sm"
              disabled={!selectedUseCase}
            >
              Continue
            </button>
          </>
        )}
      </div>
    </div>
  );
}
