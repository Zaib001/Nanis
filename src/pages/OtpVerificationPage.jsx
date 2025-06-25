import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaArrowCircleUp } from "react-icons/fa";
import toast from "react-hot-toast";
import { resendOtp, verifySignupOtp } from "../services/api";

export default function OtpVerificationPage({
  message = "Ask Nanis to build internal tools.",
}) {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "user@email.com";

  const handleVerify = async () => {
    if (!otp) return toast.error("Enter the OTP");
    try {
      await verifySignupOtp({ email, otp });
      toast.success("OTP verified");
      navigate("/onboarding");
    } catch (error) {
      toast.error(error.message || "OTP verification failed");
    }
  };

  const resendOTP = async () => {
    try {
      await resendOtp({ email });
      toast.success("A new code has been sent");
    } catch (error) {
      toast.error(error.message || "Failed to send new code");
    }
  };

  return (
    <div className="flex h-screen w-full font-inter text-[#37352F] bg-[#F8F8F7]">
      {/* Left - OTP form */}
      <div className="w-1/2 flex items-center justify-center px-6">
        <div className="bg-white p-8 rounded-md w-[460px] text-center space-y-4 shadow-sm">
          <div className="text-3xl font-bold">Nanis</div>
          <h2 className="text-xl font-semibold">Enter your login code</h2>
          <p className="text-sm text-[#6C6C6C]">
            We just sent a code to <span className="font-medium">{email}</span>{' '}
            <button
              onClick={() => navigate('/login')}
              className="underline font-medium text-[#37352F] ml-2 text-xs"
            >
              Edit
            </button>
          </p>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value.toUpperCase())}
            placeholder="4321"
            className="w-full h-[40px] text-center tracking-widest uppercase px-4 border border-[#EBEAE7] rounded-md focus:outline-none text-lg font-medium"
          />
          <button
            onClick={handleVerify}
            className="w-full bg-black text-white rounded-md h-[40px] font-semibold text-sm"
          >
            Continue
          </button>
          <p className="text-xs text-[#6C6C6C]">
            The code expires after 15 minutes.{" "}
            <button
              className="underline font-medium"
              onClick={resendOTP}
            >
              Get a new code
            </button>
          </p>
        </div>
      </div>

      {/* Right - Gradient box */}
      <div
        className="w-1/2 h-[98%] mt-2 mr-[10px] pr-6 flex items-center justify-center rounded-[12px]"
        style={{ background: "linear-gradient(to bottom, #888870, #888870)" }}
      >
        <div className="bg-white shadow-md flex items-center justify-between px-4 py-[10px] rounded-full w-[320px] h-[44px]">
          <input
            type="text"
            value={message}
            readOnly
            className="bg-transparent outline-none w-full text-sm font-medium text-[#37352F]"
          />
          <FaArrowCircleUp className="text-[#37352F]" />
        </div>
      </div>
    </div>
  );
}
