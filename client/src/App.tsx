import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  Loader2,
  ShipWheel,
  History,
  TrendingUp,
  MessageSquare,
} from "lucide-react";
import type { TimelineEvent } from "./types/types";
import { AI_DATA } from "./sample/dummydata";
import { TimelineCarousel } from "./Component/TimelineCarousel";
import { Footer } from "./Component/Footer";

// Example prompts
const EXAMPLE_PROMPTS = [
  "How did Zomato grow from an idea to a billion-dollar company?",
  "What changed India's economy after 1991 liberalization?",
  "The rise and fall of Nokia",
  "What will AI jobs look like in India by 2035?",
];

export default function App() {
  const [query, setQuery] = useState("");
  //start with dummy data for better UX
  const [activeData, setActiveData] = useState<TimelineEvent[]>(AI_DATA);
  const [topic, setTopic] = useState("Rise of Artificial Intelligence");

  // State for Streaming
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState("");
  const [chatResponse, setChatResponse] = useState(""); // For non-timeline answers
  const [isChatMode, setIsChatMode] = useState(false);

  const debounceTimerRef = useRef<number | null>(null);
  const eventSourceRef = useRef<EventSource | null>(null);
  const isSearchingRef = useRef(false);
  const baseUrl = import.meta.env.PROD ? "" : "http://localhost:5000"

  //call healthcheck on every 14 min
  const fetchHealthCheck = async () => {
    await fetch(`${baseUrl}/health`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });
  };

  useEffect(() => {
    fetchHealthCheck();
    const healthCheckInterval = setInterval(() => {
      fetchHealthCheck();
    }, 14 * 60 * 1000);
    return () => {
      clearInterval(healthCheckInterval);
    };
  });

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
      if (eventSourceRef.current) eventSourceRef.current.close();
    };
  }, []);

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!query.trim()) return;
    executeSearch(query);
  };

  const executeSearch = (searchQuery: string) => {
    if (!searchQuery.trim() || isSearchingRef.current) return;

    setQuery(searchQuery);

    // Close existing stream if any
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      startStream(searchQuery);
    }, 300);
  };

  const startStream = (searchQuery: string) => {
    isSearchingRef.current = true;
    setLoading(true);
    setProgress("Initializing connection...");
    setChatResponse("");
    setIsChatMode(false);

    // We clear data immediately to show we are working on new stuff
    setActiveData([]);

    const eventSource = new EventSource(
      `${baseUrl}/chat/stream?query=${encodeURIComponent(
        searchQuery
      )}`
    );
    eventSourceRef.current = eventSource;

    eventSource.onmessage = (event) => {
      const parsedData = JSON.parse(event.data);

      switch (parsedData.type) {
        case "start":
          setProgress("Analyzing your request...");
          break;

        case "intent":
          setProgress("Understanding intent...");
          break;

        case "timeline":
          // Metadata about the timeline (e.g. entity name)
          if (parsedData.data?.entity) {
            setTopic(parsedData.data.entity);
          }
          setProgress("Structuring timeline...");
          break;

        case "image":
          // Update progress text with specific image status
          setProgress(parsedData.message || "Fetching images...");
          break;

        case "event":
          //Append new event to existing list
          setActiveData((prev) => {
            // Avoid duplicates just in case
            if (prev.find((e) => e.id === parsedData.data.id)) return prev;
            return [...prev, parsedData.data];
          });
          break;

        case "chat":
          // Handle general chat response
          setIsChatMode(true);
          setChatResponse(parsedData.data?.message || parsedData.data || "");
          setLoading(false);
          break;

        case "done":
          setLoading(false);
          setProgress("");
          isSearchingRef.current = false;
          eventSource.close();
          break;

        case "error":
          console.error("Stream Error:", parsedData.message);
          setLoading(false);
          isSearchingRef.current = false;
          eventSource.close();
          break;
      }
    };

    eventSource.onerror = () => {
      console.error("EventSource failed");
      setLoading(false);
      isSearchingRef.current = false;
      eventSource.close();
    };
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-400 opacity-20 blur-[100px]"></div>
        <div className="absolute right-0 bottom-0 -z-10 h-[310px] w-[310px] rounded-full bg-purple-400 opacity-20 blur-[100px]"></div>
      </div>

      {/* Header Section */}
      <div className="relative z-50 flex flex-col items-center pt-10 pb-6 px-4">
        <div className="mb-8 flex items-center gap-3 animate-fade-in-down">
          <div className="p-2 bg-white rounded-xl shadow-sm border border-slate-200">
            <ShipWheel className="w-6 h-6 text-blue-600" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
            Timeline<span className="text-blue-600">AI</span>
          </h1>
        </div>

        {/* Search Bar */}
        <div className="w-full max-w-2xl z-20">
          <form onSubmit={handleSearch} className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative flex items-center bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden transition-all focus-within:ring-2 focus-within:ring-blue-500/20">
              <div className="pl-5 pr-3 text-slate-400">
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                ) : (
                  <Search className="w-5 h-5" />
                )}
              </div>

              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Describe an event..."
                className="w-full bg-transparent py-4 text-lg text-slate-800 placeholder:text-slate-400 focus:outline-none"
              />

              <button
                type="submit"
                disabled={loading}
                className="mx-2 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-xl transition-all flex items-center gap-2 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
              >
                Generate
                <ShipWheel className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>

        {/* Prompt Badges (Hidden while loading to reduce clutter) */}
        {!loading && (
          <div className="mt-6 w-full max-w-4xl flex flex-col items-center gap-3 animate-fade-in">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-2">
                Try asking:
              </span>
              {EXAMPLE_PROMPTS.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => executeSearch(prompt)}
                  className="group flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full shadow-sm hover:border-blue-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                >
                  <TrendingUp className="w-3 h-3 text-slate-400 group-hover:text-blue-500 transition-colors" />
                  <span className="text-sm text-slate-600 group-hover:text-blue-600 font-medium transition-colors">
                    {prompt}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Current Topic Indicator */}
        {!loading && topic && !isChatMode && activeData.length > 0 && (
          <div className="mt-4 flex items-center gap-2 px-4 py-1.5 bg-blue-50 border border-blue-100 rounded-full animate-fade-in">
            <History className="w-3 h-3 text-blue-500" />
            <span className="text-xs text-blue-600 font-medium">
              Current Timeline: <span className="font-bold">{topic}</span>
            </span>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative z-10 flex flex-col justify-center min-h-[600px]">
        {/* Loading State */}
        {loading && activeData.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 blur-xl opacity-20 animate-pulse"></div>
              <Loader2 className="w-12 h-12 animate-spin text-blue-600 relative z-10" />
            </div>
            <div className="flex flex-col items-center gap-1">
              <p className="text-slate-800 font-medium text-lg animate-pulse">
                {progress || "Initializing..."}
              </p>
              <p className="text-slate-400 text-sm">
                This might take a moment as we gather sources.
              </p>
            </div>
          </div>
        ) : isChatMode ? (
          /* Chat Mode View */
          <div className="flex items-center justify-center h-full px-4">
            <div className="max-w-2xl bg-white p-8 rounded-3xl shadow-xl border border-slate-100 flex gap-6 items-start animate-fade-in-up">
              <div className="p-3 bg-blue-50 rounded-2xl">
                <MessageSquare className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  AI Response
                </h3>
                <p className="text-slate-600 leading-relaxed text-lg">
                  {chatResponse}
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Timeline View */
          <div className="relative w-full h-full">
            {/* Streaming Indicator (if still loading but we have some data) */}
            {loading && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 z-40 bg-white/80 backdrop-blur-md px-4 py-1 rounded-full border border-blue-100 shadow-lg flex items-center gap-2">
                <Loader2 className="w-3 h-3 animate-spin text-blue-600" />
                <span className="text-xs font-bold text-blue-600">
                  {progress}
                </span>
              </div>
            )}
            <TimelineCarousel events={activeData} />
          </div>
        )}
      </div>

      {/* Only show footer if we have timeline data */}
      {!isChatMode && <Footer activeData={activeData} />}
    </div>
  );
}
