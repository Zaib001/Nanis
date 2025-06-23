import { useState } from 'react';
import {
    FaSearch, FaHome, FaRegBell, FaUserCircle, FaFolder,
    FaPlus, FaStar, FaFileAlt, FaRegFileAlt, FaEdit,
    FaCommentDots, FaCalendarAlt, FaBook, FaCog, FaChartBar, FaRegCalendarAlt, FaUserPlus, FaEllipsisH, FaChevronDown, FaUndo, FaPen
} from 'react-icons/fa';
import { TbFlower } from 'react-icons/tb';

const SectionHeader = ({ title }) => (
    <div className="font-inter text-[12px] px-2 pt-6 pb-4 w-[36px] h-[12px] leading-[12px] font-medium text-[#91918E] uppercase">
        {title}
    </div>
);

const SidebarItem = ({ icon: Icon, imgSrc, label, muted = false, onClick }) => (
    <div
        onClick={onClick}
        className={`
    flex items-center
    w-[211px] h-[40px]
    px-[8px] py-[8px]
    rounded-[6px]
    cursor-pointer
    text-[#5F5E5B]
    hover:bg-[rgba(0,0,0,0.03)]
    hover:w-[195px]
    hover:pt-[4px] hover:pr-[8px] hover:pb-[4px] hover:pl-[8px]
  `}
    >

        {imgSrc ? (
            <img src={imgSrc} alt="avatar" className="w-5 h-5 rounded-full mr-3 flex-shrink-0" />
        ) : (
            <Icon className="w-[18px] h-[18px] mr-3 text-[#5F5E5B] flex-shrink-0" />
        )}

        <span className="truncate font-inter font-medium text-[14px] leading-[20px] tracking-[-0.04em]">
            {label}
        </span>
    </div>
);








export default function Sidebar() {
    const [showServicesMore, setShowServicesMore] = useState(false);
    const [showProductivityMore, setShowProductivityMore] = useState(false);
    const [showAddNewInput, setShowAddNewInput] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    return (
        <aside
            className={`fixed md:relative z-40 overflow-hidden bg-[#54483114] w-[211px] h-[1501.13px] border-r px-2 pb-2 text-[14px] transition-transform duration-300
    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 flex flex-col`}
        >
            <div>
                {/* Top Section: Workspace Name */}
                <div className="flex items-center justify-between h-[32px] px-[6px] py-[8px] w-full">
                    {/* Left: Logo + Title */}
                    <div className="flex items-center gap-[5px]">
                        <TbFlower className="text-[#5F5E5B] w-[20px] h-[20px]" />
                        <span className="text-[14px] font-medium text-[#32302C] leading-5 tracking-[-4%]">Sinan’s Nanis</span>
                        <FaChevronDown className="text-gray-400 text-xs ml-1" />
                    </div>

                    {/* Right: Undo & Pen */}
                    <div className="flex gap-2 text-[#5F5E5B] text-sm">
                        <FaUndo className="cursor-pointer w-[14px] h-[14px]" />
                        <FaPen className="cursor-pointer w-[14px] h-[14px]" />
                    </div>
                </div>

                <button
                    className="md:hidden p-2 absolute top-2 left-2 bg-gray-200 rounded z-50"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                    {isSidebarOpen ? "Close" : "Menu"}
                </button>
                {/* Navigation */}
                <div className="space-y-[1px]">
                    <SidebarItem icon={FaSearch} label="Search" />
                    <SidebarItem icon={FaHome} label="Home" />
                    <SidebarItem icon={FaRegBell} label="Updates" />
                </div>

                {/* Space */}
                <SectionHeader title="Space" />
                <div className="px-1 space-y-[1px]">
                    <SidebarItem imgSrc="https://i.pravatar.cc/40?img=12" label="Sinan’s HQ" />
                    <div className="mt-[6px] ml-[15px] space-y-[1px]">
                        <SidebarItem icon={FaFolder} label="Teamspace" muted />
                        {showAddNewInput ? (
                            <div className="px-2">
                                <input
                                    type="text"
                                    placeholder="New space..."
                                    className="text-sm px-2 py-1 border rounded w-full outline-none"
                                    onBlur={() => setShowAddNewInput(false)}
                                />
                            </div>
                        ) : (
                            <SidebarItem icon={FaPlus} label="Add new" muted onClick={() => setShowAddNewInput(true)} />
                        )}
                    </div>
                </div>

                {/* Services */}
                <SectionHeader title="Services" />
                <div className="space-y-[1px]">
                    <SidebarItem icon={FaStar} label="Legal research" />
                    <SidebarItem icon={FaFileAlt} label="Create document" />
                    <SidebarItem icon={FaRegFileAlt} label="Review document" />
                    {showServicesMore && (
                        <>
                            <SidebarItem icon={FaEdit} label="Contract Builder" muted />
                            <SidebarItem icon={FaEdit} label="Clause Manager" muted />
                        </>
                    )}
                    <SidebarItem icon={FaEllipsisH} label="More" muted onClick={() => setShowServicesMore(!showServicesMore)} />
                </div>

                {/* Productivity */}
                <SectionHeader title="Productivity" />
                <div className="space-y-[1px]">
                    <SidebarItem icon={FaEdit} label="eSignature" />
                    <SidebarItem icon={FaCommentDots} label="Chats" />
                    <SidebarItem icon={FaCalendarAlt} label="Calendar" />
                    {showProductivityMore && (
                        <>
                            <SidebarItem icon={FaEdit} label="Tasks" muted />
                            <SidebarItem icon={FaEdit} label="Reminders" muted />
                        </>
                    )}
                    <SidebarItem icon={FaEllipsisH} label="More" muted onClick={() => setShowProductivityMore(!showProductivityMore)} />
                </div>

                {/* LLM */}
                <SectionHeader title="LLM" />
                <div className="space-y-[1px]">
                    <SidebarItem icon={FaBook} label="Knowledge base" />
                    <SidebarItem icon={FaRegFileAlt} label="Templates" />
                </div>

                {/* Settings */}
                <SectionHeader title="Settings" />
                <div className="space-y-[1px]">
                    <SidebarItem icon={FaCog} label="Settings" />
                    <SidebarItem icon={FaChartBar} label="Usage Insights" />
                    <SidebarItem icon={FaUserPlus} label="Invite members" />
                </div>

            </div>


        </aside>
    );
}
