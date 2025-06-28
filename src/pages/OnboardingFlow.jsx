import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { updateUserProfile } from '../services/api';
import { FaCheckCircle } from 'react-icons/fa';
import Header from '../components/Header';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import school from '../assets/teacher.svg'
import personal from '../assets/profile.svg'
import team from '../assets/buildings-2.svg'
import placeholder from '../assets/placeholder.svg';

export default function OnboardingFlow() {
  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState('');
  const [selectedUseCase, setSelectedUseCase] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [profilePic, setProfilePic] = useState(null);


  const navigate = useNavigate();


  const useCases = [
    {
      title: 'For my team',
      description: 'Used by teams managing legal, HR, or operational documents collaboratively.',
      value: 'team',
      icon: team
    },
    {
      title: 'For personal use',
      description: 'Used by individuals handling personal, freelance, or one-off legal documents.',
      value: 'personal',
      icon: personal
    },
    {
      title: 'For school',
      description: 'For students or educators managing research, assignments, and documents.',
      value: 'school',
      icon: school
    }
  ];
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    try {
      // await updateUserProfile({ name: fullName, preference: selectedUseCase });
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message || 'Could not enter data');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAF9] font-inter px-4">
      <Header />

      {step === 1 && (
        <div className="w-[302px] h-[378px] flex flex-col items-center">

          <h1 className="text-[34px] leading-[42px] md:text-[32px] font-bold text-center">Welcome to Nanis</h1>
          <p className="text-[12.5px] leading-[16px] text-[#636361] text-center mb-4">Start by sharing a few details about yourself</p>
          <div className="flex flex-col items-center gap-2 mb-6">
            <label htmlFor="profile-upload" className="cursor-pointer">
              <div className="w-12 h-12 bg-[#EDEDEB] rounded-full flex items-center justify-center overflow-hidden">
                {profilePic ? (
                  <img
                    src={profilePic}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <img
                    src={placeholder}
                    alt="Placeholder"
                    className="w-[50px] h-[50px] object-cover rounded-full"
                  />
                )}
              </div>
            </label>
            <input
              id="profile-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            <span className="text-xs text-[#91918E]">Add a profile</span>
          </div>


          <div className="w-full mb-4">
            <label className="block text-sm text-left text-[#91918E] mb-1">What should we call you?</label>
            <input
              type="text"
              placeholder="e.g. Daniel, Thomas"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-[302px] h-[36px] border border-[#D9D9D6] rounded-md px-[8px] py-[6px] text-sm focus:outline-none"
            />
          </div>

          <div className="w-full relative">
            <label className="block text-sm text-left text-[#91918E] mb-1">Set a secure password</label>

            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="New password"
              className="w-[302px] h-[36px] border border-[#D9D9D6] rounded-md px-[8px] py-[6px] text-sm pr-10 focus:outline-none"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-[43px] transform -translate-y-1/2 text-[#91918E]"
            >
              {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
            </button>

            <p className="text-[10px] text-left text-[#91918E] mt-1">Minimum 8 characters</p>
          </div>

          <button
            onClick={() => setStep(2)}
            disabled={!fullName.trim()}
            className="w-[302px] h-[36px] mt-6 bg-[#888870] text-white rounded-md py-2 text-sm font-medium"
          >
            Continue
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="w-[975px] h-[344px] flex flex-col justify-between gap-5">
          <h2 className="text-[24px] font-semibold text-black text-center mb-2">
            What will you be using Nanis for?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full">
            {useCases.map((useCase) => (
              <div
                key={useCase.value}
                onClick={() => setSelectedUseCase(useCase.value)}
                className={`relative w-[311.67px] h-[226px] p-[20px] rounded-[10px] border cursor-pointer flex flex-col items-center justify-between text-center transition-all duration-150 ${selectedUseCase === useCase.value
                  ? 'border-[#888870] shadow-sm'
                  : 'border-[#E4E4E4]'
                  }`}
              >

                <div className="w-[271.67px] h-[98px] bg-[#f5f5f4] rounded-[10px] flex items-center justify-center mb-[10px] p-[10px]">
                  <img src={useCase.icon} alt={useCase.title} className="h-10" />
                </div>

                <div className="flex flex-col gap-[10px]">
                  <div className="font-semibold text-[18px] leading-[16px] text-[#37352F]">
                    {useCase.title}
                  </div>
                  <div>
                    <p className="text-[14px] leading-[20px] text-[#636361]">{useCase.description}</p>
                  </div>
                </div>

              </div>
            ))}
          </div>

          <div className="flex justify-center w-full mt-4">
            <button
              onClick={handleSubmit}
              disabled={!selectedUseCase}
              className="w-[302px] h-[36px] bg-[#888870] text-white rounded-[8px] py-2 text-sm font-medium disabled:opacity-50"
            >
              Continue
            </button>
          </div>

        </div>
      )}


    </div>
  );
}
