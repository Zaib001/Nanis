import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { PromptSection } from "../components/PromptSection";
import { FiThumbsUp, FiThumbsDown, FiCopy,FiChevronDown } from "react-icons/fi";

export default function ChatPage() {
    const { chatId } = useParams();
    const query = new URLSearchParams(useLocation().search);
    const initialPrompt = query.get("q") || "";

    const [prompt, setPrompt] = useState("");
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);

    // Dummy response logic
    const getDummyResponse = (promptText) => {
        if (promptText.toLowerCase().includes("contract")) {
            return "Here's a dummy contract template with clauses like Parties, Payment, Termination, etc.";
        } else if (promptText.toLowerCase().includes("documents")) {
            return "Keep these documents: contract, receipts, change orders, and warranty certificates.";
        } else {
            return `Thanks for your message: "${promptText}". We're generating a dummy response.`;
        }
    };

    // Load initial prompt from URL
    useEffect(() => {
        if (initialPrompt) {
            const userMsg = { id: 1, role: "user", content: initialPrompt };
            const assistantId = 2;
            const assistantContent = getDummyResponse(initialPrompt);

            setMessages([
                userMsg,
                { id: assistantId, role: "assistant", content: "" }
            ]);

            setIsTyping(true);

            let i = 0;
            const interval = setInterval(() => {
                setMessages((prev) =>
                    prev.map((msg) =>
                        msg.id === assistantId
                            ? { ...msg, content: assistantContent.slice(0, i + 1) }
                            : msg
                    )
                );
                i++;
                if (i >= assistantContent.length) {
                    clearInterval(interval);
                    setIsTyping(false);
                }
            }, 15);
        }
    }, [initialPrompt]);

    // Handle new prompt
    const handleSend = () => {
        if (!prompt.trim()) return;

        const userMsg = { id: Date.now(), role: "user", content: prompt };
        const assistantId = Date.now() + 1;
        const assistantContent = getDummyResponse(prompt);

        setMessages((prev) => [...prev, userMsg, { id: assistantId, role: "assistant", content: "" }]);
        setPrompt("");
        setIsTyping(true);

        let i = 0;
        const interval = setInterval(() => {
            setMessages((prev) =>
                prev.map((msg) =>
                    msg.id === assistantId
                        ? { ...msg, content: assistantContent.slice(0, i + 1) }
                        : msg
                )
            );
            i++;
            if (i >= assistantContent.length) {
                clearInterval(interval);
                setIsTyping(false);
            }
        }, 15);
    };

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
    );
}
