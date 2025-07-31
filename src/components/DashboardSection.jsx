import MeetingsSection from "./MeetingsSection";
import AnswersSection from "./AnswersSection";
import { ActivitySection } from "./ActivitySection";
import TasksSection from "./TasksSection";
import DashboardHeader from "./DashboardHeader";
import DashboardPopup from "../pages/DashboardPopup";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createConversation,
  testCheckCookie,
  testSetCookie,
} from "../services/api";
import { PromptSection } from "./PromptSection";

export default function DashboardSection() {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const testCookie = async () => {
    await testSetCookie();
    await testCheckCookie();
  };

  useEffect(() => {
    setTimeout(() => setShowPopup(true), 3000);
  }, []);

  const handleSend = async (prompt, config) => {
    console.log("nic");
    if (!prompt.trim()) return;
    console.log("nic after");
    const data = await createConversation({prompt});
    console.log({ data });

    navigate(
      `/chat/${data.conversationId}?q=${encodeURIComponent(prompt)}${config?.research ? "&r=true" : ""}${config?.webSearch ? "&ws=true" : ""}${config?.agent?.id ? `&agentId=${config?.agent?.id}` : ""}`,
    );
  };

  return (
    <>
      <DashboardHeader />
      <div className="w-full px-4 sm:px-[50px] flex flex-col gap-[50px] mt-[50px] items-center justify-center">
        <div className="w-full max-w-[1229px] flex flex-col  mx-auto">
          <PromptSection onSend={handleSend} /> <ActivitySection />
          <MeetingsSection />
          <AnswersSection />
          <TasksSection />
        </div>
      </div>
      {showPopup && <DashboardPopup setShowPopup={setShowPopup} />}
    </>
  );
}
