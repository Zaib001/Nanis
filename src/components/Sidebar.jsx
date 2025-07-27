import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiPlus } from "react-icons/fi";
import {
  FaChevronDown,
  FaEdit,
  FaChevronUp,
  FaFileContract,
  FaParagraph,
  FaTasks,
  FaBell,
} from "react-icons/fa";
import search from "../assets/vuesax/bulk/search-normal.svg";
import document from "../assets/vuesax/bulk/vuesax/bulk/document-text.svg";
import documentfav from "../assets/vuesax/bulk/vuesax/bulk/document-favorite.svg";
import updates from "../assets/vuesax/bulk/messages-2.svg";
import Calendar from "../assets/vuesax/bulk/calendar.svg";
import trend from "../assets/vuesax/bulk/trend-up.svg";
import template from "../assets/vuesax/bulk/vuesax/bulk/book-square.svg";
import arrow from "../assets/u_left-arrow-from-left.svg";
import add from "../assets/add.svg";
import set from "../assets/change.svg";
import book from "../assets/book.svg";
import pen from "../assets/Frame 15.svg";
import dot from "../assets/Vector-1.svg";
import home from "../assets/home-2.svg";
import userPlaceholder from "../assets/block-1.svg";
import profile from "../assets/people.svg";
import eSignature from "../assets/Signature.svg";
import icon from "../assets/Group.svg";
import research from "../assets/magic-star.svg";
import review from "../assets/document-favorite.svg";
import eyee from "../assets/eyee.svg";
import chat from "../assets/message-text.svg";
import sms from "../assets/sms.svg";
import translate from "../assets/translate.svg";
import calendar from "../assets/calendar.svg";
import copy from "../assets/document-copy.svg";
import task from "../assets/Frame 2043684104.svg";
import folder from "../assets/vuesax/bulk/folder-cloud.svg";
import searchGlass from "../assets/search-glass.svg";
import { useNavigate } from "react-router-dom";
import { FiSettings, FiUserPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import ChatHistoryPanel from "./ChatHistoryPanel";
import setting from "../assets/setting.svg";
import invite from "../assets/Invite Member Small.svg";
import { useAuth } from "../providers/AuthProvider";
const SectionHeader = ({ title }) => (
  <div className="font-inter text-xs w-full h-[30px] px-2 font-normal text-[#91918E] flex items-center">
    {title}
  </div>
);

const SidebarItem = ({ icon: Icon, imgSrc, label, muted = false, onClick }) => {
  const navigate = useNavigate();
  const routes = {
    Home: "/dashboard",
    Settings: "/settings",
    "Invite members": "/invite",
    "Usage Insights": "/usage",
    // Add more label-route mappings here
  };

  return (
    <div
      onClick={() =>
        onClick ? onClick() : navigate(routes[label] || "/dashboard")
      }
      className={`flex items-center px-2 py-[6px] rounded-[6px] cursor-pointer gap-2 transition-all duration-200
      hover:bg-[rgba(0,0,0,0.03)] text-sm
      ${muted ? "text-[#adadac]" : "text-[#5F5E5B]"}
    `}
      style={{ height: "30px" }}
    >
      {imgSrc ? (
        <img
          src={imgSrc}
          alt="icon"
          className={`object-contain ${muted ? "w-[14.6px]" : "w-[18px]"} h-[18px]`}
        />
      ) : (
        <Icon className="w-[18px] h-[18px]" />
      )}
      <span className="truncate font-inter text-[#91918E] font-normal leading-[20px] tracking-[-0.04em]">
        {label}
      </span>
    </div>
  );
};

export default function Sidebar() {
  const [showServicesMore, setShowServicesMore] = useState(false);
  const [showProductivityMore, setShowProductivityMore] = useState(false);
  const [showArrowIcon, setShowArrowIcon] = useState(false);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [showChatHistory, setShowChatHistory] = useState(false);
  const { user } = useAuth();
  console.log({ user });

  return (
    <>
      <aside
  className="w-[211px] h-screen fixed scrollbar-hide md:relative z-40 bg-[#F8F8F7] border-r border-[#54483114] pt-[10px] px-2 pb-2 flex flex-col text-sm overflow-hidden" // Added overflow-hidden here
  onMouseEnter={() => setShowArrowIcon(true)}
  onMouseLeave={() => setShowArrowIcon(false)}
>
  <div className="h-full flex overflow-y-auto flex-col scrollbar-hide">          {/* Hide scrollbar in WebKit browsers */}
         <div className="flex items-center justify-between h-[32px]  px-2 mt-2 relative">
            <div
              className="flex items-center gap-2 cursor-pointer relative"
              onClick={() => setShowAccountDropdown(!showAccountDropdown)}
            >
              <img src={icon} alt="logo" className="w-[20px] h-[20px]" />
              <span className="text-[#32302C] font-normal tracking-[-0.04em]">
                {user?.name && user?.name?.split(" ")[0]}’s Nanis
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
                  className="fixed top-[32px] left-[8px] w-[300px] h-[310px] rounded-[12px] bg-white z-[100] 
                 shadow-[0px_14px_28px_-6px_rgba(0,0,0,0.1),0px_2px_4px_-1px_rgba(0,0,0,0.06),0px_0px_0px_1px_#54483114]
                 border border-[#E5E5E5] flex flex-col justify-between"
                >
                  {/* Header */}
                  <div className="p-4">
                    <div className="flex items-center gap-3">
                      {user?.profilePic ? (
                        <img
                          src={user.profilePic}
                          className="w-9 h-9 rounded-md"
                          alt=""
                        />
                      ) : (
                        <div className="w-9 h-9 bg-[#3366FF] text-white flex items-center justify-center rounded-md text-sm font-semibold">
                          L
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-semibold text-[#232323]">
                          {user?.name?.split(" ")[0]}’s Nanis
                        </p>
                        <p className="text-xs text-[#888870]">
                          Trial Plan · 1 member
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-[8px] mt-[12px] w-[276px] h-[28px]">
                      {/* Settings Button */}
                      {/* Settings Button */}
                      <button
                        className="w-[86px] h-[32px] px-[8px] flex items-center gap-[6px] text-sm text-[#464440] 
  border border-[#37352F29] rounded-[6px] hover:bg-[#F8F8F7]"
                      >
                        <img src={setting} alt="Settings" className="w-4 h-4" />
                        <span className="text-xs text-[#73726E]leading-none">
                          Settings
                        </span>
                      </button>

                      {/* Invite Members Button */}
                      <button
                        className="w-[127px] h-[32px] px-[8px] flex items-center justify-center gap-[6px] 
  text-xs text-[#464440] border border-[#37352F29] rounded-[6px] hover:bg-[#F8F8F7]"
                      >
                        <img src={invite} alt="Invite" className="w-4 h-4" />
                        <span className="text-xs text-[#73726E]leading-none">
                          Invite members
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-[#E5E5E5] px-4 py-2 text-xs text-[#888870]">
                    {user?.email}
                  </div>

                  {/* Workspaces */}
                  <div className="px-4 flex flex-col gap-1">
                    <div className="flex justify-between items-center py-2 px-3 bg-[#F8F8F7] rounded-md cursor-pointer">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-5 h-5 bg-[#3366FF] text-white flex items-center justify-center rounded text-[12px]">
                          L
                        </div>
                        <Link to="/home">
                          {user?.name?.split(" ")[0]}’s Notion
                        </Link>
                      </div>
                      <span className="text-xl text-[#3390ED]">✓</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm px-3 py-1 cursor-pointer hover:bg-[#F8F8F7] rounded-md">
                      <span className="text-lg">＋</span>
                      <span>New workspace</span>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="px-4 py-2 text-sm flex flex-col text-[#5F5E5B]">
                    <button className="text-left hover:bg-[#F8F8F7] py-1 px-2 rounded-md">
                      Add another account
                    </button>
                    <button
                      onClick={() => {
                        setShowAccountDropdown(false);
                        window.location.href = "/auth";
                        localStorage.clear();
                        sessionStorage.clear();
                        document.cookie.split(";").forEach((cookie) => {
                          const name = cookie.split("=")[0].trim();
                          document.cookie =
                            name +
                            "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
                        });
                      }}
                      className="text-left hover:bg-[#F8F8F7] py-1 px-2 rounded-md"
                    >
                      Log out
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex gap-2 text-[#5F5E5B] absolute right-1 top-[1px]">
              {showArrowIcon && (
                <img
                  src={arrow}
                  alt="toggle history"
                  className="w-[18px] h-[18px] hover:opacity-80 cursor-pointer"
                />
              )}

              <img
                src={pen}
                alt="edit"
                className="w-[18px] h-[18px] hover:opacity-80 cursor-pointer"
                onClick={() => setShowChatHistory((prev) => !prev)}
              />
            </div>
          </div>

          <div className="flex flex-col gap-[1px] mb-[8px] mt-2">
            <SidebarItem imgSrc={search} label="Search" />
            <SidebarItem imgSrc={home} label="Home" />
            <SidebarItem imgSrc={updates} label="Updates" />
          </div>

          <div className="flex flex-col gap-[1px] mb-[8px]">
            <SectionHeader title="Space" />
            <SidebarItem imgSrc={userPlaceholder} label="Sinan’s HQ" />
            <SidebarItem imgSrc={folder} label="Teamspace" muted />
          </div>

          <div className="flex flex-col gap-[1px] mb-[8px]">
            <SectionHeader title="Services" />
            <SidebarItem imgSrc={research} label="Legal research" />
            <SidebarItem imgSrc={document} label="Create document" />
            <SidebarItem imgSrc={review} label="Review document" />

            <AnimatePresence initial={false}>
              {showServicesMore && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <SidebarItem imgSrc={chat} label="Chat with document" />
                  <SidebarItem imgSrc={copy} label="Compare document" />
                  <SidebarItem imgSrc={translate} label="Legal translate" />
                  <SidebarItem imgSrc={sms} label="Memo & mail" />
                  <SidebarItem imgSrc={eyee} label="Case guide" />
                </motion.div>
              )}
            </AnimatePresence>

            <SidebarItem
              imgSrc={!showServicesMore ? dot : dot}
              label={showServicesMore ? "Less" : "More"}
              muted
              onClick={() => setShowServicesMore(!showServicesMore)}
            />
          </div>

          <div className="flex flex-col gap-[1px] mb-[8px]">
            <SectionHeader title="Productivity" />
            <SidebarItem imgSrc={eSignature} label="eSignature" />
            <SidebarItem imgSrc={updates} label="Chats" />
            <SidebarItem imgSrc={calendar} label="Calendar" />

            <AnimatePresence initial={false}>
              {showProductivityMore && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <SidebarItem imgSrc={task} label="Tasks" />
                  <SidebarItem imgSrc={book} label="Legal news" />
                </motion.div>
              )}
            </AnimatePresence>

            <SidebarItem
              imgSrc={!showProductivityMore ? dot : dot}
              label={showProductivityMore ? "Less" : "More"}
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
            <SidebarItem imgSrc={profile} label="Teams" />
          </div>
        </div>
      </aside>
      {showChatHistory && (
        <AnimatePresence>
          <motion.div
            initial={{ x: -300, opacity: 1 }}
            animate={{ x: 1, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-[210px] w-[254px] h-[928px] bg-white border border-gray-200 p-[10px] z-30  shadow-sm"
          >
            <div className="flex items-center justify-between mb-2 ">
              <span className="text-sm font-medium text-[#5F5E5B] px-[10px] py-[7.5px]">
                Chat history
              </span>

              <div className="flex items-center gap-[10.4px]">
                <img
                  src={arrow}
                  alt="Back"
                  className="w-4 h-4  cursor-pointer rotate-180 hover:opacity-80"
                  onClick={() => setShowChatHistory((prev) => !prev)}
                />
                <FiPlus className="w-4 h-4 text-gray-600 cursor-pointer" />
              </div>
            </div>{" "}
            <div className="w-[234px] py-[5px]  flex items-center border-[1px] border-[#EDEDED] rounded-[6px] px-2  gap-2 bg-white">
              <img
                src={searchGlass}
                alt="search-history"
                className="w-[17px]"
              />
              <input
                type="text"
                placeholder="Search or start new chat"
                className="flex-1 text-sm mb-[1.5px] text-gray-600 outline-none  bg-transparent font-medium placeholder:text-[#ACABA9]"
              />
            </div>
            <div className="text-center text-[#73726E] text-[12px] py-2 font-medium mt-[10px] text-xs">
              No result
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
}
