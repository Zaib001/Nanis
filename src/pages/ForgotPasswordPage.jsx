import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowCircleUp } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function ForgotPasswordPage({ message = 'Ask Lovable to build your landing page' }) {
    const [email, setEmail] = useState('');
    const [sent, setSent] = useState(false);
    const navigate = useNavigate();

    const handleSendReset = async () => {
        if (!email) return toast.error('Enter your email');
        toast.success('Reset link sent');
        setSent(true);
    };

    return (
        <div className="flex h-screen w-full font-inter text-[#37352F] bg-[#F8F8F7]">
            {/* Left Side */}
            <div className="w-1/2 flex flex-col justify-center items-center px-6">
                <div className="w-[320px] space-y-4">
                    {!sent ? (
                        <>
                            <h2 className="text-xl font-semibold">Reset your password</h2>
                            <p className="text-sm text-[#6C6C6C]">
                                Enter your email address and we’ll send you a link to reset your password.
                            </p>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Email address</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email address"
                                    className="w-full h-[40px] px-[12px] border border-[#EBEAE7] rounded-md focus:outline-none text-sm"
                                />
                            </div>
                            <button
                                onClick={handleSendReset}
                                className="w-full bg-black text-white rounded-md h-[34px] text-sm font-medium"
                            >
                                Send reset link
                            </button>
                        </>
                    ) : (
                        <>
                            <h2 className="text-xl font-semibold">Email sent</h2>
                            <p className="text-sm text-[#6C6C6C]">
                                We’ve sent you a link to reset your password. Please check your email.
                            </p>
                            <button
                                onClick={() => navigate('/login')}
                                className="underline text-sm font-medium mt-2"
                            >
                                Back to login
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Right Side */}
            <div className="w-1/2 h-[98%] mt-2 mr-[10px] pr-6 flex items-center justify-center rounded-[12px]"
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
