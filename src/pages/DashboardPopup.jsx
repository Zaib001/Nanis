import logo from "../assets/Variant3.svg";
import doc from "../assets/document-text-light.svg";
import promptImage from "../assets/prompt-image.svg";
import cross from "../assets/cross-popup.svg";

const DashboardPopup = ({setShowPopup}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex font-inter justify-center items-center z-50">
      <div className="bg-white rounded-2xl flex w-[727px]   shadow-lg relative">
        {/* Close Button */}
        <button
          className="absolute top-[26.98px] right-[20.93px] text-gray-500 hover:text-black"
          onClick={() => {
            setShowPopup(false);
          }}
        >
          <img src={cross} width={14} alt="" />
        </button>

        <div className="flex flex-col justify-start p-[50px] pr-0 w-[434px]">
          <img
            src={logo}
            alt="Logo"
            className="w-[100.78px] object-contain mb-[30px]"
          />
          <div className="mb-[30px]">
            {" "}
            <h1 className="text-[29px] mb-[10px] tracking-[-2%] text-[#32302C] leading-[40px] font-semibold">
              You’re in! Prompt it to <br />
              done with Nanis AI
            </h1>
            <p className="text-[#636361] text-[14px] leading-[20px] font-normal">
              Start with an idea, question, or draft Nanis helps
              <br /> you turn it into a finished document in seconds.
            </p>
          </div>
          <button className="bg-[#888870] text-[14px] text-white flex items-center gap-[10px] font-medium rounded-[8px] p-[10px] w-[256px]">
            {" "}
            <span>
              <img src={doc} width={18} alt="" />
            </span>
            Start with creating a document
          </button>
        </div>
        <div className="bg-[#EDEDDF] rounded-l-0 flex items-center rounded-r-2xl w-[293px] h-[360px]">
          <img src={promptImage} className="m-auto" alt="" />
        </div>
      </div>
    </div>
  );
};

export default DashboardPopup;
