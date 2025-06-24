import React, { useState } from 'react';
import { FaApple, FaGoogle, FaMicrosoft, FaArrowCircleUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { loginUser, registerUser } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function AuthPage({
    mode = 'login',
    message = 'Ask Lovable to build your saas star',
}) {
    const isSignup = mode === 'signup';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [agreed, setAgreed] = useState(false);


    const navigate = useNavigate();
    const handleSubmit = async () => {
        if (isSignup && !agreed) {
            toast.error('Please agree to the Terms and Privacy Policy');
            return;
        }

        const payload = { email, password };
        const toastId = toast.loading(isSignup ? 'Signing up...' : 'Signing in...');

        try {
            const response = isSignup
                ? await registerUser(payload)
                : await loginUser(payload);

            toast.success('Success!', { id: toastId });
            console.log('Auth Success:', response);

            if (isSignup) {
                navigate('/verify-otp', { state: { email } });
            } else {
                // navigate('/dashboard');
            }
        } catch (error) {
            toast.error(error.message || 'Authentication failed', { id: toastId });
        }
    };

    return (
        <div className="flex h-screen w-full font-inter text-[#37352F] bg-[#F8F8F7]">
                <div className="w-1/2 flex flex-col justify-center items-center px-6">
                <div className="w-[320px] space-y-3">
                    <h2 className="text-2xl font-semibold mb-4">
                        {isSignup ? 'Create your account' : 'Sign in'}
                    </h2>

                    {[FaApple, FaGoogle, FaMicrosoft].map((Icon, i) => (
                        <button
                            key={i}
                            type="button"
                            className="w-full flex items-center justify-center gap-2 bg-white border border-[#EBEAE7] rounded-md h-[34px] font-medium text-sm"
                        >
                            <Icon />
                            {isSignup ? 'Sign up' : 'Sign in'} with {Icon.name.replace('Fa', '')}
                        </button>
                    ))}

                    <div className="flex items-center gap-4 text-sm text-[#ADADAD]">
                        <div className="flex-grow h-px bg-[#EBEAE7]" />
                        <span>OR</span>
                        <div className="flex-grow h-px bg-[#EBEAE7]" />
                    </div>

                    {/* Email Field */}
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            className="w-full h-[44px] px-[14px] py-[10px] border border-[#EBEAE7] rounded-[8px] text-sm font-medium focus:outline-none"
                        />
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                        <label htmlFor="password" className="text-sm font-medium flex justify-between">
                            Password
                            {!isSignup && (
                                <Link to="/forgot-password" className="text-xs text-[#6C6C6C] underline">
                                    Forgot password?
                                </Link>
                            )}
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="w-full h-[44px] px-[14px] py-[10px] border border-[#EBEAE7] rounded-md text-sm font-medium focus:outline-none"
                        />
                    </div>

                    {/* Terms Checkbox */}
                    {isSignup && (
                        <label className="flex items-start gap-2 text-xs text-[#37352F] cursor-pointer">
                            <input
                                type="checkbox"
                                checked={agreed}
                                onChange={(e) => setAgreed(e.target.checked)}
                                className="sr-only peer"
                            />
                            <div className="w-[14px] h-[14px] border border-[#ADADAD] rounded-sm flex items-center justify-center peer-checked:bg-[#37352F] peer-checked:border-[#37352F]">
                                <svg
                                    className="hidden peer-checked:block w-[8px] h-[8px]"
                                    viewBox="0 0 12 10"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M1 5L4.5 8.5L11 1" stroke="white" strokeWidth="2" />
                                </svg>
                            </div>
                            <span>
                                Agree to our <a href="#" className="underline">Terms of Service</a> and{' '}
                                <a href="#" className="underline">Privacy Policy</a>
                            </span>
                        </label>
                    )}

                    {/* Submit Button */}
                    <button
                        onClick={handleSubmit}
                        className="w-full flex items-center justify-center gap-2 bg-black text-white border border-[#EBEAE7] rounded-md h-[34px] font-bold text-sm"
                    >
                        {isSignup ? 'Sign up' : 'Sign in'}
                    </button>

                    {/* Switch link */}
                    <p className="text-sm text-center">
                        {isSignup ? 'Already have an account?' : 'Don’t have an account?'}{' '}
                        <Link
                            to={isSignup ? '/login' : '/signup'}
                            className="underline text-[#37352F] font-medium"
                        >
                            {isSignup ? 'Sign In' : 'Sign Up'}
                        </Link>
                    </p>
                </div>
            </div>

            {/* Right - Gradient Message Box */}
            <div className="w-1/2 h-[98%] mt-2 mr-[10px] pr-6 flex items-center justify-center rounded-[12px]" style={{ backgroundColor: '#888870' }}>
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
