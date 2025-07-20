import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import Apple from "../assets/path4.svg";
import Google from "../assets/Social icon.svg";
import Microsoft from "../assets/logos_microsoft-icon.svg";
import FiX from "../assets/close-circle.svg";
import { FaEyeSlash } from "react-icons/fa";
import eye from "../assets/eye.svg";

import {
  checkEmail,
  loginApple,
  loginGoogle,
  loginMicrosoft,
  registerUser,
  resendOtp,
  resetPassword,
  verifyForgotPasswordOtp,
  verifySignupOtp,
} from "../services/api";
import Tick from "../assets/Tick.jpg";

import Header from "../components/Header";
import { useAuth } from "../providers/AuthProvider";

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

const Spinner = () => {
  return (
    <div
      className="w-[14px] h-[14px] border-white border-t-transparent rounded-full animate-spin"
      style={{
        borderWidth: "2px",
        borderStyle: "solid",
        borderRadius: "9999999px",
      }}
    />
  );
};

const PasswordUpdated = ({ setStep }) => {
  return (
    <div className="bg-white rounded-2xl   font-inter flex flex-col items-center  mx-auto text-center ">
      <img src={Tick} alt="" className="" />
      <div className="flex flex-col">
        <h1 className=" text-[32px] text-[#32302C] mb-1 font-bold">
          Password updated
        </h1>
        <p className="text-[12px] text-[#91918E]">
          You’re all set! Use your new password to access Nanis
        </p>
      </div>
      <button
        onClick={() => setStep("login-password")}
        className=" text-[#888870] text-[12px] px-6 py-3 rounded-lg text-base font-medium hover:opacity-90 transition"
      >
        Go to login
      </button>
    </div>
  );
};

export default function AuthPage() {
  const navigate = useNavigate();
  const { login, setUser } = useAuth();

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [showCodeField, setShowCodeField] = useState(false);
  const [password, setPassword] = useState("");
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({ field: "", message: "", type: "" });
  const [resent, setResent] = useState(false);
  const [resendTime, setResendTime] = useState(60);
  const [resetToken, setResetToken] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState({
    message: "",
    type: "",
  });

  const [loading, setLoading] = useState(false);

  const [step, setStep] = useState("check-email");

  useEffect(() => {
    setError({ field: "", message: "" });
  }, [code, email]);

  useEffect(() => {
    if (resent) {
      let intervalId;
      intervalId = setInterval(() => setResendTime((prev) => prev - 1), 1000);
      setTimeout(() => {
        setResent(false);
        setResendTime(60);
        clearInterval(intervalId);
      }, 60000);
    }
  }, [resent]);

  console.log({ resetToken });

  useEffect(() => {
    if (step !== "set-new-password") return;

    if (
      password.length === 8 &&
      confirmPassword.length === 8 &&
      password !== confirmPassword
    ) {
      setError({
        field: "password",
        message: "The passwords entered don't match",
        type: "scary",
      });
      setConfirmPasswordError({
        message: "The passwords entered don't match",
        type: "scary",
      });
      setPassword("");
      setConfirmPassword("");
      return;
    }

    if (
      step === "set-new-password" &&
      error.type === "scary" &&
      password.length === 0
    )
      return;

    if (password.length < 8)
      setError({
        field: "password",
        message: "Enter at least 8 characters for security",
        type: "light",
      });
    else setError({ field: "", message: "" });

    if (confirmPassword.length < 8)
      setConfirmPasswordError({
        message: "Enter at least 8 characters for security",
        type: "light",
      });
    else setConfirmPasswordError({ field: "", message: "" });
  }, [password, confirmPassword]);

  const handleResendOtp = async () => {
    if (!email.includes("@")) {
      setError({ field: "email", message: "Please enter a valid email." });
      return;
    }
    try {
      await resendOtp({ email });
      setResent(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEmailSubmit = async () => {
    setError({ field: "", message: "", type: "" });
    setConfirmPasswordError({ message: "", type: "" });
    setLoading(true);
    setPassword("");
    setConfirmPassword("")
    switch (step) {
      case "check-email":
        try {
          if (!isValidEmail(email)) throw new Error("Email doesn't exist");
          const res = await checkEmail({ email });
          console.log({ res });
          setStep(res.step);
        } catch (error) {
          setError({
            field: "email",
            message: error.message || "Failed to register.",
          });
        } finally {
          setLoading(false);
        }
        break;
      case "signup-otp":
        try {
          await verifySignupOtp({ email, otp: code });
          navigate("/onboarding");
        } catch (error) {
          console.log(error);
          setError({
            field: "code",
            message: error.message || "OTP verification failed!",
          });
        } finally {
          setLoading(false);
        }

        break;
      case "login-password":
        try {
          const res = await login({ email, password });
          if (res.user.step === "dashboard") navigate("/dashboard");
          else setStep(res.user.step);
          console.log({ res });
        } catch (error) {
          setError({
            field: "password",
            message: error.message,
            type: "scary",
          });
        } finally {
          setLoading(false);
        }

        break;
      case "verify-login-otp":
        try {
          await verifySignupOtp({ email, otp: code, isLogin: true });
          navigate("/dashboard");
        } catch (error) {
          setError({ field: "code", message: error.message });
        } finally {
          setLoading(false);
        }

        break;
      case "verify-forgot-otp":
        try {
          const res = await verifyForgotPasswordOtp({ email, otp: code });
          console.log({ forgotRes: res });
          setResetToken(res.resetPasswordToken);
          console.log({ res });
          setStep("set-new-password");
        } catch (error) {
          setError({
            field: "code",
            message: error.message || "OTP verification failed!",
          });
        } finally {
          setLoading(false);
        }

        break;
      case "set-new-password":
        try {
          await resetPassword({ token: resetToken, newPassword: password });
          setStep("password-reset-successful");
        } catch (error) {
          setError({
            field: "code",
            message: error.message || "OTP verification failed!",
          });
        } finally {
          setLoading(false);
        }

        break;
      default:
        return;
    }

    // if (!isSignup) {
    //   if (!showPasswordField) {
    //     try {
    //       await checkEmail({ email });
    //     } catch (error) {
    //       setError({
    //         field: "email",
    //         message: error.message || "Failed to register.",
    //       });
    //       return;
    //     }
    //     setShowPasswordField(true);
    //     return;
    //   }
    //
    //   if (!password || password.length < 4) {
    //     setError({ field: "password", message: "Please enter your password." });
    //     return;
    //   }
    //
    //   try {
    //     await login({ email, password });
    //     navigate("/dashboard");
    //     return;
    //   } catch (error) {
    //     setError({ field: "password", message: error.message });
    //     return;
    //   }
    // }
    //
    // // Signup flow
    // if (!showCodeField) {
    //   try {
    //     await registerUser({ email });
    //     setShowCodeField(true);
    //     setUser(null);
    //     return;
    //   } catch (error) {
    //     setError({
    //       field: "email",
    //       message: error.message || "Wrong code. Try again",
    //     });
    //     return;
    //   }
    // } else {
    //   if (!code || code.length !== 4) {
    //     setError({ field: "code", message: "Please enter the 4-digit code." });
    //     return;
    //   }
    //
    //   try {
    //     await verifySignupOtp({ email, otp: code });
    //     navigate("/onboarding");
    //     return;
    //   } catch (error) {
    //     setError({
    //       field: "code",
    //       message: error.message || "OTP verification failed!",
    //     });
    //     return;
    //   }
    // }
    // If code field is shown, validate code and proceed

    // proceed to onboarding after correct code
  };
  return (
    <>
      <Header />

      <div className="min-h-screen bg-[#FAFAF9] font-inter text-[#37352F] flex items-center justify-center">
        {step === "password-reset-successful" ? (
          <PasswordUpdated setStep={setStep} />
        ) : (
          <div className="w-[350px] flex flex-col justify-between text-center  font-medium">
            {/* Login / Signup toggle */}

            <div className="">
              <h1 className="text-[23px] text-start leading-[42px] font-semibold">
                Your AI workspace.
              </h1>
              <h1 className="text-[23px] text-[#ACAAA7] -mt-3 text-start leading-[42px] font-semibold">
                {step === "verify-forgot-otp" || step === "set-new-password"
                  ? "Let’s create a new password"
                  : "Get started with Nanis"}
              </h1>
            </div>
            {/* Email input */}
            <div className="flex flex-col gap-5 mt-[12px]">
              <div className=" flex flex-col gap-[6px]">
                {(step === "check-email" ||
                  step === "login-password" ||
                  step === "signup-otp") && (
                    <div className="text-left relative">
                      <label
                        htmlFor="email"
                        className="text-xs font-medium block mb-1 text-[#91918E]"
                      >
                        Email address
                      </label>

                      <input
                        disabled={step !== "check-email"}
                        id="email"
                        type="email"
                        placeholder="Enter your personal or company email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-[350px] placeholder:font-medium outline-none placeholder:text-xs border-[1px] border-[#EBEAE7] px-2 py-[6px] h-[36px] rounded-[8px] text-sm pr-9
  ${error.field === "email"
                            ? "border-[1.5px] border-[#F1511B] shadow-[0_0_0_4px_rgba(241,81,27,0.2)] text-[#F1511B]"
                            : ` border-[#D9D9D6] ${step === "check-email" ? "text-black" : "text-gray-500"}`
                          }`}
                      />

                      {error.field === "email" && (
                        <p className="text-[#F1511B] text-xs mt-1">
                          {error.message}
                        </p>
                      )}
                      {email && (
                        <button
                          onClick={() => {
                            if (step === "check-email") setEmail("");
                            else {
                              setStep("check-email");
                              setEmail("");
                            }
                          }}
                          className="absolute right-2 top-[38px] transform -translate-y-1/2 text-[#4B4B4B]"
                        >
                          <img
                            src={FiX}
                            alt="Clear"
                            className="w-4 h-4 object-contain"
                          />
                        </button>
                      )}
                    </div>
                  )}
                {(step === "signup-otp" ||
                  step === "verify-login-otp" ||
                  step === "verify-forgot-otp") && (
                    <div className="w-full font-inter">
                      {step === "verify-forgot-otp" ||
                        step === "set-new-password" ? (
                        <>
                          <p className="text-[12px] font-medium relative text-left text-[#91918E] leading-[15px] mb-1">
                            A temporary code has been sent to{" "}
                            <span className="font-bold text-[#888870] absolute -right-9">
                              {email}
                            </span>
                          </p>
                          <p className="text-[12px] font-medium text-left text-[#91918E] leading-[15px] mb-1">
                            Enter it below to continue{" "}
                          </p>
                        </>
                      ) : (
                        <p className="text-[12px] font-medium text-left text-[#91918E] leading-[15px] mb-1">
                          We've sent a temporary sign-up code to your inbox Please
                          enter it below
                        </p>
                      )}

                      <input
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        value={code}
                        placeholder={
                          step === "signup-otp"
                            ? "Enter sign up code"
                            : step === "verify-login-otp"
                              ? "Enter login verification code"
                              : "Enter verification code"
                        }
                        onChange={(e) =>
                          setCode(e.target.value.replace(/[^0-9]/g, ""))
                        }
                        className={`w-[350px] tracking-[0.5em] placeholder:tracking-normal mt-1 placeholder:text-[#B3B2B0] placeholder:text-[14px] outline-none px-2 py-[6px] h-[36px] rounded-[8px] text-sm pr-9
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
                {(step === "login-password" || step === "set-new-password") && (
                  <div>
                    {" "}
                    <div className="text-left relative">
                      <label
                        htmlFor="password"
                        className="text-[12px] font-medium block mb-[6px] text-[#91918E]"
                      >
                        {step === "login-password"
                          ? "Password"
                          : "Create a new password"}
                      </label>
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`w-[350px] outline-none px-2 py-[6px] h-[36px] rounded-[8px] text-sm pr-9
  ${error?.field === "password" && error?.type === "scary"
                            ? "border-[1.5px] border-[#F1511B] shadow-[0_0_0_4px_rgba(241,81,27,0.2)] text-[#F1511B]"
                            : error.field === "password" && error.type === "light"
                              ? "border-[1.5px] border-[#AD9669] "
                              : " border-[#D9D9D6] text-black"
                          }`}
                      />
                      {error?.field === "password" && (
                        <p
                          className={`text-[12px] font-medium mb-[10px] text-left  mt-1 ${error?.type === "light" ? "text-[#91918E]" : "text-[#F1511B]"}`}
                        >
                          {error?.message}
                        </p>
                      )}
                      <button
                        onClick={() => setShowPassword(!showPassword)}
                        type="button"
                        className="absolute right-2 top-[43px] transform -translate-y-1/2 text-[#4B4B4B]"
                      >
                        {showPassword ? (
                          <FaEyeSlash size={13} />
                        ) : (
                          <img src={eye} className="w-[13.34px]" />
                        )}
                      </button>
                    </div>
                    {step === "set-new-password" && (
                      <div className="text-left mt-1 relative">
                        <label
                          htmlFor="confirm-password"
                          className="text-[12px] font-medium block mb-[6px] text-[#91918E]"
                        >
                          Verify your password
                        </label>
                        <input
                          id="confirm-password"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Verify your password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className={`w-[350px] outline-none px-2 py-[6px] h-[36px] rounded-[8px] text-sm pr-9
  ${confirmPasswordError?.message && confirmPasswordError?.type === "scary"
                              ? "border-[1.5px] border-[#F1511B] shadow-[0_0_0_4px_rgba(241,81,27,0.2)] text-[#F1511B]"
                              : confirmPasswordError?.message && confirmPasswordError?.type === "light"
                                ? "border-[1.5px] border-[#AD9669] "
                                : " border-[#D9D9D6] text-black"
                            }`}
                        />
                        {confirmPasswordError?.message && (
                          <p
                            className={`text-[12px] font-medium mb-[10px] text-left  mt-1 ${confirmPasswordError?.type === "light" ? "text-[#91918E]" : "text-[#F1511B]"}`}
                          >
                            {confirmPasswordError?.message}
                          </p>
                        )}
                        <button
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          type="button"
                          className="absolute right-2 top-[43px] transform -translate-y-1/2 text-[#4B4B4B]"
                        >
                          {showConfirmPassword ? (
                            <FaEyeSlash size={13} />
                          ) : (
                            <img src={eye} className="w-[13.34px]" />
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                )}
                <div className="flex flex-col gap-[10px] mt-1">
                  <button
                    disabled={loading}
                    onClick={handleEmailSubmit}
                    className="w-[350px] h-[36px] bg-[#888870] relative flex justify-center items-center gap-[4px]   font-[450] p-[10px] rounded-[8px]  text-[14px] leading-[100%]"
                  >
                    {loading && (
                      <span className="w-fit ">
                        <Spinner />
                      </span>
                    )}
                    <span className={loading ? "text-white/60" : "text-white"}>
                      {step === "check-email"
                        ? "Continue with email"
                        : step === "login-password"
                          ? "Continue with password"
                          : "Continue"}
                    </span>
                  </button>
                  {(step === "signup-otp" ||
                    step === "verify-login-otp" ||
                    step === "verify-forgot-otp") && (
                      <button
                        disabled={resent}
                        onClick={handleResendOtp}
                        className="w-[350px] h-[36px] disabled:bg-transparent bg-[#8888701A] text-[#888870] font-medium p-[10px] rounded-[8px] gap-[10px] text-[12px] leading-[100%]"
                      >
                        {resent
                          ? `Resend in ${resendTime}s`
                          : "Resend verification code"}
                      </button>
                    )}
                </div>
                {step === "login-password" && (
                  <button
                    onClick={async () => {
                      setLoading(true);
                      await handleResendOtp();
                      setStep("verify-forgot-otp");
                      setLoading(false);
                    }}
                    className="text-xs text-[#91918E] underline text-center"
                  >
                    Forgot password?
                  </button>
                )}
                <p className="text-xs text-[#999]">
                  By clicking continue you are agreed to our
                  <br />
                  <span className="underline">Terms of Service</span> and{" "}
                  <span className="underline">Privacy Policy</span>
                </p>
              </div>
            </div>
            <div className="border-t-[1px] w-full border-[#EBEAE7] my-7"></div>
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
            {step === "verify-forgot-otp" ||
              (step === "set-new-password" && (
                <button
                  onClick={() => {
                    setStep("login-password");
                    setPassword("");
                  }}
                  className="mt-[20px] text-[12px] text-[#91918E] underline text-center"
                >
                  {" "}
                  Go to log in
                </button>
              ))}
          </div>
        )}
      </div>
    </>
  );
}
