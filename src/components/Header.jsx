import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import logo from '../assets/Variant3.svg'
import globe from "../assets/globe.svg"

export default function Header() {
    const [open, setOpen] = useState(false);
    const [language, setLanguage] = useState("English");

    const toggleDropdown = () => setOpen((prev) => !prev);
    const handleSelect = (lang) => {
        setLanguage(lang);
        setOpen(false);
    };

    return (
        <header className="absolute top-0 left-0 w-full h-[114px] px-[30px] pt-[18px] pb-10 flex items-center justify-between z-50 bg-[#FAFAF9]">
            {/* Logo */}
            <img src={logo} alt="Logo" className="h-[33.62px] w-[100.04px] object-contain" />


            {/* Language Dropdown */}
            <div className="relative">
                <button
                    onClick={toggleDropdown}
                    className="flex font-inter text-[#91918E]  font-medium items-center gap-[8.2px] cursor-pointer text-sm "
                >
                <img src={globe} className="w-[15.42px] pt-[.5px]" alt="" />
                    {language+ " (US)"}
                    {open ? <FiChevronUp className="text-base" /> : <FiChevronDown className="text-base" />}
                </button>

                <AnimatePresence>
                    {open && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.15 }}
                            className="absolute right-0 mt-2 w-28 bg-white border border-gray-200 rounded-md shadow-md z-50 origin-top-right"
                        >
                            <button
                                onClick={() => handleSelect("English")}
                                className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                            >
                                English
                            </button>
                            <button
                                onClick={() => handleSelect("Arabic")}
                                className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                            >
                                Arabic
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
}
