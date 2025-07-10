import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import FiX from "../assets/close-circle.svg";
import Google from "../assets/Social icon.svg";
import Microsoft from "../assets/logos_microsoft-icon.svg";
import Apple from "../assets/path4.svg";
import Header from "../components/Header";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (step === 1 && !email.includes("@")) return toast.error("Enter a valid email");
    if (step === 2 && code.length !== 4) return toast.error("Enter the 4-digit code");
    if (step === 3 && password.length < 8) return toast.error("Minimum 8 characters required");

    if (step === 4) return navigate("/login");
    setStep(step + 1);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#FAFAF9] font-inter text-[#37352F] flex items-center justify-center">

        <div className="w-[302px] flex flex-col justify-between text-center space-y-5">
          <div className="">
            <h1 className="text-[23px] text-start leading-[42px] font-bold">
              Your AI workspace.
            </h1>
            <h1 className="text-[23px] text-[#ACAAA7] -mt-3 text-start leading-[42px] font-bold">
              Get started with Nanis
            </h1>
          </div>


          
          {step === 1 && (
            <div className="text-left relative">
              <label className="text-sm font-medium block mb-1 text-[#91918E]">Email address</label>
              <input
                type="email"
                placeholder="olivia@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-2 py-[6px] h-[36px] border border-[#D9D9D6] rounded-[8px] text-sm pr-9"
              />
              {email && (
                <button
                  onClick={() => setEmail("")}
                  className="absolute right-2 top-[43px] transform -translate-y-1/2"
                >
                  <img src={FiX} alt="Clear" className="w-4 h-4 object-contain" />
                </button>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="text-left">
              <p className="text-[12px] text-[#91918E] leading-[15px] mb-1">
                We’ve sent you a code to reset your password. Please enter it below.
              </p>
              <input
                type="text"
                inputMode="numeric"
                maxLength={4}
                placeholder="____"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, ""))}
                className="w-full tracking-[0.5em] px-4 py-[6px] h-[36px] border border-[#D9D9D6] rounded-[8px] text-[14px] font-medium leading-[24px] text-center"
              />
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 text-left">
              {/* Password Field */}
              <div>
                <label className="block text-sm text-[#91918E] mb-1">Enter a new password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter a new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-[36px] border border-[#D9D9D6] rounded-md px-[8px] text-sm pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#6B6B6B]"
                  >
                    {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                  </button>
                </div>
                <p className="text-[10px] text-[#91918E] mt-1">Minimum 8 characters</p>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label className="block text-sm text-[#91918E] mb-1">Confirm your new password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full h-[36px] border border-[#D9D9D6] rounded-md px-[8px] text-sm pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#6B6B6B]"
                  >
                    {showConfirmPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                  </button>
                </div>
              </div>
            </div>
          )}



          {step === 4 && (
            <div className=" flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-10 h-10 rounded-full bg-[#888870] flex items-center justify-center">
                <span className="text-white text-lg">✓</span>
              </div>
              <h1 className="w-[468px] text-[34px] md:text-[34px] font-bold mb-4">
                Your password has been set
              </h1>
              <p className="text-xs text-[#91918E] text-[12px] leading-[16px]  w-[468px]">
                We’ll ask for this password when you log in to your account
              </p>
              <button
                onClick={() => navigate("/login")}
                className="text-sm underline text-[#91918E]"
              >
                Go to log in
              </button>
            </div>
          )}


          {step !== 4 && (
            <button
              onClick={handleSubmit}
              className="w-full h-[36px] bg-[#888870] text-white font-medium rounded-[8px] text-[14px] leading-[100%]"
            >
              {step === 1 && "Send reset link"}
              {step === 2 && "Continue"}
              {step === 3 && "Set a password"}
            </button>
          )}


        </div>
      </div >
    </>
  );
}
