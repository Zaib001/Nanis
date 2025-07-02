import { motion } from 'framer-motion';

const AccountDropdown = ({ onClose }) => {
    return (
        <div>
            {/* Header */}
            <div className="p-4">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-[#3366FF] text-white flex items-center justify-center rounded-md text-sm font-semibold">
                        L
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-[#232323]">Sinan’s Nanis</p>
                        <p className="text-xs text-[#888870]">Trial Plan · 1 member</p>
                    </div>
                </div>

                <div className="flex gap-2 mt-3">
                    <button className="flex-1 py-1.5 text-sm border border-[#E0E0E0] rounded-md text-[#464440] hover:bg-[#F8F8F7]">
                        Settings
                    </button>
                    <button className="flex-1 py-1.5 text-sm border border-[#E0E0E0] rounded-md text-[#464440] hover:bg-[#F8F8F7]">
                        Invite members
                    </button>
                </div>
            </div>

            {/* Divider */}
            <div className="border-t border-[#E5E5E5] px-4 py-2 text-xs text-[#888870]">
                name@email.com
            </div>

            {/* Workspaces */}
            <div className="px-4 flex flex-col gap-1">
                <div className="flex justify-between items-center py-2 px-3 bg-[#F8F8F7] rounded-md cursor-pointer">
                    <div className="flex items-center gap-2 text-sm">
                        <div className="w-5 h-5 bg-[#3366FF] text-white flex items-center justify-center rounded text-[12px]">
                            L
                        </div>
                        <span>Luis’s Notion</span>
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
                        window.location.href = "/login";
                        localStorage.clear();
                        sessionStorage.clear();
                        document.cookie.split(";").forEach(cookie => {
                            const name = cookie.split("=")[0].trim();
                            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
                        });
                    }}
                    className="text-left hover:bg-[#F8F8F7] py-1 px-2 rounded-md"
                >
                    Log out
                </button>
            </div>
        </div>
    );
};

export default AccountDropdown;
