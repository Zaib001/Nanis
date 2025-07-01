import logo from "../assets/Group 10 (1).svg";
import { FiClock, FiMoreHorizontal } from "react-icons/fi";

export default function DashboardHeader() {
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
        <FiMoreHorizontal className="w-5 h-5" />
      </div>
    </div>
  );
}
