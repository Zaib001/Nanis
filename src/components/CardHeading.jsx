export default function CardHeading({
    label = "Upcoming meetings",
    iconSrc = "/icons/calendar.svg", // default fallback
    alt = "icon",
}) {
    return (
        <div className="flex items-center gap-2 text-[#47464499] text-[12px] leading-3 font-medium mb-3 ml-3">
            <div className="w-5 h-5 bg-[#F1F1F1] rounded-md flex items-center justify-center">
                <img src={iconSrc} alt={alt} className="w-[16px] h-[16px]" />
            </div>
            {label}
        </div>
    );
}
