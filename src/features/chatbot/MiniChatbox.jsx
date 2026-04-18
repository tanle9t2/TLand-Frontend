import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useAuth } from "../../context/AuthContext";
import useChat from "./useChat";
import toast from "react-hot-toast";
import SyncLoader from "react-spinners/SyncLoader";
import { IoChatbubblesOutline, IoCloseOutline, IoSendSharp } from "react-icons/io5";
import { RiRobot2Line } from "react-icons/ri";
import { BsHouseDoor } from "react-icons/bs";
import AIAvatar from "./AIAvatar";
import PredictPriceCard from "./PredictPriceCard"
import PropertyCard from "./PropertyCard";
import BankLoadCard from "./BankLoadCard";
import FinancialAdviceCard from "./FinancialAdviceCard";

const SUGGESTIONS = ["Tui cần hỗ trợ mua nhà", "Tình hình bất động sản TP. Hồ Chí Minh", "Nhà phố mặt tiền quận 1"]

export default function MiniChatbox() {
    const { authenticated } = useAuth();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const { isPending, createChat } = useChat();
    const [expanded, setExpanded] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        if (expanded) {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isPending, expanded]);

    useEffect(() => {
        if (expanded) {
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }, [expanded]);

    const sendMessage = async () => {
        if (!input.trim()) {
            toast.error("Vui lòng nhập nội dung");
            return;
        }
        createChat({ input, messages }, {
            onSuccess: (data) => {
                const { answer } = data;
                setMessages((prev) => [...prev, { human: input, ai: answer }]);
                setInput("");
            }
        });
    };
    const handleQuickChat = (ans) => {
        setInput(ans)
        inputRef.current?.focus();
    }
    if (!authenticated) return null;
    const mdComponents = {
        p: ({ children }) => <p className="m-0 leading-relaxed">{children}</p>,
        ul: ({ children }) => <ul className="list-disc pl-4 mt-1.5 space-y-1">{children}</ul>,
        ol: ({ children }) => <ol className="list-decimal pl-4 mt-1.5 space-y-1">{children}</ol>,
        strong: ({ children }) => <strong className="font-semibold text-rose-700">{children}</strong>,
    };
    return (
        <div className="fixed bottom-6 text-3xl right-6 z-50 flex flex-col items-end gap-4">
            <div
                className={`
                    w-[480px] bg-white rounded-3xl shadow-2xl border border-gray-100
                    flex flex-col overflow-hidden
             
                    transition-all duration-300 ease-out origin-bottom-right
                    ${expanded
                        ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 scale-95 translate-y-4 pointer-events-none"
                    }
                `}
                style={{ maxHeight: expanded ? "600px" : "0px", minHeight: expanded ? "600px" : "0px" }}
            >

                <div className="flex items-center gap-3 px-5 py-4 bg-rose-600 text-white flex-shrink-0">
                    <div className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center">
                        <RiRobot2Line size={24} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="font-bold leading-tight">Trợ lý BĐS AI</p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="w-2 h-2 rounded-full bg-green-400 inline-block animate-pulse" />
                            <p className="text-lg text-rose-100">Đang trực tuyến</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setExpanded(false)}
                        className="p-2 cursor-pointer rounded-full hover:bg-white/20 transition-colors"
                    >
                        <IoCloseOutline size={22} />
                    </button>
                </div>


                <div className="flex-1 overflow-y-auto text-2xl  p-5 space-y-5 bg-gray-50" style={{ maxHeight: "520px" }}>


                    {messages.length === 0 && !isPending && (
                        <div className="flex flex-col items-center justify-center h-full gap-4 py-10 text-center">
                            <div className="w-20 h-20 rounded-full bg-rose-50 border-2 border-rose-100 flex items-center justify-center text-rose-500">
                                <BsHouseDoor size={36} />
                            </div>
                            <div>
                                <p className="font-bold text-gray-700 text-lg">Xin chào! 👋</p>
                                <p className="text-gray-500  mt-2 leading-relaxed">
                                    Tôi là trợ lý AI chuyên về bất động sản.<br />
                                    Hỏi tôi về giá cả, vị trí, hay tư vấn tìm nhà!
                                </p>
                            </div>
                            <div className="flex flex-col gap-2 w-full">
                                {SUGGESTIONS.map((ans) => (
                                    <button
                                        key={ans}
                                        onClick={() => handleQuickChat(ans)}
                                        className=" text-rose-600 cursor-pointer bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl px-4 py-2 text-left transition-colors"
                                    >
                                        {ans}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {messages.map(({ ai, human }, idx) => (
                        <div key={idx} className="flex flex-col space-y-6">

                            <div className="flex justify-end">
                                <div className="max-w-[75%] bg-gray-100 rounded-2xl rounded-tr-sm px-5 py-3 text-gray-800 text-sm leading-relaxed shadow-sm">
                                    {human}
                                </div>
                            </div>

                            <div className="flex items-end gap-2.5">
                                <AIAvatar />
                                <div className="bg-white text-gray-800 px-5 py-4 rounded-3xl rounded-tl-sm max-w-[85%] sm:max-w-[80%] break-words shadow-sm border border-gray-100 leading-relaxed">
                                    {typeof ai === 'string' ? (
                                        <ReactMarkdown components={mdComponents}>
                                            {ai}
                                        </ReactMarkdown>
                                    ) : (
                                        <div className="space-y-4">
                                            {ai.message && (
                                                <ReactMarkdown components={mdComponents}>{ai.message}</ReactMarkdown>
                                            )}
                                            {ai.property && (
                                                <div className="mt-3 mb-3">
                                                    <PropertyCard property={ai.property} />
                                                </div>
                                            )}

                                            {ai.properties && ai.properties.length > 0 && (
                                                <div className="flex flex-col gap-4 mt-3 mb-3">
                                                    {ai.properties.map((prop, pIdx) => (
                                                        <PropertyCard key={prop.propertyId || pIdx} property={prop} />
                                                    ))}
                                                </div>
                                            )}

                                            {ai.priceEvaluation && (
                                                <PredictPriceCard priceEvaluation={ai.priceEvaluation} />
                                            )}

                                            {ai.agentAnalysis && (
                                                <div className="bg-blue-50/80 border border-blue-100 p-4 rounded-2xl flex items-start gap-3 mt-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mt-1 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                                                    <div>
                                                        <span className="font-bold text-blue-900 block text-sm mb-1 uppercase tracking-wider">Phân tích từ chuyên gia AI</span>
                                                        <div className="text-blue-800 text-sm leading-relaxed">
                                                            {ai.agentAnalysis}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {ai.loanPackages && ai.loanPackages.length > 0 && (
                                                <BankLoadCard loanPackages={ai.loanPackages} />
                                            )}


                                            {ai.financialAdvice && (
                                                <FinancialAdviceCard financialAdvice={ai.financialAdvice} />
                                            )}

                                            {ai.followUpQuestion && (
                                                <div className="pt-2 border-t border-gray-100">
                                                    <ReactMarkdown components={mdComponents}>{ai.followUpQuestion}</ReactMarkdown>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}

                    {isPending && (
                        <div className="flex flex-col gap-3">
                            <div className="flex justify-end">
                                <div className="bg-rose-500 text-white text-2xl px-5 py-3 rounded-3xl rounded-tr-sm max-w-[80%] break-words shadow-sm opacity-80 leading-relaxed">
                                    {input}
                                </div>
                            </div>
                            <div className="flex items-end gap-2.5">
                                <AIAvatar />
                                <div className="bg-white px-5 py-4 rounded-3xl rounded-tl-sm shadow-sm border border-gray-100 flex items-center gap-1">
                                    <SyncLoader size={7} color="#e11d48" margin={2} />
                                </div>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>


                <div className="flex items-center text-2xl gap-3 px-4 py-4 border-t border-gray-100 bg-white flex-shrink-0">
                    <input
                        ref={inputRef}
                        type="text"
                        className="
                            flex-1 px-5 py-3 rounded-2xl
                            border border-gray-200 bg-gray-50
                            focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-400 focus:bg-white
                            disabled:opacity-60 disabled:cursor-not-allowed
                            transition-all placeholder:text-gray-400
                        "
                        placeholder="Nhập câu hỏi của bạn..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && !isPending && sendMessage()}
                        disabled={isPending}
                    />
                    <button
                        onClick={sendMessage}
                        disabled={isPending}
                        className="
                            w-12 h-12 rounded-2xl bg-rose-600 text-white flex-shrink-0
                            flex items-center justify-center
                            hover:bg-rose-700 active:scale-95
                            disabled:opacity-60 disabled:cursor-not-allowed
                            transition-all shadow-sm
                            cursor-pointer
                        "
                    >
                        <IoSendSharp size={20} />
                    </button>
                </div>
            </div>

            <button
                onClick={() => setExpanded((prev) => !prev)}
                className={`
                    cursor-pointer
                    flex items-center gap-2.5 px-6 py-3.5 rounded-full
                    font-semibold text-base text-white
                    shadow-xl hover:shadow-2xl
                    transition-all duration-200 active:scale-95
                    ${expanded ? "bg-gray-700 hover:bg-gray-800" : "bg-rose-600 hover:bg-rose-700"}
                `}
            >
                <IoChatbubblesOutline size={22} />
                <span>{expanded ? "Đóng chat" : "Tư vấn AI"}</span>
            </button>
        </div>
    );
}
