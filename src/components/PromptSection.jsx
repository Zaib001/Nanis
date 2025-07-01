import promptIcon from "../assets/Group 10 (1).svg";
import globe from "../assets/Icon Button.svg";
import agent from "../assets/material-symbols-light_theater-comedy-outline-rounded.svg";
import source from "../assets/Frame.svg";
import attach from "../assets/Vector (1).svg";
import mention from "../assets/At.svg";
import send from "../assets/Submit AI.svg";
import { FiChevronDown } from "react-icons/fi";

export function PromptSection() {
  return (
    <div className="w-[756px] font-inter">
      {/* Greeting */}
      <div className="flex justify-center items-center mb-4 gap-2">
        <img src={promptIcon} alt="Prompt Icon" className="w-7 h-7" />
        <h1 className="text-[24px] leading-[70px] font-semibold text-[#1C1C1C] -tracking-normal">
          Good evening, Sinan Ouriach
        </h1>
      </div>


      {/* Prompt Box */}
      <div
        className="w-full h-[132px] bg-white rounded-[12px] px-4 py-3 flex flex-col justify-between"
        style={{
          boxShadow:
            "0px 12px 32px rgba(0, 0, 0, 0.08), 0px 0px 0px 1px rgba(0, 0, 0, 0.05)",
        }}
      >
        {/* Top Row - Input Prompt */}
        <div className="flex items-center gap-2 text-[13px] text-[#888870] font-medium">
          <div className="flex items-center gap-1 text-[14px] font-semibold text-[#73726E]">
            <span>Load prompt</span>
            <FiChevronDown className="w-4 h-4 text-[#73726E]" />
          </div>

          <span className="flex-1 text-[#46444073] truncate text-sm font-medium">
            Or, Ask, find anything from your workspace or any legal information...
          </span>
        </div>

        {/* Bottom Row - Controls */}
        <div className="flex justify-between items-center text-sm text-[#6C6C6C]">
          <div className="flex gap-5 items-center">
            <div className="flex items-center bg-[#0000000A] rounded-lg overflow-hidden text-sm font-medium">
              {/* Active Tab - Ask */}
              <div className="inline-flex items-center bg-[#0000000A] rounded-lg p-[2px] text-sm font-medium">
                {/* Left: Ask */}
                <div className="px-4 py-1 bg-white text-[#232323] rounded-l-lg">
                  ASK
                </div>

                {/* Divider */}
                <div className="w-px h-[24px] bg-[#E0E0E0]" />

                {/* Right: Icon */}
                <div className="px-2 py-[6px] bg-white text-[#C0C0C0] rounded-r-lg flex items-center justify-center">
                  <FiChevronDown className="w-4 h-4" />
                </div>
              </div>

              {/* Inactive Tab - Research */}
              <div className="px-3 py-1 text-[#A0A0A0]">
                Research
              </div>
            </div>
            <div className="flex items-center gap-1 text-[14px] font-semibold text-[#73726E]">
              <img src={agent} className="w-5 h-5" />

              <span className="font-medium text-[14px] leading-[120%] text-[#73726E]">Agents</span>
              <FiChevronDown className="w-4 h-4 text-[#73726E]" />
            </div>
          </div>

          <div className="flex gap-3 items-center">
            <img src={globe} className="w-7 h-7" />
            <div className="flex items-center gap-1">
              <img src={source} className="w-[18px] h-[18px]" />
              <span>All sources</span>
              <FiChevronDown className="w-4 h-4 text-[#73726E]" />

            </div>
            <img src={attach} className="w-5 h-5" />
            <img src={mention} className="w-5 h-5" />
            <img src={send} className="w-6 h-6" />
          </div>
        </div>
      </div>
    </div>
  );
}
