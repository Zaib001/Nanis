import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

import Apple from '../assets/path4.svg';
import Google from '../assets/Social icon.svg';
import Microsoft from '../assets/logos_microsoft-icon.svg';
import FiX from "../assets/close-circle.svg";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import {
    loginApple,
    loginGoogle,
    loginMicrosoft,
    loginUser,
    registerUser,
} from '../services/api';

import Header from '../components/Header';

export default function AuthPage({ mode = 'signup' }) {
    const isSignup = mode === 'signup';
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [showCodeField, setShowCodeField] = useState(false);
    const [password, setPassword] = useState('');
    const [showPasswordField, setShowPasswordField] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleEmailSubmit = async () => {
        if (!email.includes("@")) {
            toast.error("Please enter a valid email.");
            return;
        }

        if (!isSignup) {
            if (!showPasswordField) {
                setShowPasswordField(true);
                return;
            }
            if (!password || password.length < 4) {
                toast.error("Please enter your password.");
                return;
            }

            // proceed with actual login
            navigate('/dashboard');
            return;
        }

        // Signup flow
        if (!showCodeField) {
            setShowCodeField(true);
            return;
        }

        // If code field is shown, validate code and proceed
        if (!code || code.length !== 4) {
            toast.error("Please enter the 4-digit code.");
            return;
        }

        // proceed to onboarding after correct code
        navigate('/onboarding');
    };

    // const handleEmailSubmit = async () => {
    //     if (!email.includes("@")) {
    //         toast.error("Please enter a valid email.");
    //         return;
    //     }

    //     if (!isSignup) {
    //         if (!showPasswordField) {
    //             setShowPasswordField(true);
    //             return;
    //         }
    //         if (!password || password.length < 4) {
    //             toast.error("Please enter your password.");
    //             return;
    //         }

    //         // proceed with actual login (you can call loginUser here)
    //         navigate('/dashboard'); // or handle login logic
    //         return;
    //     }else {
    //         setShowCodeField(true)
    //     }
    //     // const toastId = toast.loading(isSignup ? 'Signing up...' : 'Signing in...');
    //     // try {
    //     //   const payload = { email, password: 'placeholder' };

    //     //   const res = isSignup
    //     //     ? await registerUser(payload)
    //     //     : await loginUser(payload);

    //     //   toast.success("Success!", { id: toastId });

    //     //   if (isSignup) {
    //     //     // Instead of navigating, we show the code field
    //     //     setShowCodeField(true);
    //     //   } else {
    //     //     navigate("/dashboard");
    //     //   }
    //     // } catch (err) {
    //     //   toast.error(err.message || "Authentication failed", { id: toastId });
    //     // }
    // };

    return (
        <>
            <Header />

            <div className="min-h-screen bg-[#FAFAF9] font-inter text-[#37352F] flex items-center justify-center">
                <div className="w-[302px] flex flex-col justify-between text-center space-y-5">

                    {/* Login / Signup toggle */}
                    <div className="flex justify-center">
                        <div className="w-[125px] h-[28px] p-[2px] bg-[#F1F1EF] rounded-md flex gap-[1px]">
                            <Link
                                to="/login"
                                className={`w-[65px] h-[24px] flex items-center justify-center text-sm rounded-md transition
                  ${!isSignup ? 'bg-white text-black font-medium' : 'text-[#8E8E8E]'}`}
                            >
                                Log in
                            </Link>
                            <Link
                                to="/signup"
                                className={`w-[65px] h-[24px] flex items-center justify-center text-sm rounded-md transition
                  ${isSignup ? 'bg-white text-black font-medium' : 'text-[#8E8E8E]'}`}
                            >
                                Sign up
                            </Link>
                        </div>
                    </div>

                    <h1 className="text-[34px] leading-[42px] font-bold">{isSignup ? 'Sign up' : 'Log in'}</h1>

                    {/* Email input */}
                    <div className="text-left relative">
                        <label htmlFor="email" className="text-sm font-medium block mb-1 text-[#91918E]">
                            Email address
                        </label>

                        <input
                            id="email"
                            type="email"
                            placeholder="olivia@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-[302px] px-2 py-[6px] h-[36px] border border-[#D9D9D6] rounded-[8px] text-sm pr-9"
                        />

                        {email && (
                            <button
                                onClick={() => setEmail("")}
                                className="absolute right-2 top-[43px] transform -translate-y-1/2 text-[#4B4B4B]"
                            >
                                <img src={FiX} alt="Clear" className="w-4 h-4 object-contain" />
                            </button>
                        )}
                    </div>

                    {showCodeField && (
                        <div className="w-full font-inter">
                            <p className="text-[12px] font-normal text-left text-[#91918E] leading-[15px] mb-0">
                                We've sent a temporary sign-up code to your inbox Please enter it below
                            </p>

                            <input
                                type="text"
                                inputMode="numeric"
                                maxLength={4}
                                placeholder="____"
                                value={code}
                                onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, ''))}
                                className="w-full mt-0 tracking-[0.5em] px-4 py-[6px] h-[36px] border border-[#D9D9D6] rounded-[8px] text-[14px] font-medium leading-[24px] text-[#000] text-center"
                            />
                        </div>

                    )}
                    {showPasswordField && !isSignup && (
                        <div className="text-left relative">
                            <label htmlFor="password" className="text-sm font-medium block mb-1 text-[#91918E]">
                                Password
                            </label>
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-[302px] px-2 py-[6px] h-[36px] border border-[#D9D9D6] rounded-[8px] text-sm pr-9"
                            />
                            <button
                                onClick={() => setShowPassword(!showPassword)}
                                type="button"
                                className="absolute right-2 top-[43px] transform -translate-y-1/2 text-[#4B4B4B]"
                            >
                                {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                            </button>
                        </div>
                    )}

                    <button
                        onClick={handleEmailSubmit}
                        className="w-[302px] h-[36px] bg-[#888870] text-white font-medium p-[10px] rounded-[8px] gap-[10px] text-[14px] leading-[100%]"
                    >
                        {isSignup
                            ? showCodeField
                                ? 'Create new account'
                                : 'Continue with email'
                            : showPasswordField
                                ? 'Continue with password'
                                : 'Continue with email'}
                    </button>

                    {isSignup ? (
                        <p className="text-xs text-[#999]">
                            By clicking continue you are agreed to our{' '}
                            <span className="underline">Terms of Service</span> and{' '}
                            <span className="underline">Privacy Policy</span>
                        </p>
                    ) : (
                        <Link to="/forgot-password" className="text-xs text-[#91918E] underline text-center">
                            Forgot password?
                        </Link>
                    )}


                    {/* Social buttons */}
                    <div className="space-y-2 w-[302px]">
                        <button
                            onClick={loginGoogle}
                            className="w-full h-[36px] px-4 flex items-center justify-start gap-[12px] border border-[#E4E4E4] rounded-[8px] bg-white text-[14px] leading-[100%] font-medium"
                        >
                            <img src={Google} alt="Google" className="w-[18px] h-[18px]" />
                            Continue with Google
                        </button>

                        <button
                            onClick={loginMicrosoft}
                            className="w-full h-[36px] px-4 flex items-center justify-start gap-[12px] border border-[#E4E4E4] rounded-[8px] bg-white text-[14px] leading-[100%] font-medium"
                        >
                            <img src={Microsoft} alt="Microsoft" className="w-[18px] h-[18px]" />
                            Continue with Microsoft Account
                        </button>

                        <button
                            onClick={loginApple}
                            className="w-full h-[36px] px-4 flex items-center justify-start gap-[12px] border border-[#E4E4E4] rounded-[8px] bg-white text-[14px] leading-[100%] font-medium"
                        >
                            <img src={Apple} alt="Apple" className="w-[18px] h-[18px]" />
                            Continue with Apple
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
