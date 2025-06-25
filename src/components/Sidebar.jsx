import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaChevronDown, FaEdit, FaChevronUp, FaFileContract, FaParagraph, FaTasks, FaBell
} from 'react-icons/fa';
import search from '../assets/vuesax/bulk/search-normal.svg';
import document from '../assets/vuesax/bulk/vuesax/bulk/document-text.svg';
import documentfav from '../assets/vuesax/bulk/vuesax/bulk/document-favorite.svg';
import updates from '../assets/vuesax/bulk/messages-2.svg';
import Calendar from '../assets/vuesax/bulk/calendar.svg';
import trend from '../assets/vuesax/bulk/trend-up.svg';
import template from '../assets/vuesax/bulk/vuesax/bulk/book-square.svg';
import arrow from '../assets/u_left-arrow-from-left.svg';
import add from '../assets/add.svg';
import set from '../assets/change.svg';
import book from '../assets/book.svg';
import pen from '../assets/vuesax/linear/edit-2.svg';
import dot from '../assets/Vector-1.svg';
import home from '../assets/home-2.svg';
import user from '../assets/block-1.svg';
import profile from '../assets/profile-add.svg';
import eSignature from '../assets/Signature.svg';
import icon from '../assets/Group.svg';
import research from '../assets/magic-star.svg';
import folder from '../assets/vuesax/bulk/folder-cloud.svg';

const SectionHeader = ({ title }) => (
    <div className="font-inter text-xs w-full h-[30px] px-2 font-medium text-[#91918E] flex items-center">
        {title}
    </div>
);

const SidebarItem = ({ icon: Icon, imgSrc, label, muted = false, onClick }) => (
    <div
        onClick={onClick}
        className={`flex  items-center px-2 py-[6px] rounded-[6px] cursor-pointer gap-2 transition-all duration-200
      hover:bg-[rgba(0,0,0,0.03)] text-sm
      ${muted ? 'text-[#adadac]' : 'text-[#5F5E5B]'}
    `}
        style={{ height: '30px' }}
    >
        {imgSrc ? (
            <img
                src={imgSrc}
                alt="icon"
                className={`object-contain ${muted ? 'w-[14.6px] h-[14.6px]' : 'w-[18px] h-[18px]'}`}
            />
        ) : (
            <Icon className="w-[18px] h-[18px]" />
        )}
        <span className="truncate font-inter text-[#5F5E5B] font-medium leading-[20px] tracking-[-0.04em]">
            {label}
        </span>
    </div>
);

export default function Sidebar() {
    const [showServicesMore, setShowServicesMore] = useState(false);
    const [showProductivityMore, setShowProductivityMore] = useState(false);
    const [showArrowIcon, setShowArrowIcon] = useState(false);
    const [showAccountDropdown, setShowAccountDropdown] = useState(false);

    return (
        <aside
            className="w-[211px] h-screen fixed scrollbar-hide md:relative z-40 bg-[#F8F8F7] border-r border-[#54483114] px-2 pb-2 flex flex-col text-sm"
            onMouseEnter={() => setShowArrowIcon(true)}
            onMouseLeave={() => setShowArrowIcon(false)}
        >
            <div
                className="h-full overflow-y-auto flex flex-col"
                style={{
                    scrollbarWidth: 'none', // Firefox
                    msOverflowStyle: 'none', // IE/Edge
                }}
            >
                {/* Hide scrollbar in WebKit browsers */}
                <style>
                    {`
        div::-webkit-scrollbar {
          width: 0px;
          background: transparent;
        }
      `}
                </style>
                <div className="flex items-center justify-between h-[32px] px-2 mt-2 relative">
                    <div
                        className="flex items-center gap-2 cursor-pointer relative"
                        onClick={() => setShowAccountDropdown(!showAccountDropdown)}
                    >
                        <img src={icon} alt="logo" className="w-[20px] h-[20px]" />
                        <span className="text-[#32302C] font-medium tracking-[-0.04em]">
                            Sinan’s Nanis
                        </span>
                        {showAccountDropdown ? (
                            <FaChevronUp className="text-gray-400 text-xs" />
                        ) : (
                            <FaChevronDown className="text-gray-400 text-xs" />
                        )}
                    </div>

                    <AnimatePresence>
                        {showAccountDropdown && (
                            <motion.div
                                initial={{ opacity: 0, y: -8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.2 }}
                                className="absolute top-[20px] left-8 bg-white border border-[#E5E5E5] shadow-md rounded-md w-[170px] z-50"
                            >
                                <button
                                    onClick={() => {
                                        setShowAccountDropdown(false);
                                        window.location.href = "/login";
                                        localStorage.clear();
                                        sessionStorage.clear();
                                        document.cookie.split(";").forEach(cookie => {
                                            const name = cookie.split("=")[0].trim();
                                            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
                                        });
                                    }}
                                    className="w-full px-4 py-2 text-sm text-left hover:bg-gray-100 text-[#5F5E5B]"
                                >
                                    Logout
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>


                    <div className="flex gap-2 text-[#5F5E5B] absolute right-1 top-[1px]">
                        {showArrowIcon && (
                            <img src={arrow} alt="undo" className="w-[18px] h-[18px] hover:opacity-80 cursor-pointer" />
                        )}
                        <img src={pen} alt="edit" className="w-[18px] h-[18px] hover:opacity-80 cursor-pointer" />
                    </div>
                </div>


                <div className="flex flex-col gap-[1px] mb-[8px] mt-2">
                    <SidebarItem imgSrc={search} label="Search" />
                    <SidebarItem imgSrc={home} label="Home" />
                    <SidebarItem imgSrc={updates} label="Updates" />
                </div>

                <div className="flex flex-col gap-[1px] mb-[8px]">
                    <SectionHeader title="Space" />
                    <SidebarItem imgSrc={user} label="Sinan’s HQ" />
                    <SidebarItem imgSrc={folder} label="Teamspace" muted />
                </div>

                <div className="flex flex-col gap-[1px] mb-[8px]">
                    <SectionHeader title="Services" />
                    <SidebarItem imgSrc={research} label="Legal research" />
                    <SidebarItem imgSrc={document} label="Create document" />
                    <SidebarItem imgSrc={documentfav} label="Review document" />

                    <AnimatePresence initial={false}>
                        {showServicesMore && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                            >
                                <SidebarItem icon={FaFileContract} label="Contract Builder" muted />
                                <SidebarItem icon={FaParagraph} label="Clause Manager" muted />
                            </motion.div>
                        )}
                    </AnimatePresence>


                    <SidebarItem
                        imgSrc={!showServicesMore ? dot : undefined}
                        icon={showServicesMore ? FaChevronUp : undefined}
                        label={showServicesMore ? 'Less' : 'More'}
                        muted
                        onClick={() => setShowServicesMore(!showServicesMore)}
                    />

                </div>

                <div className="flex flex-col gap-[1px] mb-[8px]">
                    <SectionHeader title="Productivity" />
                    <SidebarItem imgSrc={eSignature} label="eSignature" />
                    <SidebarItem imgSrc={updates} label="Chats" />
                    <SidebarItem imgSrc={Calendar} label="Calendar" />

                    <AnimatePresence initial={false}>
                        {showProductivityMore && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                            >
                                <SidebarItem icon={FaTasks} label="Tasks" muted />
                                <SidebarItem icon={FaBell} label="Reminders" muted />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <SidebarItem
                        imgSrc={!showProductivityMore ? dot : undefined}
                        icon={showProductivityMore ? FaChevronUp : undefined}
                        label={showProductivityMore ? 'Less' : 'More'}
                        muted
                        onClick={() => setShowProductivityMore(!showProductivityMore)}
                    />


                </div>

                <div className="flex flex-col gap-[1px] mb-[8px]">
                    <SectionHeader title="LLM" />
                    <SidebarItem imgSrc={book} label="Knowledge base" />
                    <SidebarItem imgSrc={template} label="Templates" />
                </div>

                <div className="flex flex-col gap-[1px] mb-[8px]">
                    <SectionHeader title="Settings" />
                    <SidebarItem imgSrc={set} label="Settings" />
                    <SidebarItem imgSrc={trend} label="Usage Insights" />
                    <SidebarItem imgSrc={profile} label="Invite members" />
                </div>
            </div>
        </aside>
    );
}
