import main from '../assets/main.svg'
import zoom from '../assets/Frame 16.svg'
import CardHeading from './CardHeading';
import calendar from '../assets/calendar.svg';

export default function MeetingsSection() {
  return (
    <div className="flex justify-center ">
      <div className="w-full max-w-[756px]">
        <CardHeading label="Upcoming meetings" iconSrc={calendar} />
        <div
          className="w-full h-[280.13px] bg-transparent rounded-[16px]  shadow-[0px_12px_32px_0px_rgba(0,0,0,0.05)] border border-[#54483114] flex font-inter"
        >
          {/* Left Side - Text with right divider */}
          <div className="w-1/2 flex flex-col justify-center px-6 border-r border-[#54483114]">
            <div className="flex gap-3 mb-2 px-2 pt-1">
              <img src={zoom} alt="Zoom" />
            </div>

            <div className="flex flex-col">
              <h2 className="text-[16px] w-[200px] h-[89px] px-2 pb-[16px] pt-[10px]  font-medium text-[#32302C] leading-[130%] tracking-[-4%]">
                Connect AI Meeting <br /> Notes with your Calendar events
              </h2>

              <p className="text-sm text-[#46444073] px-2 leading-[20px] tracking-[-4%] font-medium pb-4 text-opacity-70">
                Join calls, transcribe audio, and get summaries you can talk to.
              </p>

              <a
                href="#"
                className="text-[14px] px-2 pt-2 tracking-[-4%] leading-[120%] text-[#3390ED] font-medium"
              >
                Connect Calendar
              </a>
            </div>
          </div>

          {/* Right Side - Faces */}
          <div className="w-[378px] h-[280.13px] relative flex items-center justify-center">
            <img src={main} alt="Meeting Visual" className="w-[600px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

