import promptIcon from "../assets/Group 10 (1).svg";
import globe from "../assets/Icon Button.svg";
import agent from "../assets/material-symbols-light_theater-comedy-outline-rounded.svg";
import source from "../assets/Frame.svg";
import attach from "../assets/Vector (1).svg";
import mention from "../assets/At.svg";
import send from "../assets/Submit AI.svg";
import { FiChevronDown } from "react-icons/fi";
import AllSourcesDropdown from "./AllSourcesDropdown";
import AskDropdown from "./AskDropdown";
import { useAuth } from "../providers/AuthProvider";
import { Dropdown } from "./Dropdown";
import { useEffect, useState } from "react";

export function PromptSection({
  prompt,
  setPrompt,
  onSend,
  showHeading = true,
}) {
  const { user } = useAuth();
  const [showLoadPrompt, setShowLoadPrompt] = useState(true);
  const [isResearchMode, setIsResearchMode] = useState(false);

  useEffect(() => {
    if (prompt === "") setShowLoadPrompt(true);
    else setShowLoadPrompt(false);
  }, [prompt]);

  const toggleMode = () => {
    setIsResearchMode(!isResearchMode);
  };

  return (
    <div className="w-full px-4 sm:px-[50px] flex justify-center items-center">
      <div className="w-full max-w-[756px] font-inter">
        {/* Greeting */}
        {showHeading && (
          <div className="flex justify-center items-center mb-4 gap-2">
            <img src={promptIcon} alt="Prompt Icon" className="w-7 h-7" />
            <h1 className="text-[24px] leading-[70px] font-semibold text-[#1C1C1C] -tracking-normal">
              Good evening, {user?.name}
            </h1>
          </div>
        )}
        {/* Prompt Box */}
        <div
          className="w-full h-[132px] bg-white rounded-[12px] px-4 py-3 flex flex-col justify-between"
          style={{
            boxShadow:
              "0px 0px 0px 1px rgba(0, 0, 0, 0.05)",
          }}
        >
          {/* Top Row - Input Prompt */}
          <div className="flex items-center gap-2 text-[13px] text-[#888870] font-medium">
            {showLoadPrompt && (
              <Dropdown
                options={[
                  { value: "prompt1", label: "Prompt 1" },
                  { value: "prompt2", label: "Prompt 2" },
                  { value: "prompt3", label: "Prompt 3" },
                  // Add more prompt options as needed
                ]}
                placeholder="Load prompt"
                className="whitespace-nowrap"
                buttonClassName=" text-[14px] font-medium text-[#73726E] bg-transparent border-none shadow-none p-0 hover:bg-transparent focus:ring-0"
                optionClassName="text-[14px] text-[#73726E] hover:bg-gray-100"
                menuClassName="border border-gray-200 mt-1"
                iconClassName="w-4 h-4 "
                onChange={(value) => setPrompt(value)}
              />
            )}{" "}
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  onSend();
                }
              }}
              placeholder="Or, Ask, find anything from your workspace or legal info..."
              className="text-sm placeholder:text-[#46444073] text-[#32302C] font-medium w-full outline-none bg-transparent"
            />
          </div>

          {/* Bottom Row - Controls */}
          <div className="flex justify-between items-center text-sm text-[#6C6C6C]">
            <div className="flex items-center gap-[6px]">
              {/* Toggle between Ask and Research */}
              <div className="flex items-center pr-[2px] bg-[#0000000A] rounded-lg text-sm font-medium relative overflow-hidden">
                <div
                  className={`absolute inset-0  bg-white transition-all duration-300 ${isResearchMode ? 'translate-x-full' : 'translate-x-full'}`}
                  style={{ zIndex: 0 }}
                />
                {isResearchMode ? <div
                  onClick={toggleMode}
                  className={`relative z-10 px-[9px] font-normal text-[14px] py-1 cursor-pointer transition-colors duration-300 ${isResearchMode ? 'text-[#32302C]' : 'text-[#32302C] bg-white border-r border-[#0000000A] rounded-l-lg'}`}
                >
                  Ask
                </div> : <div className="relative z-10 flex items-center">
                  <AskDropdown />
                </div>
                }
                <div
                  onClick={toggleMode}
                  className={`relative z-10 px-[9px] pt-[2px] pb-[2px] cursor-pointer transition-colors duration-300 ${isResearchMode ? 'text-[#32302C] bg-white rounded-r-lg' : 'text-[#32302C8A] bg-transparent'}`}
                >
                  Research
                </div>
              </div>

              <div className="flex items-center px-[8px] py-[4px] gap-1 text-[14px] font-semibold text-[#73726E]">
                <img src={agent} className="w-5" />

                <span className="font-medium text-[14px] tracking-[-4%] leading-[120%] text-[#73726E]">
                  Agents
                </span>
                <FiChevronDown className="w-4 h-4 text-[#51493C52]" />
              </div>
            </div>

            <div className="flex gap-3 items-center">
              <img src={globe} className="w-7 h-7" />
              <div className="flex items-center gap-1">
                <AllSourcesDropdown />
              </div>
              <img src={attach} className="w-4" />
              <img src={mention} className="w-5 h-5" />
              <img
                src={send}
                className="w-6 h-6 cursor-pointer"
                onClick={onSend}
                alt="Send"
              />{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
