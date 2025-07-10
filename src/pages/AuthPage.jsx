import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

import Apple from "../assets/path4.svg";
import Google from "../assets/Social icon.svg";
import Microsoft from "../assets/logos_microsoft-icon.svg";
import FiX from "../assets/close-circle.svg";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import {
  checkEmail,
  loginApple,
  loginGoogle,
  loginMicrosoft,
  registerUser,
  resendOtp,
  verifySignupOtp,
} from "../services/api";

import Header from "../components/Header";
import { useAuth } from "../providers/AuthProvider";

export default function AuthPage({ mode = "signup" }) {
  const isSignup = mode === "signup";
  const navigate = useNavigate();
  const { login, setUser } = useAuth();

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [showCodeField, setShowCodeField] = useState(false);
  const [password, setPassword] = useState("");
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({ field: "", message: "" });
  const [resent, setResent] = useState(false);
  const [resendTime, setResendTime] = useState(23);

  useEffect(() => {
    setError({ field: "", message: "" });
  }, [code, password, email, showPassword, showPassword]);

  useEffect(() => {
    if (resent) {
      let intervalId;
      intervalId = setInterval(() => setResendTime((prev) => prev - 1), 1000);
      setTimeout(() => {
        setResent(false);
        setResendTime(23);
        clearInterval(intervalId);
      }, 23000);
    }
  }, [resent]);

  const handleResendOtp = async () => {
    if (!email.includes("@")) {
      setError({ field: "email", message: "Please enter a valid email." });
      return;
    }
    try {
      await resendOtp({ email });
      setResent(true);
    } catch (error) { }
  };

  const handleEmailSubmit = async () => {
    if (!email.includes("@")) {
      setError({ field: "email", message: "Please enter a valid email." });
      return;
    }

    if (!isSignup) {
      if (!showPasswordField) {
        try {
          await checkEmail({ email });
        } catch (error) {
          setError({
            field: "email",
            message: error.message || "Failed to register.",
          });
          return;
        }
        setShowPasswordField(true);
        return;
      }

      if (!password || password.length < 4) {
        setError({ field: "password", message: "Please enter your password." });
        return;
      }

      try {
        await login({ email, password });
        navigate("/dashboard");
        return;
      } catch (error) {
        setError({ field: "password", message: error.message });
        return;
      }
    }

    // Signup flow
    if (!showCodeField) {
      try {
        await registerUser({ email });
        setShowCodeField(true);
        setUser(null);
        return;
      } catch (error) {
        setError({
          field: "email",
          message: error.message || "Wrong code. Try again",
        });
        return;
      }
    } else {
      if (!code || code.length !== 4) {
        setError({ field: "code", message: "Please enter the 4-digit code." });
        return;
      }

      try {
        await verifySignupOtp({ email, otp: code });
        navigate("/onboarding");
        return;
      } catch (error) {
        setError({
          field: "code",
          message: error.message || "OTP verification failed!",
        });
        return;
      }
    }
    // If code field is shown, validate code and proceed

    // proceed to onboarding after correct code
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
        <div className="w-[350px] flex flex-col justify-between text-center  font-medium">
          {/* Login / Signup toggle */}

          <div className="">
            <h1 className="text-[23px] text-start leading-[42px] font-bold">
              Your AI workspace.
            </h1>
            <h1 className="text-[23px] text-[#ACAAA7] -mt-3 text-start leading-[42px] font-bold">
              Get started with Nanis
            </h1>
          </div>

          {/* Email input */}
          <div className="flex flex-col gap-5 mt-[12px]">
            <div className=" flex flex-col gap-2">
              <div className="text-left relative">
                <label
                  htmlFor="email"
                  className="text-sm font-medium block mb-1 text-[#91918E]"
                >
                  Email address
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="olivia@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-[350px] outline-none px-2 py-[6px] h-[36px] rounded-[8px] text-sm pr-9
  ${error.field === "email"
                      ? "border-[1.5px] border-[#F1511B] shadow-[0_0_0_4px_rgba(241,81,27,0.2)] text-[#F1511B]"
                      : " border-[#D9D9D6] text-black"
                    }`}
                />

                {error.field === "email" && (
                  <p className="text-[#F1511B] text-xs mt-1">{error.message}</p>
                )}
                {email && (
                  <button
                    onClick={() => setEmail("")}
                    className="absolute right-2 top-[43px] transform -translate-y-1/2 text-[#4B4B4B]"
                  >
                    <img
                      src={FiX}
                      alt="Clear"
                      className="w-4 h-4 object-contain"
                    />
                  </button>
                )}
              </div>

              {showCodeField && (
                <div className="w-full font-inter">
                  <p className="text-[12px] font-normal text-left text-[#91918E] leading-[15px] mb-1">
                    We've sent a temporary sign-up code to your inbox Please
                    enter it below
                  </p>

                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={4}
                    value={code}
                    placeholder={
                      isSignup
                        ? "Enter a sign-up code"
                        : "Enter login verification code"
                    }
                    onChange={(e) =>
                      setCode(e.target.value.replace(/[^0-9]/g, ""))
                    }
                    className={`w-[350px] tracking-[0.5em] placeholder:tracking-normal outline-none px-2 py-[6px] h-[36px] rounded-[8px] text-sm pr-9
  ${error.field === "code"
                        ? "border-[1.5px] border-[#F1511B] shadow-[0_0_0_4px_rgba(241,81,27,0.2)] text-[#F1511B]"
                        : " border-[#D9D9D6] text-black"
                      }`}
                  />
                  {error.field === "code" && (
                    <p className="text-[#F1511B] text-xs mt-1 text-start font-medium">
                      {error.message}
                    </p>
                  )}
                </div>
              )}
              {showPasswordField && !isSignup && (
                <div className="text-left relative">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium block mb-1 text-[#91918E]"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-[350px] outline-none px-2 py-[6px] h-[36px] rounded-[8px] text-sm pr-9
  ${error.field === "password"
                        ? "border-[1.5px] border-[#F1511B] shadow-[0_0_0_4px_rgba(241,81,27,0.2)] text-[#F1511B]"
                        : " border-[#D9D9D6] text-black"
                      }`}
                  />
                  {error.field === "password" && (
                    <p className="text-[#F1511B] text-xs mt-1">
                      {error.message}
                    </p>
                  )}
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    type="button"
                    className="absolute right-2 top-[43px] transform -translate-y-1/2 text-[#4B4B4B]"
                  >
                    {showPassword ? (
                      <FaEyeSlash size={16} />
                    ) : (
                      <FaEye size={16} />
                    )}
                  </button>
                </div>
              )}
              <div className="flex flex-col gap-[10px]">
                <button
                  onClick={handleEmailSubmit}
                  className="w-[350px] h-[36px] bg-[#888870] text-white font-medium p-[10px] rounded-[8px] gap-[10px] text-[14px] leading-[100%]"
                >
                  {isSignup
                    ? showCodeField
                      ? "Continue"
                      : "Continue with email"
                    : showPasswordField
                      ? "Continue with password"
                      : "Continue with email"}
                </button>
                {showCodeField && (
                  <button
                    disabled={resent}
                    onClick={handleResendOtp}
                    className="w-[350px] h-[36px] disabled:bg-transparent bg-[#8888701A] text-[#888870] font-medium p-[10px] rounded-[8px] gap-[10px] text-[14px] leading-[100%]"
                  >
                    {resent
                      ? `Resend in ${resendTime}s`
                      : "Resend verification code"}
                  </button>
                )}
              </div>
              {!isSignup && showPasswordField && (
                <Link
                  to="/forgot-password"
                  className="text-xs text-[#91918E] underline text-center"
                >
                  Forgot password?
                </Link>
              )}
              <p className="text-xs text-[#999]">
                By clicking continue you are agreed to our{" "}
                <span className="underline">Terms of Service</span> and{" "}
                <span className="underline">Privacy Policy</span>
              </p>
            </div>
          </div>
          <div className="border-t-2 w-full border-[#EBEAE7] my-7"></div>
          {/* Social buttons */}
          <div className="space-y-2 w-[350px] ">
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
              <img
                src={Microsoft}
                alt="Microsoft"
                className="w-[18px] h-[18px]"
              />
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
