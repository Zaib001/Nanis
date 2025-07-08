import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { PromptSection } from "../components/PromptSection";
import { FiThumbsUp, FiThumbsDown, FiCopy } from "react-icons/fi";
import { getConversationMessages } from "../services/api";

export default function ChatPage() {
  const { chatId } = useParams();
  const query = new URLSearchParams(useLocation().search);
  const initialPrompt = query.get("q") || "";

  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  // Load conversation messages from backend
  useEffect(() => {
    if (!chatId) return;

    getConversationMessages(chatId)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.messages)) {
          setMessages(data.messages);
        }
      });

    // If there's an initial prompt, trigger stream
    if (initialPrompt) {
      sendPrompt(initialPrompt);
    }
  }, [chatId]);

const sendPrompt = async (text) => {
  if (!text || !text.trim()) return;

  if (!chatId) {
    console.error("No chatId available");
    return;
  }

  // Add user message to UI immediately
  const userMsg = { id: Date.now(), role: "user", content: text };
  setMessages((prev) => [...prev, userMsg]);
  setPrompt("");
  setIsTyping(true);

  // Create placeholder for assistant response
  const assistantId = Date.now() + 1;
  let fullResponse = "";
  setMessages((prev) => [
    ...prev,
    { id: assistantId, role: "assistant", content: "" },
  ]);

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/conversation/generate`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: text,
          conversationId: chatId,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    if (!response.body) {
      throw new Error("ReadableStream not supported in this browser");
    }

    // Handle the SSE stream
    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split('\n').filter(line => line.trim() !== '');

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.replace('data: ', '');
          
          // Handle both regular messages and [DONE] signal
          if (data === '[DONE]') {
            setIsTyping(false);
            return;
          }

          try {
            const parsed = JSON.parse(data);
            const content = parsed?.content || '';

            if (content) {
              fullResponse += content;
              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === assistantId
                    ? { ...msg, content: fullResponse }
                    : msg
                )
              );
            }
          } catch (err) {
            console.error("Error parsing JSON:", err, data);
          }
        }
      }
    }
  } catch (err) {
    console.error("Error during streaming fetch:", err);
    // Add error message to UI
    setMessages((prev) => [
      ...prev,
      { 
        id: Date.now() + 2, 
        role: "assistant", 
        content: "Sorry, I encountered an error. Please try again." 
      },
    ]);
  } finally {
    setIsTyping(false);
  }
};

const handleSend = () => sendPrompt(prompt);

    return (
        <div className="w-full min-h-screen bg-[#FAFAFA] pb-[150px]">
            <div className="max-w-[756px] mx-auto px-4 flex flex-col gap-6 pt-10">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`relative group text-sm whitespace-pre-line px-4 py-3 rounded-[12px] ${msg.role === "user"
                                ? "bg-[#F4F4F4] text-[#1C1C1C] self-end max-w-[80%]"
                                : "bg-white shadow-sm border border-[#EDEDED] text-[#1C1C1C] max-w-full"
                            }`}
                        style={{ fontFamily: "Inter" }}
                    >
                        {msg.content}

                        {msg.role === "assistant" && (
                            <div className="absolute -bottom-8 left-3 flex gap-4 items-center text-[#73726E] text-xs opacity-80 group-hover:opacity-100 transition">
                                 <button
                                    className="hover:text-black"
                                    onClick={() => navigator.clipboard.writeText(msg.content)}
                                >
                                
                                    <FiCopy className="w-4 h-4" />
                                </button>
                                <button className="hover:text-black">
                                    <FiThumbsUp className="w-4 h-4" />
                                </button>
                                <button className="hover:text-black">
                                    <FiThumbsDown className="w-4 h-4" />
                                </button>
                               
                            </div>
                        )}
                    </div>
                ))}

            </div>

            {/* Prompt at bottom */}
            <div className="fixed bottom-4 left-[206px] right-0 z-10 bg-[#FAFAFA]">
                <div className="max-w-[856px] mx-auto px-4">
                    <PromptSection
                        prompt={prompt}
                        setPrompt={setPrompt}
                        onSend={handleSend}
                        showHeading={false}
                        showLoadPrompt = {false}
                    />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
