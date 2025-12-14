import { ShipWheel} from "lucide-react"
import type { TimelineEvent } from "../types/types"

export const Footer = ({activeData} : {activeData : TimelineEvent[]}) =>{

  if (!activeData || activeData.length === 0) return null;

  const historicalCount = activeData.filter(e => e.type === 'historical').length;
  const predictionCount = activeData.filter(e => e.type === 'prediction').length;
  const avgImpact = activeData.reduce((acc, e) => acc + (e.impactScore || 0), 0) / activeData.length;

    return (
      <div className="relative z-50 pb-6 px-4 md:px-6 mt-auto">
        <div className="max-w-5xl mx-auto bg-white/80 backdrop-blur-xl border border-slate-200 rounded-2xl p-6 shadow-xl shadow-slate-200/50">
          <div className="flex items-center justify-between mb-4">
             <h4 className="text-sm font-bold text-slate-700 flex items-center gap-2 ">
                <ShipWheel className="w-4 h-4 text-blue-500"/> Timeline Analysis
            </h4>
          </div>
         
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatBox label="Start Year" value={activeData[0]?.year} />
            <StatBox label="End Year" value={activeData[activeData.length - 1]?.year} />
            <StatBox label="Total Events" value={activeData.length} />
            <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
              <span className="block text-amber-600 font-mono text-2xl font-bold mb-1">{avgImpact.toFixed(0)}</span>
              <span className="text-xs text-amber-700/70 font-medium uppercase tracking-wider">Avg Impact</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></span>
              <span className="text-slate-600 font-medium">{historicalCount} Historical</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"></span>
              <span className="text-slate-600 font-medium">{predictionCount} Predictions</span>
            </div>
          </div>
        </div>
      </div>
    )
}

const StatBox = ({ label, value }: { label: string, value: string | number }) => (
    <div className="bg-green-50 p-4 rounded-xl border border-slate-100 hover:border-blue-200 transition-colors group">
      <span className="block text-slate-900 font-mono text-2xl font-bold mb-1 group-hover:text-blue-600 transition-colors">{value}</span>
      <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">{label}</span>
    </div>
);