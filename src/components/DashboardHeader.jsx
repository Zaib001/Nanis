import { useState, useEffect, useRef } from "react";
import { FiClock, FiMoreHorizontal, FiFileText, FiChevronRight } from "react-icons/fi";

export default function DashboardHeader() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isInnerDropdownOpen, setIsInnerDropdownOpen] = useState(false); // Added for inner dropdown
  const [isWidgetsDropdownOpen, setIsWidgetsDropdownOpen] = useState(false); // Added for widgets dropdown

  const dropdownRef = useRef(null); // Ref to track the dropdown

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
        setIsInnerDropdownOpen(false);
        setIsWidgetsDropdownOpen(false);
      }
    };

    // Add event listener to close dropdown on outside click
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle toggling the outer dropdown
  const handleDropdownToggle = () => {
    // If outer dropdown is closed, open it
    if (!isDropdownOpen) {
      setIsDropdownOpen(true);
    } else {
      // If outer dropdown is open, close it
      setIsDropdownOpen(false);
      setIsInnerDropdownOpen(false); // Close inner dropdown as well
      setIsWidgetsDropdownOpen(false); // Close widgets dropdown as well
    }
  };

  // Handle toggling the inner dropdown for "Change default start page"
  const handleInnerDropdownToggle = () => {
    // Close the outer dropdown and open the inner dropdown
    setIsDropdownOpen(true);
    setIsInnerDropdownOpen(!isInnerDropdownOpen);
    setIsWidgetsDropdownOpen(false); // Close widgets dropdown when inner is clicked
  };

  // Handle toggling the dropdown for "Show/hide widgets"
  const handleWidgetsDropdownToggle = () => {
    setIsWidgetsDropdownOpen(!isWidgetsDropdownOpen);
    setIsInnerDropdownOpen(false); // Close inner dropdown when widgets dropdown is clicked
    setIsDropdownOpen(true); // Ensure outer dropdown is open when widgets dropdown is triggered
  };

  return (
    <div className="w-full flex items-center justify-between font-inter">
      {/* Left Dropdown */}
      <div>
        <select className="text-sm border border-[#E0E0E0] rounded-full px-3 py-1 text-[#464440] bg-white shadow-sm">
          <option>United Arab Emirates Law</option>
          {/* Add more options if needed */}
        </select>
      </div>

      {/* Right Icons */}
      <div className="flex items-center gap-3 text-[#888870]">
        <FiClock className="w-5 h-5" />

        {/* 3 Dots Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <FiMoreHorizontal
            onClick={handleDropdownToggle}
            className="w-5 h-5 cursor-pointer"
          />

          {/* Outer Dropdown */}
          {isDropdownOpen && (
            <div
              className="absolute top-[28px] -left-[244px] w-[264px] h-[82px] rounded-[6px] border border-[#E7E6E4] 
              shadow-[0px_12px_32px_0px_#00000008,0px_0px_0px_1px_#0000000D] p-[6px] gap-[6px] bg-white"
            >
              <div className="flex flex-col gap-[8px]">
                {/* Change default start page dropdown item */}
                <div
                  onClick={handleInnerDropdownToggle} // Trigger inner dropdown toggle on click
                  className="flex items-center gap-2 text-sm text-[#464440] font-medium hover:bg-[#F8F8F7] p-[5px_10px] rounded-[6px] cursor-pointer"
                >
                  <FiFileText className="w-4 h-4 text-[#464440]" />
                  <span>Change default start page</span>
                  <FiChevronRight className="ml-auto w-4 h-4 text-[#464440]" />
                </div>

                {/* Inner Dropdown (appears when hovering over or clicking Change default start page) */}
                {isInnerDropdownOpen && (
                  <div className="absolute top-[4px] -left-[230px] w-[224px] h-[120px] rounded-[8px] border border-[#E7E6E4] shadow-[0px_12px_32px_0px_#00000008] p-[6px] gap-[6px] bg-white">
                    <div className="flex flex-col gap-[8px]">
                      <div className="flex items-center gap-[8px] text-sm text-[#464440] font-medium hover:bg-[#F8F8F7] p-[5px_10px] rounded-[6px]">
                        <FiFileText className="w-4 h-4 text-[#464440]" />
                        <span>Home</span>
                      </div>
                      <div className="flex items-center gap-[8px] text-sm text-[#464440] font-medium hover:bg-[#F8F8F7] p-[5px_10px] rounded-[6px]">
                        <FiFileText className="w-4 h-4 text-[#464440]" />
                        <span>Last visited page</span>
                      </div>
                      <div className="flex items-center gap-[8px] text-sm text-[#464440] font-medium hover:bg-[#F8F8F7] p-[5px_10px] rounded-[6px]">
                        <FiFileText className="w-4 h-4 text-[#464440]" />
                        <span>Top page in sidebar</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Show/hide widgets dropdown item */}
                <div
                  onClick={handleWidgetsDropdownToggle}
                  className="flex items-center gap-2 text-sm text-[#464440] font-medium hover:bg-[#F8F8F7] p-[5px_10px] rounded-[6px] cursor-pointer"
                >
                  <FiFileText className="w-4 h-4 text-[#464440]" />
                  <span>Show/hide widgets</span>
                  <FiChevronRight className="ml-auto w-4 h-4 text-[#464440]" />
                </div>

                {/* Widgets Dropdown (appears when hovering over or clicking Show/hide widgets) */}
                {isWidgetsDropdownOpen && (
                  <div className="absolute top-[40px] -left-[230px] w-[224px] h-[160px] rounded-[8px] border border-[#E7E6E4] shadow-[0px_12px_32px_0px_#00000008] p-[6px] gap-[6px] bg-white">
                    <div className="flex flex-col gap-[8px]">
                      <div className="flex items-center gap-[8px] text-sm text-[#464440] font-medium hover:bg-[#F8F8F7] p-[5px_10px] rounded-[6px]">
                        <FiFileText className="w-4 h-4 text-[#464440]" />
                        <span>Greeting</span>
                      </div>
                      <div className="flex items-center gap-[8px] text-sm text-[#464440] font-medium hover:bg-[#F8F8F7] p-[5px_10px] rounded-[6px]">
                        <FiFileText className="w-4 h-4 text-[#464440]" />
                        <span>Upcoming events</span>
                      </div>
                      <div className="flex items-center gap-[8px] text-sm text-[#464440] font-medium hover:bg-[#F8F8F7] p-[5px_10px] rounded-[6px]">
                        <FiFileText className="w-4 h-4 text-[#464440]" />
                        <span>My tasks</span>
                      </div>
                      <div className="flex items-center gap-[8px] text-sm text-[#464440] font-medium hover:bg-[#F8F8F7] p-[5px_10px] rounded-[6px]">
                        <FiFileText className="w-4 h-4 text-[#464440]" />
                        <span>Database views</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
