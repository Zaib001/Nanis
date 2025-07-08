import React, { useState } from "react";
import DashboardSection from "../components/DashboardSection";
import { PromptSection } from "../components/PromptSection";
import { ActivitySection } from "../components/ActivitySection";
import DashboardHeader from "../components/DashboardHeader";
import toast from "react-hot-toast";
import { createConversation } from "../services/api";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [prompt, setPrompt] = useState("");
  const navigate = useNavigate();

  const onSend = async () => {
    try {
      const data = await createConversation({ prompt });
      navigate(`/chat/${data.conversationId}`);
    } catch (error) {
      toast.error(error.message);
    }
  };


  return (
    <>
      <DashboardHeader />
      <div className="w-[1229px] px-[50px] flex flex-col gap-[50px] mt-[50px]">
        <div className="w-[756px] flex flex-col gap-[32px] mx-auto">
          <PromptSection prompt={prompt} setPrompt={setPrompt} onSend={onSend} />
          <ActivitySection />
        </div>
      </div>
    </>
  );
};

export default Home;
