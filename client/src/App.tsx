import React, { useState, useRef, useEffect } from "react";
import { useApiCalls } from "./Store/api.calls";
import { Search, Loader2, ShipWheel, History, TrendingUp } from "lucide-react";
import type { TimelineEvent } from "./types/types";
import { AI_DATA } from "./sample/dummydata";
import { TimelineCarousel } from "./Component/TimelineCarousel";
import { Footer } from "./Component/Footer";

//example prompts
const EXAMPLE_PROMPTS = [
  "How did Zomato grow from an idea to a billion-dollar company?",
  "What changed India's economy after 1991 liberalization?",
  "The rise and fall of Nokia",
  "What will AI jobs look like in India by 2035?",
];

export default function App() {
  const [query, setQuery] = useState("");
  const [activeData, setActiveData] = useState<TimelineEvent[]>(AI_DATA);
  const [topic, setTopic] = useState("Rise of Artificial Intelligence");
  const debounceTimerRef = useRef<number | null>(null);
  const isSearchingRef = useRef(false);

  const { getData, loading, data } = useApiCalls();

  useEffect(() => {
    if (data && data.length > 0) {
      setActiveData(data);
    }
  }, [data]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    executeSearch(query);
  };

  // 2. Refactored search logic to work with both Form Submit and Badge Click
  const executeSearch = (searchQuery: string) => {
    if (!searchQuery.trim() || isSearchingRef.current) return;

    // Update UI immediately
    setQuery(searchQuery);

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Short debounce for smoother UX
    debounceTimerRef.current = setTimeout(async () => {
      isSearchingRef.current = true;
      setTopic(searchQuery);
      await getData(searchQuery);
      isSearchingRef.current = false;
    }, 300);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col relative overflow-hidden">
      {/* Light Mode Elegant Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-400 opacity-20 blur-[100px]"></div>
        <div className="absolute right-0 bottom-0 -z-10 h-[310px] w-[310px] rounded-full bg-purple-400 opacity-20 blur-[100px]"></div>
      </div>

      {/* Header Section */}
      <div className="relative z-50 flex flex-col items-center pt-10 pb-6 px-4">
        {/* Logo */}
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

        {/* 3.Example Prompt Badges */}
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

        {/* Current Topic Indicator (Only show if we have active data and it's not the default) */}
        {topic && (
          <div className="mt-4 flex items-center gap-2 px-4 py-1.5 bg-blue-50 border border-blue-100 rounded-full">
            <History className="w-3 h-3 text-blue-500" />
            <span className="text-xs text-blue-600 font-medium">
              Current Timeline: <span className="font-bold">{topic}</span>
            </span>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative z-10 flex flex-col justify-center min-h-[600px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
            <p className="text-slate-500 animate-pulse">
              Generating timeline events...
            </p>
          </div>
        ) : (
          <TimelineCarousel events={activeData} />
        )}
      </div>

      <Footer activeData={activeData} />
    </div>
  );
}
