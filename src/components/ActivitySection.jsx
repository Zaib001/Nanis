import avatars from "../assets/Component 1.svg";
import fileIcon from "../assets/vuesax/bulk/vuesax/bulk/document-text.svg";
import CardHeading from "./CardHeading";

const activities = Array.from({ length: 6 }).map((_, i) => ({
  title: "None-Disclosure agreement",
  time: "18 hours ago",
}));

export function ActivitySection() {
  return (
    <div className="mt-10">
      <CardHeading label="Recently activity" iconSrc={fileIcon} />
      <div className="w-[756px] h-[177px] flex flex-col gap-[10px] relative">
        <div className="relative">
          <div
            className="flex gap-3 overflow-x-auto px-2 pb-2 scrollbar-hide"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {activities.map((item, i) => (
              <div
                key={i}
                className="min-w-[150px] px-4 py-3 rounded-xl border border-[#E0E0E0] text-sm flex flex-col justify-between"
              >
                <div className="flex items-start justify-between">
                  <img src={fileIcon} alt="File" className="w-4 h-4" />
                  <img src={avatars} alt="avatars" className="w-10 h-5" />
                </div>

                <p className="font-medium text-[#32302C] text-[13px] mt-2 line-clamp-2">
                  {item.title}
                </p>

                <div className="border-t border-[#E0E0E0] mt-2 pt-1">
                  <span className="text-[11px] text-[#A0A0A0]">{item.time}</span>
                </div>            
                </div>
            ))}
          </div>

          {/* Right Fade */}
          <div className="absolute top-0 right-0 h-full w-48 bg-gradient-to-l from-white to-transparent pointer-events-none rounded-r-xl" />
        </div>
      </div>
    </div>
  );
}
