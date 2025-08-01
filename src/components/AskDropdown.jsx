import { useState, useRef, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";
import { AiOutlineCheck } from "react-icons/ai";
import openaiIcon from "../assets/anthropic.svg";
import nanisIcon from "../assets/openai.svg";
import anthroIcon from "../assets/nanis.svg";

const options = {
  include: [
    {
      id: "nanis",
      label: "Nanis AI",
      icon: nanisIcon,
    },
  ],
  exclude: [
    {
      id: "openai",
      label: "OpenAi GPT-4.1",
      icon: openaiIcon,
    },
    {
      id: "sonnet",
      label: "Anthropic Claude Sonnet 4",
      icon: anthroIcon,
    },
    {
      id: "opus",
      label: "Anthropic Claude Opus 4",
      icon: anthroIcon,
    },
  ],
};

export default function AskDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("nanis");
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    console.log("Ask button clicked");
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (id) => {
    setSelected(id);
    setIsOpen(false);
  };
  useEffect(() => {
    console.log("Dropdown open:", isOpen);
  }, [isOpen]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
<>
    <div className="relative z-10" ref={dropdownRef}>
      {/* Trigger */}
      <div
        onClick={toggleDropdown}
        className="inline-flex items-center rounded-md p-[2px] text-sm leading-[120%] tracking-[-4%] font-medium cursor-pointer"
      >
        <div className="px-[9px] text-[14px]  py-[3.5px] bg-white text-[#32302C] border-r border-r-[#0000000A] rounded-l-lg">
          Ask
        </div>
        <div className="px-[3px] pb-[4px] pt-[5.5px] bg-white text-[#C0C0C0] rounded-r-md flex items-center justify-center">
          <FiChevronDown className="w-[12px] " />
        </div>
      </div>

   </div>
      {/* Dropdown */}
      {isOpen && (
        <div
          className="absolute top-full left-0 z-50 w-[294px] bg-white rounded-[8px] border border-[#E7E6E4] 
shadow-lg p-[6px] mt-2"
        >
          <div
            className="text-[12px] font-semibold text-[#464440] px-[10px] py-[4px]"
            style={{ fontFamily: "Inter" }}
          >
            Includes workspace context
          </div>
          {options.include.map((item) => (
            <div
              key={item.id}
              onClick={() => handleSelect(item.id)}
              className={`flex items-center justify-between px-[10px] py-[5px] w-[282px] h-[32px] gap-[8px] rounded-[6px] cursor-pointer
                ${selected === item.id ? "bg-[#F4F4F4]" : "hover:bg-[#F8F8F7]"}`}
            >
              <div className="flex items-center gap-2 text-sm text-[#5F5E5B] font-medium">
                <img src={item.icon} alt={item.label} className="w-4 h-4" />
                <span style={{ fontFamily: "Inter" }}>{item.label}</span>
              </div>
              {selected === item.id && (
                <AiOutlineCheck className="text-[#464440] w-4 h-4" />
              )}
            </div>
          ))}

          <div
            className="text-[12px] font-semibold text-[#464440] mt-[8px] px-[10px] py-[4px]"
            style={{ fontFamily: "Inter" }}
          >
            Exclude workspace context
          </div>
          {options.exclude.map((item) => (
            <div
              key={item.id}
              onClick={() => handleSelect(item.id)}
              className={`flex items-center justify-between px-[10px] py-[5px] w-[282px] h-[32px] gap-[8px] rounded-[6px] cursor-pointer
                ${selected === item.id ? "bg-[#F4F4F4]" : "hover:bg-[#F8F8F7]"}`}
            >
              <div className="flex items-center gap-2 text-sm text-[#464440] font-medium">
                <img src={item.icon} alt={item.label} className="w-4 h-4" />
                <span style={{ fontFamily: "Inter" }}>{item.label}</span>
              </div>
              {selected === item.id && (
                <AiOutlineCheck className="text-[#464440] w-4 h-4" />
              )}
            </div>
          ))}
        </div>
      )}
 </>
  );
}
