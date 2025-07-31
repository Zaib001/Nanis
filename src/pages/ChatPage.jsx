import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { PromptSection } from "../components/PromptSection";
import { FiThumbsUp, FiThumbsDown, FiCopy } from "react-icons/fi";
import { getConversationMessages } from "../services/api";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import Markdown from "react-markdown";

export default function ChatPage() {
  const { chatId } = useParams();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const initialPrompt = query.get("q") || "";
  const webSearch = query.get("ws") || "";
  const research = query.get("r") || "";
  const agentId = query.get("agentId") || "";

  const removeQuery = () => {
    // Check if there's a query string
    if (location.search) {
      // Navigate to the same path without query string
      navigate(location.pathname, { replace: true });
    }
  };

  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  // Load conversation messages from backend
  useEffect(() => {
    if (!chatId) return;

    // If there's an initial prompt, trigger stream
    if (initialPrompt) {
      const config = {
        research: research === "true",
        webSearch: webSearch === "true",
        agent: {
          id: agentId,
        },
      };
      sendPrompt(initialPrompt, null, config);
    } else {
      getConversationMessages(chatId)
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data.messages)) {
            setMessages(data.messages);
          }
        });
    }
  }, [chatId]);

  const sendPrompt = async (text, setPrompt = null, config) => {
    if (!text || !text.trim()) return;

    if (!chatId) {
      console.error("No chatId available");
      return;
    }

    // Add user message to UI immediately
    const userMsg = { id: Date.now(), role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    if (!initialPrompt) setPrompt("");
    setIsTyping(true);

    // Create placeholder for assistant response
    const assistantId = Date.now() + 1;
    setMessages((prev) => [
      ...prev,
      { id: assistantId, role: "bot", content: "" },
    ]);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/conversation/generate`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            prompt: text,
            conversationId: chatId,
            config,
          }),
        },
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
        const lines = chunk.split("\n").filter((line) => line.trim() !== "");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.replace("data: ", "");

            if (data === "[DONE]") {
              setIsTyping(false);
              return;
            }

            try {
              const parsed = JSON.parse(data);
              const content = parsed?.content || "";
              const citations = parsed?.citations || [];

              setMessages((prev) => {
                return prev.map((msg) =>
                  msg.id === assistantId
                    ? {
                      ...msg,
                      content: msg.content + content,
                      citations: [...(msg.citations || []), ...citations],
                    }
                    : msg,
                );
              });
            } catch (err) {
              console.error("Error parsing JSON:", err, data);
            }
          }
        }
      }
      removeQuery();
    } catch (err) {
      console.error("Error during streaming fetch:", err);
      // Add error message to UI
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 2,
          role: "bot",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  // Create a component for citation buttons
  const CitationButton = ({ index, uris }) => {
    return (
      <div className="relative inline-block group">
        <button className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 text-xs flex items-center justify-center hover:bg-blue-200 ml-1">
          {index}
        </button>
        <div className="absolute hidden group-hover:block bottom-full left-0 mb-2 w-64 p-2 bg-white shadow-lg rounded-md border border-gray-200 z-10">
          <div className="text-xs font-medium text-gray-700 mb-1">Sources:</div>
          {uris.map((uri, i) => (
            <a
              key={i}
              href={uri}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-xs text-blue-600 hover:underline truncate mb-1"
            >
              {uri}
            </a>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="w-[826px] mx-auto pr-[55px]  font-inter min-h-screen bg-transparent text-[#32302C] text-[14px] font-medium leading-[20px] tracking-[-4%] pb-[150px]">
      <div className="w-full mx-auto  flex flex-col gap-6 pt-10 pb-20">
        {messages.map((msg) => {
          let content = msg.content || "";
          const citationMatches = [];
          // Extract citation markers like [1], [2], etc.
          if (msg.citations && msg.citations.length > 0) {
            content = content.replace(/\[(\d+)\]/g, (match, index) => {
              citationMatches.push(Number(index) - 1); // Convert to 0-based index
              return ""; // Remove the marker from text
            });
          }
          console.log({ text: msg.content });
          return (
            <div
              key={msg.id}
              className={`relative group text-wrap text-sm whitespace-pre-line px-4 py-3 rounded-xl ${msg.role === "user"
                  ? "bg-[#F5F5F5]  self-end max-w-[80%]"
                  : "bg-white    max-w-[80%]"
                }`}
              style={{ fontFamily: "Inter" }}
            >
              <Markdown
                children={msg.content}
                components={{
                  code(props) {
                    const { children, className, node, ...rest } = props;
                    const match = /language-(\w+)/.exec(className || "");
                    return match ? (
                      <SyntaxHighlighter
                        {...rest}
                        PreTag="div"
                        children={String(children).replace(/\n$/, "")}
                        language={match[1]}
                        style={dark}
                      />
                    ) : (
                      <code {...rest} className={className}>
                        {children}
                      </code>
                    );
                  },
                  // Add a span renderer to handle citations
                  span(props) {
                    if (
                      props.node.properties?.className?.includes("citation")
                    ) {
                      const index = parseInt(props.children[0]);
                      const citation = msg.citations?.find((c) =>
                        c.indices.includes(index - 1),
                      );
                      if (citation) {
                        return (
                          <CitationButton index={index} uris={citation.uris} />
                        );
                      }
                    }
                    return <span {...props} />;
                  },
                }}
              />
              {/* Render citation buttons at their positions */}
              {msg.role === "bot" && msg.citations?.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {msg.citations.map((citation, i) => (
                    <div key={i} className="flex items-center">
                      {citation.indices.map((index) => (
                        <CitationButton
                          key={index}
                          index={index + 1}
                          uris={citation.uris}
                        />
                      ))}
                    </div>))}
                </div>
              )}
              {msg.role === "bot" && (
                <div className="absolute -bottom-8 left-3 flex gap-4 items-center text-[#73726E] text-xs opacity-80 group-hover:opacity-100 transition">
                  <button
                    className="hover:text-black flex gap-1"
                    onClick={() => {
                      navigator.clipboard.writeText(msg.content);
                    }}
                  >
                    <FiCopy className="w-4 h-4" /> {"Copy"}
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
          );
        })}
      </div>

      {/* Prompt at bottom */}
      <div className="fixed w-fit mx-auto rounded-lg pb-10 bottom-0 left-[175px] right-0 z-10 bg-white h-[180px]">
        <div className="w-[800px]  ">
          <PromptSection
            onSend={sendPrompt}
            showHeading={false}
            showLoadPrompt={false}
          />
        </div>
      </div>
    </div>
  );
}
