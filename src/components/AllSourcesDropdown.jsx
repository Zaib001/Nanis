import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import sourceIcon from "../assets/Frame.svg"; // your main icon
import googleIcon from "../assets/google.svg"; // replace with actual image
import notionIcon from "../assets/notion.svg";
import slackIcon from "../assets/slack.svg";
import { FiSearch, FiCheck, FiPlus } from "react-icons/fi";

const sources = [
    {
        id: "all",
        label: "All source I can access",
        sublabel: "",
        selected: true,
    },
    {
        id: "workspace",
        label: "Sinan CP’s Nanis",
        sublabel: "Workspace",
    },
    {
        id: "local",
        label: "Sinan CP’s Nanis",
        sublabel: "Local Team",
    },
];

export default function AllSourcesDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(null);

    const toggleDropdown = () => setIsOpen((prev) => !prev);
    const handleSelect = (id) => {
        setSelected(id);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            {/* Trigger */}
            <div
                onClick={toggleDropdown}
                className="flex items-center gap-1 cursor-pointer"
            >
                <img src={sourceIcon} className="w-[18px] h-[18px]" />
                <span>All sources</span>
                <FiChevronDown className="w-4 h-4 text-[#73726E]" />
            </div>

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute -left-[183px] z-50 bg-white shadow-[0px_12px_32px_rgba(0,0,0,0.05),_0px_0px_0px_1px_rgba(0,0,0,0.08)] 
              rounded-[8px] border border-[#E7E6E4] w-[294px] p-[6px] mt-2">

                    {/* Search bar */}
                    <div
                        className="flex items-center gap-2 w-[282px] h-[30px] px-[8px] py-[14px] 
             rounded-[6px] border border-[#E7E6E4] bg-[#F8F8F7]"
                    >
                        <FiSearch className="text-[#A0A0A0] w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search documents"
                            className="text-sm text-[#464440] bg-transparent outline-none w-full"
                        />
                    </div>


                    {/* Options */}
                    <div className="flex flex-col gap-[10px] max-h-[180px] overflow-y-auto">
                        {sources.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => handleSelect(item.id)}
                                className={`flex items-center gap-[8px] text-sm text-[#464440] font-medium 
            px-[10px] py-[5px] rounded-[6px] cursor-pointer relative
            ${selected === item.id ? "bg-[#F4F4F4]" : "hover:bg-[#F8F8F7]"}`}
                            >
                                <img src={sourceIcon} className="w-4 h-4" />
                                <div className="text-sm flex items-center gap-1">
                                    <span
                                        className="font-medium text-[14px] leading-[100%] text-[#5F5E5B]"
                                        style={{ fontFamily: "Inter" }}
                                    >
                                        {item.label}
                                    </span>
                                    {item.sublabel && (
                                        <>
                                            <span className="text-[#5F5E5B]">-</span>
                                            <span
                                                className="text-[14px] leading-[100%] text-[#ACABA9]"
                                                style={{ fontFamily: "Inter" }}
                                            >
                                                {item.sublabel}
                                            </span>
                                        </>
                                    )}
                                </div>

                                {/* Checkmark if selected */}
                                {selected === item.id && (
                                    <FiCheck className="absolute right-[10px] text-[#5F5E5B] w-4 h-4" />
                                )}
                            </div>
                        ))}
                        <div className="h-px bg-[#E7E6E4] my-[1px]" />
                        {/* Connect Apps Row */}
                        <div className="flex items-center justify-between px-[10px] py-[5px] text-sm text-[#464440] rounded-[6px] hover:bg-[#F8F8F7]">
                            <span className="flex items-center gap-2">
                                <FiPlus className="text-[#A0A0A0] w-4 h-4" />
                                Connect apps
                            </span>
                            <div className="flex gap-2">
                                <img src={notionIcon} className="w-4 h-4" />
                                <img src={slackIcon} className="w-4 h-4" />
                                <img src={googleIcon} className="w-4 h-4" />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
