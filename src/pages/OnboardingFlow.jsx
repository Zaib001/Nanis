import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { updateUserProfile, uploadProfilePic } from "../services/api";
import { FaCheckCircle } from "react-icons/fa";
import Header from "../components/Header";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import school from "../assets/teacher.svg";
import personal from "../assets/profile.svg";
import team from "../assets/buildings-2.svg";
import placeholder from "../assets/placeholder.png";
import addPhoto from "../assets/add_photo.svg";
import { useAuth } from "../providers/AuthProvider";

export default function OnboardingFlow() {
  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState("");
  const [selectedUseCase, setSelectedUseCase] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [password, setPassword] = useState(null);
  const [pError, setPError] = useState("");
  const [nError, setNError] = useState("");
  const {setUser} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
  if(fullName)
    setNError("")
  if(password)
    setPError("")

},[password,fullName])

  const useCases = [
    {
      title: "For my team",
      description:
        "Used by teams managing legal, HR, or operational documents collaboratively.",
      value: "team",
      icon: team,
    },
    {
      title: "For personal use",
      description:
        "Used by individuals handling personal, freelance, or one-off legal documents.",
      value: "personal",
      icon: personal,
    },
    {
      title: "For school",
      description:
        "For students or educators managing research, assignments, and documents.",
      value: "school",
      icon: school,
    },
  ];

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result;

      setProfilePic(base64); // optional for preview

      try {
        await uploadProfilePic({ profilePic: base64 });
        toast.success("Picture Uploaded Successfully");
      } catch (error) {
        toast.error("Image Upload Error:", error.message);
        console.error("Upload error:", error);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (!fullName && !password) {
      setNError("This field is required");
      setPError("This field is required");
      return;
    }

    if (!password) {
      setPError("This field is required");
      return;
    }
    if (password.length < 8) {
      setPError("p");
      return;
    }
    if (!fullName) {
      setNError("This field is required");
      return;
    }
    try {
      await updateUserProfile({
        name: fullName,
        password,
      });
      setUser(null)
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message || "Could not enter data");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAF9] font-inter px-4">
      <Header />

      {step === 1 && (
        <div className="w-[370px] h-[378px] flex flex-col items-center">
          <div className="text-center  font-semibold mb-5">
            <h1 className="text-[23px]" mb-5>
              Create a profile
            </h1>
            <h1 className="text-[23px] text-[#ACAAA7]   ">
              This is how you’ll appear in Nanis
            </h1>
          </div>

          <div className="flex flex-col items-center gap-2 mb-6 font-semibold">
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
            <span className="text-xs text-[#91918E] flex gap-1 font-semibold items-center">
              <span>
                <img src={addPhoto} className="w-[12px] h-[12px]" alt="" />
              </span>
              Add a profile
            </span>
          </div>

          <div className="w-full mb-2">
            <label className="block text-sm font-medium text-left text-[#91918E] mb-1">
              What should we call you?
            </label>
            <input
              type="text"
              placeholder="e.g. Daniel, Thomas"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={`w-full h-[36px] border  rounded-md px-[8px] py-[6px] text-sm pr-10 focus:outline-none
  ${nError
                  ? "border-[1.5px] border-[#F1511B] shadow-[0_0_0_4px_rgba(241,81,27,0.2)] text-[#F1511B]"
                  : " border-[#D9D9D6] "
                }
`}
            />
            {nError && (
              <p className="text-[#F1511B] text-xs mt-1">
                This field is required
              </p>
            )}
          </div>

          <div className="w-full relative">
            <label className="block text-sm text-left font-medium text-[#91918E] mb-1">
              Set a secure password
            </label>

            <input
              type={showPassword ? "text" : "password"}
              placeholder="New password"
              className={`w-full h-[36px] border  rounded-md px-[8px] py-[6px] text-sm pr-10 focus:outline-none
  ${pError
                  ? "border-[1.5px] border-[#F1511B] shadow-[0_0_0_4px_rgba(241,81,27,0.2)] text-[#F1511B]"
                  : " border-[#D9D9D6] "
                }
`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-[43px] transform -translate-y-1/2 text-[#91918E]"
            >
              {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
            </button>
            {pError && pError !== "p" && (
              <p className="text-[#F1511B] text-xs mt-1">
                This field is required
              </p>
            )}

            {pError === "p" && (
              <p className="text-[12px] font-medium text-left text-[#91918E] mt-1">
                Enter at least 8 characters for security
              </p>
            )}
          </div>

          <button
            onClick={handleSubmit}
            className="w-full h-[36px] mt-3 bg-[#888870] text-white rounded-md py-2 text-sm font-medium"
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
                    ? "border-[#888870] shadow-sm"
                    : "border-[#E4E4E4]"
                  }`}
              >
                <div className="w-[271.67px] h-[98px] bg-[#f5f5f4] rounded-[10px] flex items-center justify-center mb-[10px] p-[10px]">
                  <img
                    src={useCase.icon}
                    alt={useCase.title}
                    className="h-10"
                  />
                </div>

                <div className="flex flex-col gap-[10px]">
                  <div className="font-semibold text-[18px] leading-[16px] text-[#37352F]">
                    {useCase.title}
                  </div>
                  <div>
                    <p className="text-[14px] leading-[20px] text-[#636361]">
                      {useCase.description}
                    </p>
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
