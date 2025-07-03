import CardHeading from './CardHeading';
import task from '../assets/Frame 2043684104.svg';
import top from '../assets/task.svg';
import check from '../assets/Vector.svg';
import plus from '../assets/plus.svg';


export default function TasksSection() {
  return (
    <div className="flex justify-center mt-10 mb-6"> {/* Added mb-6 for bottom margin */}
      <div className="w-full max-w-[756px]">
        <CardHeading label="My tasks" iconSrc={task} />

        <div className="w-full h-[200px] bg-white rounded-[16px] shadow-[0px_12px_32px_0px_rgba(0,0,0,0.05)] border border-[#0000000D] flex font-inter overflow-hidden">
          
          {/* Left Side - Text */}
          <div className="w-1/2 flex flex-col justify-center px-6 border-r border-[#E5E5E5] gap-2">
            <div className="flex gap-3 mb-2 px-2 pt-1">
              <img src={top} alt="Task" className='text-[#32302C]' />
            </div>
            <p className="text-[14px] text-[#232323] px-2 pt-1 font-medium leading-[20px] mb-2">
              See all your tasks across Luis's Notion in one place.
            </p>
            <a
              href="#"
              className="text-[14px] text-[#3390ED] px-2 pt-1 font-medium leading-[20px]"
            >
              Start adding your task
            </a>
          </div>

          {/* Right Side - Task list */}
          <div className="w-1/2 px-6 py-5 text-[14px] text-[#888870] flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <img src={check} alt="check" className="w-4 h-4" />
                <span>Review NDA drafts</span>
              </div>
              <span className="text-sm text-[#A0A0A0]">May 19, 2025</span>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <img src={check} alt="check" className="w-4 h-4" />
                <span>Finalize contract template</span>
              </div>
              <span className="text-sm text-[#A0A0A0]">May 19, 2025</span>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 pt-[2.05px] pl-[2.06px]">
                <img src={plus} alt="plus" className="w-[12px] h-[12px] pt-[2.05px] pl-[2.06px]" />
                <span>New task</span>
              </div>
              <span className="text-sm text-[#A0A0A0]">–</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}


