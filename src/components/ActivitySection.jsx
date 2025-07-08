import { useEffect, useState, useRef } from "react";
import avatars from "../assets/Component 1.svg";
import fileIcon from "../assets/vuesax/bulk/vuesax/bulk/document-text.svg";
import CardHeading from "./CardHeading";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const activities = Array.from({ length: 6 }).map((_, i) => ({
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
        left: direction === "left" ? -200 : 200,
        behavior: "smooth",
      });

      setTimeout(updateScrollButtons, 200);
    }
  };


  return (
    <div className="mt-10 flex justify-center">
      <div className="w-full max-w-[756px] relative">
        <CardHeading label="Recently activity" iconSrc={fileIcon} />

        <div className="w-full h-[177px] flex flex-col gap-[10px] relative">
          {/* Scrollable Activity Tiles */}
          <div className="relative ">
            {/* Scrollable content */}
            <div
              ref={scrollRef}
              className="flex gap-3 overflow-x-hidden px-2 pb-2 scrollbar-hide scroll-smooth"
              style={{ scrollSnapType: "x mandatory" }}
            >
              {activities.map((item, i) => (
                <div
                  key={i}
                  className="min-w-[160px] px-4 py-3 rounded-xl border border-[#E0E0E0] text-sm flex flex-col justify-between bg-white scroll-snap-align-start"
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

            {/* Left Button */}
            {canScrollLeft && (

              <button
                className="absolute left-[0px] top-[40%] border border-[#F1F1F1] transform -translate-y-1/2 bg-white rounded-full shadow-md w-8 h-8 flex items-center justify-center z-10"
                onClick={() => scroll("left")}
              >
                <FiChevronLeft className="text-[#91908F]" />
              </button>
            )}
            {canScrollRight && (
              <div className="absolute top-0 right-0 h-full w-32 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
            )}

            {canScrollRight && (

              <button
                className="absolute right-[0px] top-[40%] border border-[#F1F1F1] transform -translate-y-1/2 bg-white rounded-full shadow-md w-8 h-8 flex items-center justify-center z-10"
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
