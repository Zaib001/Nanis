import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowCircleUp } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function ResetPasswordPage({ message = 'Ask Lovable to build your landing page' }) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleResetPassword = () => {
    if (!newPassword || !confirmPassword) {
      return toast.error('Fill all fields');
    }
    if (newPassword !== confirmPassword) {
      return toast.error('Passwords do not match');
    }

    toast.success('Password reset successful');
    navigate('/login');
  };

  return (
    <div className="flex h-screen w-full font-inter text-[#37352F] bg-[#F8F8F7]">
      {/* Left Side */}
      <div className="w-1/2 flex items-center justify-center px-6">
        <div className="w-[320px] space-y-4 text-center">
          <h2 className="text-xl font-semibold">Reset Your Password</h2>
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full h-[40px] px-[12px] border border-[#EBEAE7] rounded-md focus:outline-none text-sm"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full h-[40px] px-[12px] border border-[#EBEAE7] rounded-md focus:outline-none text-sm"
          />
          <button
            onClick={handleResetPassword}
            className="w-full bg-black text-white rounded-md h-[34px] text-sm font-medium"
          >
            Reset Password
          </button>
        </div>
      </div>

      {/* Right Side - Gradient Background */}
      <div
        className="w-1/2 h-[98%] mt-2 mr-[10px] pr-6 flex items-center justify-center rounded-[12px]"
        style={{ background: 'linear-gradient(to bottom right, #888870, #666655)' }}
      >
        <div className="bg-white shadow-md flex items-center justify-between px-4 py-[10px] rounded-lg w-[320px] h-[44px]">
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
