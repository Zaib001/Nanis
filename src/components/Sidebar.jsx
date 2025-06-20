import { useState } from 'react';
import {
    FaSearch, FaHome, FaRegBell, FaUserCircle, FaFolder,
    FaPlus, FaStar, FaFileAlt, FaRegFileAlt, FaEdit,
    FaCommentDots, FaCalendarAlt, FaBook, FaCog, FaChartBar, FaRegCalendarAlt, FaUserPlus, FaEllipsisH, FaChevronDown, FaUndo, FaPen
} from 'react-icons/fa';
import { TbFlower } from 'react-icons/tb';

const SectionHeader = ({ title }) => (
    <div className="text-[10px] uppercase font-medium text-gray-400 px-5 pt-4 pb-1">
        {title}
    </div>
);

const SidebarItem = ({ icon: Icon, imgSrc, label, muted = false, onClick }) => (
    <div
        onClick={onClick}
        className={`flex items-center text-sm ${muted ? "text-gray-400" : "text-gray-400"} hover:bg-gray-100 px-5 py-[6px] rounded-md cursor-pointer`}
    >
        {imgSrc ? (
            <img src={imgSrc} alt="avatar" className="w-5 h-5 rounded-full mr-3" />
        ) : (
            <Icon className={`mr-3 ${muted ? "text-gray-300" : "text-gray-500"} text-[14px]`} />
        )}
        <span className="truncate">{label}</span>
    </div>
);




export default function Sidebar() {
    const [showServicesMore, setShowServicesMore] = useState(false);
    const [showProductivityMore, setShowProductivityMore] = useState(false);
    const [showAddNewInput, setShowAddNewInput] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    return (
        <aside className={`fixed md:relative z-40 bg-[#FAFAFA] h-full border-r w-[240px] text-[14px] transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
            <div>
                {/* Top Section: Workspace Name */}
                <div className="flex items-center justify-between px-4 py-2 mb-2">
                    {/* Left: Logo + Title */}
                    <div className="flex items-center gap-2">
                        <TbFlower className="text-gray-600 text-sm" />
                        <span className="text-[13px] font-medium text-gray-800">Sinan’s Nanis</span>
                        <FaChevronDown className="text-gray-400 text-xs ml-1" />
                    </div>

                    {/* Right: ↩ and ✎ */}
                    <div className="flex gap-2 text-gray-400 text-sm">
                        <FaUndo className="cursor-pointer" />
                        <FaPen className="cursor-pointer" />
                    </div>
                </div>
                <button
                    className="md:hidden p-2 absolute top-2 left-2 bg-gray-200 rounded z-50"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                    {isSidebarOpen ? "Close" : "Menu"}
                </button>

                {/* Navigation */}
                <SidebarItem icon={FaSearch} label="Search" />
                <SidebarItem icon={FaHome} label="Home" />
                <SidebarItem icon={FaRegBell} label="Updates" />

                {/* Space */}
                <SectionHeader title="Space" />
                <div className="px-1">
                    {/* Sinan’s HQ — normal alignment */}
                    <SidebarItem imgSrc="https://i.pravatar.cc/40?img=12" label="Sinan’s HQ" />

                    {/* Teamspace and Add new — with left margin and stacked */}
                    <div className="mt-[6px] ml-[15px]">
                        <SidebarItem icon={FaFolder} label="Teamspace" muted />
                        {showAddNewInput ? (
                            <div className="mt-[4px] px-5">
                                <input
                                    type="text"
                                    placeholder="New space..."
                                    className="text-sm px-2 py-1 border rounded w-full outline-none"
                                    onBlur={() => setShowAddNewInput(false)}
                                />
                            </div>
                        ) : (
                            <div className="mt-[4px]">
                                <SidebarItem icon={FaPlus} label="Add new" muted onClick={() => setShowAddNewInput(true)} />
                            </div>
                        )}
                    </div>

                </div>





                {/* Services */}
                {/* Services */}
                <SectionHeader title="Services" />
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


                {/* Productivity */}
                {/* Productivity */}
                <SectionHeader title="Productivity" />
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


                {/* LLM */}
                <SectionHeader title="LLM" />
                <SidebarItem icon={FaBook} label="Knowledge base" />
                <SidebarItem icon={FaRegFileAlt} label="Templates" />

                {/* Settings */}
                <SectionHeader title="Settings" />
                <SidebarItem icon={FaCog} label="Settings" />
                <SidebarItem icon={FaChartBar} label="Usage Insights" />
            </div>
            <div className='mt-[30px]'>
                <SidebarItem icon={FaUserPlus} label="Invite members" />

            </div>
            <div>
                <SidebarItem icon={FaRegCalendarAlt} />


            </div>
        </aside>
    );
}
