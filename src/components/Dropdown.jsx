import { useState, useRef, useEffect } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import searchGlass from "../assets/search-glass.svg";
import arrow3 from "../assets/arrow-3.svg";
import star from "../assets/star.svg";
import settings from "../assets/settings.svg"

// type DropdownOption = {
//   value: string;
//   label: string;
// };
//
// type DropdownProps = {
//   options: DropdownOption[];
//   value?: string;
//   onChange?: (value: string) => void;
//   placeholder?: string;
//   className?: string;
//   buttonClassName?: string;
//   optionClassName?: string;
//   menuClassName?: string;
//   iconClassName?: string;
//   disabled?: boolean;
// };

export const Dropdown = ({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  className = "",
  buttonClassName = "",
  optionClassName = "",
  menuClassName = "",
  iconClassName = "",
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);
  const dropdownRef = useRef(null); // Removed the HTMLDivElement type annotation

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionClick = (optionValue) => {
  onChange(optionValue)
   setIsOpen(false);
  };

  const selectedLabel =
    options.find((opt) => opt.value === selectedValue)?.label || placeholder;

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        className={`flex items-center justify-between w-full p-1 text-left bg-transparent border-none rounded-md  ${buttonClassName}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
      >
        <span className="truncate">{selectedLabel}</span>
        {isOpen ? (
          <FiChevronUp className={`ml-1 text-[#51493C52] ${iconClassName}`} />
        ) : (
          <FiChevronDown className={`ml-1 text-[#51493C52] ${iconClassName}`} />
        )}
      </button>

      {isOpen && (
        <div
          className={`absolute z-40 mt-1 w-[470px] bg-white p-[6px] border-[1px] border-[#E7E6E4] rounded-md shadow-lg ${menuClassName}`}
        >
          {/* Search + Tabs + Sorting */}
          <div className="border-b border-[#F3F3F3]">
            <div className="w-full py-[4px]  flex items-center border-[1px] border-[#EDEDED] rounded-[6px] px-2  gap-2 bg-white">
              <img
                src={searchGlass}
                alt="search-history"
                className="w-[17px]"
              />
              <input
                type="text"
                placeholder="Search for a prompt"
                className="flex-1 text-sm mb-[1.5px] text-gray-600 outline-none  bg-transparent font-medium placeholder:text-[#ACABA9]"
              />
            </div>
            <div className="flex items-center justify-between my-[10px]">
              <div className="flex text-[14px] text-[#32302C] gap-[2px] p-[2px] bg-[#0000000A] font-medium leading-[120%]  rounded-md ">
                <button className="px-[9px] py-[3.5px] bg-white rounded-md">
                  Private
                </button>
                <button className="px-[9px] py-[3.5px] opacity-50 rounded-md">
                  Team
                </button>
                <button className="px-[9px] py-[3.5px] opacity-50 rounded-md">
                  Nanis
                </button>
              </div>
              <button className="flex py-[4px] text-[#73726E] pl-2 pr-[6px] border-[1px] border-[#37352F29] rounded-md gap-[6px] items-center text-xs font-medium leading-[14.4px] hover:text-black">
                <img src={arrow3} className="w-[16px]" alt="" />
                Sort <FiChevronDown size={15} className="text-[#C7C4C0] " />
              </button>
            </div>
          </div>

          {/* Options */}

          <ul className="overflow-auto text-base max-h-60 focus:outline-none">
            {options.map((option) => (
              <li
                key={option.value}
                className={`group px-[10px] py-[5.5px] flex justify-between items-center text-[14px] font-medium text-[#5F5E5B] rounded-md cursor-pointer hover:bg-gray-100 ${selectedValue === option.value
                    ? "bg-gray-100 font-medium"
                    : ""
                  } ${optionClassName}`}
                onClick={() => handleOptionClick(option.value)}
              >
                {option.label}
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                  <img src={star} className="w-[13.33px]" alt="" />
                </span>
              </li>
            ))}
          </ul>
          {/* Manage Button */}
          <div className="flex gap-[8px] justify-start pt-[12.9px] pb-[5.5px] px-[10.63px] border-t border-[#F3F3F3]">
            <img src={settings} className="" alt=""/>  
            <button className="text-sm text-[#5F5E5B] font-medium hover:text-black">
              Manage
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
