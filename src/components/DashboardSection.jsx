import MeetingsSection from "./MeetingsSection";
import AnswersSection from "./AnswersSection";
import { ActivitySection } from "./ActivitySection";
import { PromptSection } from "./PromptSection";
import TasksSection from "./TasksSection";
import DashboardHeader from "./DashboardHeader";

export default function DashboardSection() {
  return (
    <>
      <DashboardHeader />
      <div className="w-[1229px] px-[50px] flex flex-col gap-[50px] mt-[50px]">
        <div className="w-[756px] flex flex-col gap-[32px] mx-auto">
          <PromptSection />
          <ActivitySection />
          <MeetingsSection />
          <AnswersSection />
          <TasksSection />
        </div>
      </div>
    </>
  );
}
