import main from '../assets/main (2).svg'
import all from "../assets/Frame 17.svg"
import asnwer from '../assets/okb.svg'
import CardHeading from './CardHeading'

export default function AnswersSection() {
  return (
    <div className="flex justify-center mt-10">
      <div className="w-full max-w-[756px]">
        <CardHeading label="Get answers you can trust" iconSrc={asnwer} />

        <div className="w-full h-[280.13px] bg-white rounded-[16px] shadow-[0px_12px_32px_0px_rgba(0,0,0,0.05)] border border-[#0000000D] flex font-inter">
          <span></span>
          {/* Left Side - Text with right divider */}
          <div className="w-1/2 flex flex-col justify-center px-6 border-r border-[#E5E5E5]">
            <div className="flex gap-3 mb-2 px-2 pt-1">
              <img src={all} alt="Google Meet" />
            </div>

            <div className="flex flex-col">
              <h2 className="text-[16px] w-[200px] px-2 pb-[16px] pt-[10px] max-w-[200px] font-medium text-[#32302C] leading-[130%] -tracking-wider">
                Make smarter legal decisions
              </h2>

              <p className="text-sm text-[#464440] px-2 pb-4 text-opacity-70 w-[314px]">
                Connect your documents to get answers grounded in your contracts, policies, and filings.
              </p>

              <a href="#" className="text-[14px] px-2 pt-2 leading-[120%] text-[#3390ED] font-medium">
                Browse integrations
              </a>
            </div>
          </div>

          {/* Right Side - Faces */}
          <div className="w-[196px] h-[194px] mt-7 relative flex items-center justify-center">
            <img src={main} alt="Meeting Visual" className="w-[100%]" />
          </div>
        </div>
      </div>
    </div>
  );
}

