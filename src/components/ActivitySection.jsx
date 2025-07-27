import { useEffect, useState, useRef } from "react";
import avatars from "../assets/Component 1.svg";
import fileIcon from "../assets/vuesax/bulk/vuesax/bulk/document-text.svg";
import clockIcon from "../assets/clock.svg"
import CardHeading from "./CardHeading";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const activities = Array.from({ length: 18 }).map((_, i) => ({
  title: "None-Disclosure agreement",
  time: "18 hours ago",
}));

export function ActivitySection() {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollButtons);
    updateScrollButtons(); // on mount

    return () => el.removeEventListener("scroll", updateScrollButtons);
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -1100 : 1100,
        behavior: "smooth",
      });

      setTimeout(updateScrollButtons, 1100);
    }
  };

  return (
    <div className="mt-10 flex justify-center">
      <div className="w-full max-w-[756px] relative">
        <CardHeading label="Recently activity" iconSrc={clockIcon} />

        <div className="w-full pb-[36px] flex flex-col gap-[10px] relative">
          {/* Scrollable Activity Tiles */}
          <div className="relative ">
            {/* Scrollable content */}
            <div
              ref={scrollRef}
              className="flex gap-3 overflow-x-hidden px-2  scrollbar-hide scroll-smooth"
              style={{ scrollSnapType: "x mandatory" }}
            >
              {activities.map((item, i) => (
                <div
                  key={i}
                  className="min-w-[124px]  rounded-xl border-[1px] border-[#EDEDDF] shadow-[0px_12px_32px_0px_rgba(0, 0, 0, 0.02)] shadow-[0px_0px_0px_1px_rgba(0, 0, 0, 0.05)] text-sm flex flex-col  bg-transparent scroll-snap-align-start"
                >
                  <div className="px-3 rounded-t-xl py-[10px] bg-[#F8F8F7]">
                    {" "}
                    <div className="flex items-start justify-between">
                      <img src={fileIcon} alt="File" className="w-4 h-4" />
                      <img src={avatars} alt="avatars" className="w-10 h-5" />
                    </div>
                    <p className="font-medium text-[#32302C] text-[14px] mt-2 line-clamp-2 leading-[14px] tracking-[-4%]">
                      {item.title}
                    </p>
                  </div>

                  <div className="pb-[10px] pt-[8px]   pl-[12px] text-start">
                    <span className="text-[12px] p-0 leading-[10px] tracking-[-4%] font-medium  text-[#ACABA9]">
                      {item.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Fade */}

            {/* Left Button */}
            {canScrollLeft && (
              <button
                className="absolute left-[0px] top-[40%] border border-[#F1F1F1] transform -translate-y-1/2 bg-white rounded-full  p-[10px] shadow-sm flex items-center justify-center z-10"
                onClick={() => scroll("left")}
              >
                <FiChevronLeft className="text-[#91908F]" />
              </button>
            )}
            {canScrollLeft && (
              <div className="absolute top-0 left-0 h-full w-[96px] bg-gradient-to-r from-white to-transparent pointer-events-none z-9" />
            )}


            {canScrollRight && (
              <div className="absolute top-0 right-0 h-full w-[96px] bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
            )}

            {canScrollRight && (
              <button
                className="absolute right-[0px] top-[40%] border border-[#F1F1F1] transform -translate-y-1/2 bg-white rounded-full shadow-sm p-[10px] flex items-center justify-center z-10"
                onClick={() => scroll("right")}
              >
                <FiChevronRight className="text-[#91908F]" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
