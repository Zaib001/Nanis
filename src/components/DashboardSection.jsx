import MeetingsSection from "./MeetingsSection";
import AnswersSection from "./AnswersSection";
import { ActivitySection } from "./ActivitySection";
import TasksSection from "./TasksSection";
import DashboardHeader from "./DashboardHeader";
import DashboardPopup from "../pages/DashboardPopup";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createConversation } from "../services/api";
import { PromptSection } from "./PromptSection";

export default function DashboardSection() {
  const [prompt, setPrompt] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {

    setTimeout(() => setShowPopup(true),3000)
},[])

  const handleSend = async () => {
    if (!prompt.trim()) return;
    const data = await createConversation();
    console.log({ data });

    navigate(`/chat/${data.conversationId}?q=${encodeURIComponent(prompt)}`);
  };

  return (
    <>
      <DashboardHeader />
      <div className="w-full px-4 sm:px-[50px] flex flex-col gap-[50px] mt-[50px] items-center justify-center">
        <div className="w-full max-w-[1229px] flex flex-col gap-[32px] mx-auto">
          <PromptSection
            prompt={prompt}
            setPrompt={setPrompt}
            onSend={handleSend}
          />{" "}
          <ActivitySection />
          <MeetingsSection />
          <AnswersSection />
          <TasksSection />
        </div>
      </div>
      {showPopup && <DashboardPopup setShowPopup={setShowPopup} />}
    </>
  );
}
