import promptIcon from "../assets/Group 10 (1).svg";
import globe from "../assets/Icon Button.svg";
import agent from "../assets/material-symbols-light_theater-comedy-outline-rounded.svg";
import source from "../assets/Frame.svg";
import attach from "../assets/Vector (1).svg";
import mention from "../assets/At.svg";
import send from "../assets/submit-ai.svg";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import AllSourcesDropdown from "./AllSourcesDropdown";
import AskDropdown from "./AskDropdown";
import { useAuth } from "../providers/AuthProvider";
import { Dropdown } from "./Dropdown";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { getAllAgents, getAllPrompts } from "../services/api";

export function PromptSection({ onSend, showHeading = true }) {
  const [prompt, setPrompt] = useState("");
  const { user } = useAuth();
  const [savedPrompts, setSavedPrompts] = useState([]);
  const [showLoadPrompt, setShowLoadPrompt] = useState(true);
  const [isResearchMode, setIsResearchMode] = useState(false);
  const [webSearch, setWebSearch] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState({});
  const [agents, setAgents] = useState([]);
  const [agentModal, setAgentModal] = useState(false);
  const agentRef = useRef(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const { pathname } = useLocation();

  const fetchData = async () => {
    const prompts = await getAllPrompts();
    const { agents } = await getAllAgents();
    setSavedPrompts(prompts);
    setAgents(agents);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (agentRef.current && !agentRef.current.contains(event.target)) {
        setAgentModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (prompt === "") setShowLoadPrompt(true);
    else setShowLoadPrompt(false);
  }, [prompt]);

  const toggleMode = () => {
    setIsResearchMode(!isResearchMode);
  };

  return (
    <div className="w-full   flex justify-center items-center">
      <div className="w-full max-w-[756px] font-inter">
        {/* Greeting */}
        {showHeading && (
          <div className="flex justify-center items-center mb-4 gap-2">
            <img src={promptIcon} alt="Prompt Icon" className="w-7 h-7" />
            <h1 className="text-[24px] leading-[70px] font-semibold text-[#1C1C1C] -tracking-normal">
              Good evening, {user?.name}
            </h1>
          </div>
        )}
        {/* Prompt Box */}
        <div
          className="w-full h-[132px] bg-white rounded-[12px] px-4 py-3 flex flex-col justify-between"
          style={{
            boxShadow: "0px 0px 0px 1px rgba(0, 0, 0, 0.05)",
          }}
        >
          {/* Top Row - Input Prompt */}
          <div className="flex items-center gap-2 text-[13px] text-[#888870] font-medium">
            {showLoadPrompt && (
              <Dropdown
                options={savedPrompts.map((p) => ({
                  value: p.content,
                  label: p.name,
                }))}
                placeholder="Load prompt"
                className="whitespace-nowrap"
                buttonClassName=" text-[14px] font-medium text-[#73726E] bg-transparent border-none shadow-none p-0 hover:bg-transparent focus:ring-0"
                optionClassName="text-[14px] text-[#73726E] hover:bg-gray-100"
                menuClassName="border border-gray-200 mt-1"
                iconClassName="w-4 h-4 "
                onChange={(value) => setPrompt(value)}
              />
            )}{" "}
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  onSend();
                }
              }}
              placeholder="Or, Ask, find anything from your workspace or legal info..."
              className="text-sm placeholder:text-[#46444073] text-[#32302C] font-medium w-full outline-none bg-transparent"
            />
          </div>

          {/* Bottom Row - Controls */}
          <div className="flex justify-between items-center text-sm text-[#6C6C6C]">
            <div className="flex items-center gap-[6px]">
              {/* Toggle between Ask and Research */}
              {!pathname.includes("chat") && (
                <div className="flex items-center pr-[2px] bg-[#0000000A] rounded-lg text-sm font-medium relative ">
                  {isResearchMode ? (
                    <div
                      onClick={toggleMode}
                      className={`relative z-10 px-[9px] font-normal text-[14px] py-1 cursor-pointer transition-colors duration-300 ${isResearchMode ? "text-[#32302C]" : "text-[#32302C] bg-white border-r border-[#0000000A] rounded-l-lg"}`}
                    >
                      Ask
                    </div>
                  ) : (
                    <div className="relative z-10 flex items-center">
                      <AskDropdown />
                    </div>
                  )}
                  <div
                    onClick={toggleMode}
                    className={`relative z-10 px-[9px] pt-[2px] pb-[2px] cursor-pointer transition-colors duration-300 ${isResearchMode ? "text-[#32302C] bg-white rounded-r-lg" : "text-[#32302C8A] bg-transparent"}`}
                  >
                    Research
                  </div>
                </div>
              )}

              <div
                ref={agentRef}
                className="flex items-center tracking-[-4%] leading-[120%] relative px-[8px] py-[4px] gap-1 text-[14px]  font-medium text-[#73726E]"
              >
                {!selectedAgent.id && <img src={agent} className="w-5" />}

                <span
                  onClick={() => setAgentModal((prev) => !prev)}
                  className="flex gap-1 cursor-pointer"
                >
                  {selectedAgent.id ? (
                    <span className="flex gap-1">
                      <img
                        src={selectedAgent.picture}
                        className="w-[18px] rounded-sm aspect-square"
                        alt=""
                      />{" "}
                      <p>{selectedAgent.name}</p>
                    </span>
                  ) : (
                    <span>Agents</span>
                  )}
                  {agentModal ? (
                    <FiChevronUp className="w-4 h-4 text-[#51493C52]" />
                  ) : (
                    <FiChevronDown className="w-4 h-4 text-[#51493C52]" />
                  )}
                </span>
                {agentModal && (
                  <div
                    className={`absolute ${pathname.includes("chat") ? "bottom-[2.5rem]" : "top-full"}  left-0 z-50 w-[294px] bg-white rounded-[8px] border border-[#E7E6E4] 
shadow-lg p-[6px] mt-2`}
                  >
                    {agents.map((agent) => (
                      <div
                        key={agent.id}
                        className={`group px-[10px] py-[5.5px] flex gap-1 items-center text-[14px] font-medium text-[#5F5E5B] rounded-md cursor-pointer hover:bg-gray-100 ${selectedAgent.Id === agent.id
                            ? "bg-gray-100 font-medium"
                            : ""
                          } `}
                        onClick={() => {
                          setSelectedAgent(agent);
                          setAgentModal(false);
                        }}
                      >
                        <img
                          src={agent.picture}
                          className="w-5 rounded-md aspect-square"
                          alt=""
                        />
                        <p>{agent.name}</p>
                      </div>
                    ))}
                    <div
                      key={99999}
                      className={`group px-[10px] py-[5.5px] flex  items-center text-[14px] font-medium text-[#5F5E5B] rounded-md cursor-pointer hover:bg-gray-100  `}
                      onClick={() => {
                        setSelectedAgent({});
                        setAgentModal(false);
                      }}
                    >
                      <p>None</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3 items-center">
              {!selectedAgent.id && (
                <div
                  onClick={() => setWebSearch((prev) => !prev)}
                  className={`cursor-pointer transition-opacity ${webSearch ? "opacity-100" : "opacity-70"}`}
                >
                  <img src={globe} className="w-7 h-7" />
                </div>
              )}
              <div className="flex items-center gap-1">
                <AllSourcesDropdown />
              </div>
              <img src={attach} className="w-4" />
              <img src={mention} className="w-5 h-5" />
              <button disabled={submitLoading}>
                {" "}
                <img
                  src={send}
                  className={`w-6 h-6 cursor-pointer ${submitLoading && "opacity-70"}`}
                  onClick={async () => {
                    const config = {
                      research: isResearchMode,
                      webSearch: webSearch,
                      agent: {
                        id: selectedAgent.id || "",
                      },
                    };
                    setSubmitLoading(true);
                    if (pathname === "/dashboard" || pathname === "/home") {
                      await onSend(prompt, config);
                    } else await onSend(prompt, setPrompt, config);
                    setSubmitLoading(false);
                  }}
                  alt="Send"
                />{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
