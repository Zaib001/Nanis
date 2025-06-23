import { useState } from 'react';
import {
    FaSearch, FaHome, FaRegBell, FaUserCircle, FaFolder,
    FaPlus, FaStar, FaFileAlt, FaRegFileAlt, FaEdit,
    FaCommentDots, FaCalendarAlt, FaBook, FaCog, FaChartBar, FaRegCalendarAlt, FaUserPlus, FaEllipsisH, FaChevronDown, FaUndo, FaPen
} from 'react-icons/fa';
import { TbFlower } from 'react-icons/tb';
import search from '../assets/vuesax/bulk/search-normal.svg'
import document from '../assets/vuesax/bulk/vuesax/bulk/document-text.svg'
import documentfav from '../assets/vuesax/bulk/vuesax/bulk/document-favorite.svg'
import updates from '../assets/vuesax/bulk/messages-2.svg'
import Calendar from '../assets/vuesax/bulk/calendar.svg'
import trend from '../assets/vuesax/bulk/trend-up.svg'
import template from '../assets/vuesax/bulk/vuesax/bulk/book-square.svg'
import arrow from '../assets/u_left-arrow-from-left.svg'
import add from '../assets/add.svg'
import set from '../assets/change.svg'
import book from '../assets/book.svg'
import pen from '../assets/vuesax/linear/edit-2.svg'
import dot from '../assets/Vector-1.svg'
import home from '../assets/home-2.svg'
import user from '../assets/block-1.svg'
import profile from '../assets/profile-add.svg'
import eSignature from '../assets/Signature.svg'
import icon from '../assets/Group.svg'
import research from '../assets/magic-star.svg'
import folder from '../assets/vuesax/bulk/folder-cloud.svg'

const SectionHeader = ({ title }) => (
    <div className="font-inter text-[12px] px-2 pt-6 pb-4 w-[36px] h-[12px] leading-[12px] font-medium text-[#91918E] uppercase">
        {title}
    </div>
);

const SidebarItem = ({ icon: Icon, imgSrc, label, muted = false, small = false, onClick }) => (
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
    ${small ? "hover:w-[175px] " : ""}
  `}
    >

        {imgSrc ? (
            <img
                src={imgSrc}
                alt="avatar"
                className={`
      ${muted ? "w-[14.6px] h-[14.6px]" : "w-[18px] h-[18px]"}
      object-contain
      mr-3
      flex-shrink-0
    `}
            />
        ) : (
            <Icon className="w-[18px] h-[18px] mr-3 text-[#5F5E5B] flex-shrink-0" />
        )}


        <span
            className={`
    truncate font-inter font-medium text-[14px] leading-[20px] tracking-[-0.04em]
    ${muted ? "text-[#91918E]" : "text-[#5F5E5B]"}
  `}
        >
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
            className={`fixed md:relative z-40  bg-[#54483114] w-[211px] h-[1501.13px] border-r px-2 pb-2 text-[14px] transition-transform duration-300
    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 flex flex-col`}
        >
            <div>
                {/* Top Section: Workspace Name */}
                <div className="flex items-center justify-between w-[211px] h-[32px] pt-[8px] pr-[6px] pb-[8px] pl-[6px]">
                    {/* Left: Logo + Title */}
                    <div className="flex items-center">
                        <img
                            src={icon}
                            alt="arrow"
                            className="w-[20px] h-[20px]"
                        />&nbsp;&nbsp;&nbsp;
                        <span className="text-[14px] font-medium text-[#32302C] leading-5 tracking-[-0.04em]">
                            Sinan’s Nanis
                        </span>&nbsp;
                        <FaChevronDown className="text-gray-400 text-xs ml-1" />
                    </div>

                    {/* Right: Undo & Pen */}
                    <div className="flex text-[#5F5E5B] text-sm gap-2 mr-2">
                        <img
                            src={arrow}
                            alt="arrow"
                            className="w-[18px] h-[18px]"
                        />
                        <img
                            src={pen}
                            alt="arrow"
                            className="w-[18px] h-[18px]"
                        />                    </div>
                </div>


                <button
                    className="md:hidden p-2 absolute top-2 left-2 bg-gray-200 rounded z-50"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                    {isSidebarOpen ? "Close" : "Menu"}
                </button>
                {/* Navigation */}
                <div className="space-y-[1px] mt-2">
                    <SidebarItem imgSrc={search} label="Search" />
                    <SidebarItem imgSrc={home} label="Home" />
                    <SidebarItem imgSrc={updates} label="Updates" />
                </div>

                {/* Space */}
                <SectionHeader title="Space" />
                <div className="px-1 space-y-[1px]">
                    <SidebarItem imgSrc={user} label="Sinan’s HQ" />
                    <div className="mt-[6px] ml-[15px] space-y-[1px]">
                        <SidebarItem imgSrc={folder} label="Teamspace" small />
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
                            <SidebarItem imgSrc={add} label="Add new" muted small onClick={() => setShowAddNewInput(true)} />
                        )}
                    </div>
                </div>

                {/* Services */}
                <SectionHeader title="Services" />
                <div className="space-y-[1px]">
                    <SidebarItem imgSrc={research} label="Legal research" />
                    <SidebarItem imgSrc={document} label="Create document" />
                    <SidebarItem imgSrc={documentfav} label="Review document" />
                    {showServicesMore && (
                        <>
                            <SidebarItem icon={FaEdit} label="Contract Builder" muted />
                            <SidebarItem icon={FaEdit} label="Clause Manager" muted />
                        </>
                    )}
                    <SidebarItem imgSrc={dot} label="More" muted onClick={() => setShowServicesMore(!showServicesMore)} />
                </div>

                {/* Productivity */}
                <SectionHeader title="Productivity" />
                <div className="space-y-[1px]">
                    <SidebarItem imgSrc={eSignature} label="eSignature" />
                    <SidebarItem imgSrc={updates} label="Chats" />
                    <SidebarItem imgSrc={Calendar} label="Calendar" />
                    {showProductivityMore && (
                        <>
                            <SidebarItem icon={FaEdit} label="Tasks" muted />
                            <SidebarItem icon={FaEdit} label="Reminders" muted />
                        </>
                    )}
                    <SidebarItem imgSrc={dot} label="More" muted onClick={() => setShowProductivityMore(!showProductivityMore)} />
                </div>

                {/* LLM */}
                <SectionHeader title="LLM" />
                <div className="space-y-[1px]">
                    <SidebarItem imgSrc={book} label="Knowledge base" />
                    <SidebarItem imgSrc={template} label="Templates" />
                </div>

                {/* Settings */}
                <SectionHeader title="Settings" />
                <div className="space-y-[1px]">
                    <SidebarItem imgSrc={set} label="Settings" />
                    <SidebarItem imgSrc={trend} label="Usage Insights" />
                    <SidebarItem imgSrc={profile} label="Invite members" />
                </div>

            </div>


        </aside>
    );
}
