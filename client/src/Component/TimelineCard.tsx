import { Calendar, TrendingUp, TrendingDown, Minus, Sparkles } from "lucide-react";
import type { TimelineEvent } from "../types/types";

const commonImage = "https://imgs.search.brave.com/3sNIqqoOSw67nu3Yb2695VgWero7OR2uk5fApqVrkGI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbmti/b3RkZXNpZ24uY29t/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDI1/LzA0L25va2lhLWJy/YW5kaW5nLWluLTIw/MTYtMTAyNHg1NzYu/d2VicA";

interface TimelineCardProps {
  data: TimelineEvent;
  isActive: boolean;
}

export function TimelineCard({ data, isActive }: TimelineCardProps) {
  const isPrediction = data.type === "prediction";

  const getSentimentIcon = () => {
    switch (data.sentiment) {
      case "positive": return <TrendingUp className="w-5 h-5 text-emerald-600" />;
      case "negative": return <TrendingDown className="w-5 h-5 text-rose-600" />;
      default: return <Minus className="w-5 h-5 text-amber-500" />;
    }
  };

  const getSentimentStyles = () => {
    switch (data.sentiment) {
      case "positive": return "bg-emerald-50 border-emerald-200 text-emerald-700";
      case "negative": return "bg-rose-50 border-rose-200 text-rose-700";
      default: return "bg-amber-50 border-amber-200 text-amber-700";
    }
  };

  return (
    <div 
      className={`
        relative w-[340px] md:w-[480px] h-[580px] bg-white
        rounded-3xl overflow-hidden transition-all duration-500
        ${isActive 
          ? `shadow-2xl scale-100 ring-1 ${isPrediction ? 'ring-purple-200 shadow-purple-500/20' : 'ring-blue-200 shadow-blue-500/20'}` 
          : 'shadow-lg ring-1 ring-slate-100 opacity-60 grayscale-[0.5]'
        }
      `}
    >
      {/* Image Section */}
      <div className="h-[260px] w-full relative overflow-hidden group">
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent z-10" />
        
        {/* Floating Badges */}
        <div className="absolute top-5 left-5 z-20 flex gap-2">
           <div className="flex items-center gap-2 px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-lg shadow-sm">
            <Calendar className="w-4 h-4 text-slate-500" />
            <span className="text-sm font-bold text-slate-800">{data.year}</span>
          </div>
        </div>

        {/* Type Badge */}
        <div className="absolute top-5 right-5 z-20">
            <span className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm backdrop-blur-md
              ${isPrediction 
                ? 'bg-purple-100/90 text-purple-700 border border-purple-200' 
                : 'bg-blue-100/90 text-blue-700 border border-blue-200'
              }`}>
              {isPrediction ? 'Future' : 'History'}
            </span>
        </div>

        {/* Impact Score */}
        {data.impactScore !== undefined && (
          <div className="absolute bottom-4 right-5 z-20">
             <div className="flex items-center gap-1.5 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full border border-white/10">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span className="text-sm font-bold text-white">{data.impactScore}</span>
             </div>
          </div>
        )}

        <img 
          src={data?.imageUrl?.url || commonImage} 
          alt={data.title} 
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
        />
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col h-80">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="text-2xl font-bold text-slate-900 leading-tight line-clamp-2">
            {data.title}
          </h3>
          <div className={`p-2 rounded-xl border ${getSentimentStyles()}`}>
            {getSentimentIcon()}
          </div>
        </div>

        <p className="text-slate-600 text-sm leading-relaxed line-clamp-4 mb-auto">
          {data.description}
        </p>

        <div className="space-y-4 mt-4">
          {/* Market Value */}
          {data?.marketValue && (
            <div className="flex items-center justify-between p-3 gap-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-xs hidden  font-semibold text-slate-800 uppercase">MarketValue</span>
              <span className="text-xs font-bold text-slate-900">{data.marketValue}</span>
            </div>
          )}

          {/* Tags */}
          {data?.tags && data.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {data.tags.slice(0, 3).map((tag, index) => (
                <span 
                  key={index} 
                  className="px-2.5 py-1 text-xs font-medium bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Active Indicator Line */}
      {isActive && (
        <div className={`absolute bottom-0 left-0 w-full h-1.5 ${isPrediction ? 'bg-purple-500' : 'bg-blue-500'}`} />
      )}
    </div>
  );
}