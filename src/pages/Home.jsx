import React from "react";
import { FaChevronDown, FaPaperclip, FaAt, FaArrowUp } from "react-icons/fa";
import { BiWorld } from "react-icons/bi";
import { TbStars } from "react-icons/tb";

const Home = () => {
    return (
        <div className="w-full px-8 pt-8 pb-12 font-inter text-[#37352F]">
            {/* Header Greeting */}
            <div className="text-2xl font-medium mb-4">
                Good evening, <span className="font-bold">Sinan Ouriach</span>
            </div>

            {/* Prompt Bar */}
            <div className="w-full max-w-5xl bg-white border border-[#E5E5E5] rounded-xl px-6 py-4 shadow-sm mb-6 text-sm text-[#6C6C6C]">

                {/* Top row - Prompt input */}
                <div className="flex items-center gap-2 mb-3">
                    <button className="text-black font-medium flex items-center gap-1">
                        Load prompt <FaChevronDown className="text-xs" />
                    </button>
                    <span className="text-[#B0B0B0]">
                        Or, Ask, find anything from your workspace or any legal information...
                    </span>
                </div>

                {/* Bottom row - Actions */}
                <div className="flex justify-between items-center text-xs text-[#6C6C6C] flex-wrap gap-y-2">

                    {/* Left: Dropdown filters */}
                    <div className="flex items-center gap-2 flex-wrap">
                        <button className="flex items-center border border-[#E5E5E5] rounded-full px-2 py-[2px] bg-[#FAFAF9] text-[#37352F]">
                            Ask <FaChevronDown className="ml-1 text-[10px]" />
                        </button>

                        <span className="rounded-full px-2 py-[2px] bg-[#F1F1F0] text-[#37352F]">
                            Research
                        </span>

                        <button className="flex items-center gap-1 border border-[#E5E5E5] rounded-full px-2 py-[2px] bg-[#FAFAF9] text-[#37352F]">
                            <TbStars className="text-sm" /> Agents <FaChevronDown className="text-[10px]" />
                        </button>
                    </div>

                    {/* Right: Icons */}
                    <div className="flex items-center gap-4 text-[#888870]">
                        <button className="flex items-center gap-1">
                            <BiWorld className="text-lg" />
                            <TbStars className="text-lg" />
                            <span className="ml-1">All sources</span>
                            <FaChevronDown className="text-[10px] ml-1" />
                        </button>

                        <FaPaperclip className="cursor-pointer" />
                        <FaAt className="cursor-pointer" />
                        <FaArrowUp className="cursor-pointer" />
                    </div>
                </div>
            </div>

            {/* Recently Activity */}
            <section className="mb-8">
                <h3 className="text-sm font-medium text-[#6C6C6C] mb-2">Recently activity</h3>
                <div className="flex gap-3 overflow-x-auto">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div
                            key={i}
                            className="min-w-[130px] h-[80px] border border-[#E5E5E5] rounded-md flex items-center justify-center text-xs text-[#888870] bg-white"
                        >
                            None - Disclosure agreement
                        </div>
                    ))}
                </div>
            </section>

            {/* Upcoming Meetings */}
            <section className="mb-8">
                <h3 className="text-sm font-medium text-[#6C6C6C] mb-2">Upcoming meetings</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 bg-white border border-[#E5E5E5] rounded-xl overflow-hidden">

                    {/* Left Text Block */}
                    <div className="p-6 space-y-2">
                        {/* Meeting Platform Icons */}
                        <div className="flex gap-2 mb-1">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_Meet_icon_%282020%29.svg" alt="Meet" className="w-5 h-5" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_Office_Teams_%282018–present%29.svg" alt="Teams" className="w-5 h-5" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/7/7b/Zoom_Communications_Logo.svg" alt="Zoom" className="w-5 h-5" />
                        </div>

                        <h4 className="text-sm font-semibold">
                            Connect AI Meeting<br />Notes with your Calendar events
                        </h4>
                        <p className="text-xs text-[#6C6C6C]">
                            Join calls, transcribe audio, and get summarize you can talk to.
                        </p>
                        <button className="text-xs mt-2 text-blue-600 underline">Connect Nanis Calendar</button>
                    </div>

                    {/* Right Avatar Image Block */}
                    <div className="flex items-center justify-center p-4">
                        <img
                            src="/assets/meeting-chat-avatars.png" // You can replace with the uploaded asset
                            alt="Meeting Chat Avatars"
                            className="w-full max-w-[280px] rounded-md"
                        />
                    </div>

                </div>
            </section>


            {/* Get answers you can trust */}
            <section className="mb-8">
                <h3 className="text-sm font-medium text-[#6C6C6C] mb-2">Get answers you can trust</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 bg-white border border-[#E5E5E5] rounded-xl overflow-hidden">

                    {/* Left Content */}
                    <div className="p-6 space-y-2">
                        {/* Integration Icons */}
                        <div className="flex gap-2 mb-1">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/e/e9/Notion-logo.svg" alt="Notion" className="w-5 h-5" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5f/Google_Drive_logo.png" alt="Drive" className="w-5 h-5" />
                            <img src="https://upload.wikimedia.org/wikipedia/en/thumb/8/8e/Microsoft_OneDrive_logo.svg/1920px-Microsoft_OneDrive_logo.svg.png" alt="OneDrive" className="w-5 h-5" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/7/76/Slack_Icon.png" alt="Slack" className="w-5 h-5" />
                        </div>

                        <h4 className="text-sm font-semibold">
                            Make smarter legal<br />decisions
                        </h4>
                        <p className="text-xs text-[#6C6C6C]">
                            Connect your documents to get answers grounded in your contracts, policies, and filings.
                        </p>
                        <button className="text-xs mt-2 text-blue-600 underline">Browse integrations</button>
                    </div>

                    {/* Right Image (document list) */}
                    <div className="flex items-center justify-center p-4">
                        <img
                            src="/assets/legal-docs-preview.png" // Add your image here
                            alt="Documents Preview"
                            className="w-full max-w-[280px] rounded-md"
                        />
                    </div>
                </div>
            </section>


            {/* My Tasks */}
            <section className="mb-8">
                <h3 className="text-sm font-medium text-[#6C6C6C] mb-2">My tasks</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 bg-white border border-[#E5E5E5] rounded-xl overflow-hidden">

                    {/* Left Box: Info + Button */}
                    <div className="p-6 space-y-2">
                        <div className="text-xl"></div>
                        <p className="text-sm text-[#37352F] font-medium">
                            See all your tasks across Luis’s Notion in one place.
                        </p>
                        <button className="text-xs text-blue-600 underline">Start adding your task</button>
                    </div>

                    {/* Right Box: Task List */}
                    <div className="p-6 text-xs text-[#6C6C6C]">
                        <ul className="space-y-3">
                            <li className="flex justify-between items-center">
                                <span className="flex items-center gap-2">
                                    <span className="text-sm"></span> Review NDA drafts
                                </span>
                                <span>May 18, 2025</span>
                            </li>
                            <li className="flex justify-between items-center">
                                <span className="flex items-center gap-2">
                                    <span className="text-sm"></span> Finalize contract template
                                </span>
                                <span>May 19, 2025</span>
                            </li>
                            <li className="flex justify-between items-center">
                                <span className="flex items-center gap-2">
                                    <span className="text-sm">＋</span> New task
                                </span>
                                <span className="text-gray-400">—</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Home;
