import MeetingsSection from "./MeetingsSection";
import AnswersSection from "./AnswersSection";
import { ActivitySection } from "./ActivitySection";
import TasksSection from "./TasksSection";
import DashboardHeader from "./DashboardHeader";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {PromptSection} from './PromptSection';

export default function DashboardSection() {

  const [prompt, setPrompt] = useState("");
  const navigate = useNavigate();

  const handleSend = () => {
    if (!prompt.trim()) return;
    const chatId = Date.now();
    navigate(`/chat/${chatId}?q=${encodeURIComponent(prompt)}`);
  };

  return (
    <>
      <DashboardHeader />
      <div className="w-full px-4 sm:px-[50px] flex flex-col gap-[50px] mt-[50px] items-center justify-center">
        <div className="w-full max-w-[1229px] flex flex-col gap-[32px] mx-auto">
          <PromptSection prompt={prompt} setPrompt={setPrompt} onSend={handleSend} />          
          <ActivitySection />
          <MeetingsSection />
          <AnswersSection />
          <TasksSection />
        </div>
      </div>
    </>
  );
}

