import { useState, useRef, useEffect } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

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
    setSelectedValue(optionValue);
    onChange?.(optionValue);
    setIsOpen(false);
  };

  const selectedLabel = options.find((opt) => opt.value === selectedValue)?.label || placeholder;

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        className={`flex items-center justify-between w-full p-1 text-left bg-transparent border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${buttonClassName}`}
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
          className={`absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg ${menuClassName}`}
        >
          <ul className="py-1 overflow-auto text-base max-h-60 focus:outline-none">
            {options.map((option) => (
              <li
                key={option.value}
                className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                  selectedValue === option.value ? "bg-gray-100 font-medium" : ""
                } ${optionClassName}`}
                onClick={() => handleOptionClick(option.value)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
