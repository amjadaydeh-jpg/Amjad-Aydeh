import { CheckCircle2, AlertTriangle, Lightbulb, Flame } from "lucide-react";
import { SwotData } from "../types";

interface SwotAnalysisProps {
  swot: SwotData;
  productName: string;
  isDarkMode?: boolean;
}

export default function SwotAnalysis({ swot, productName, isDarkMode = false }: SwotAnalysisProps) {
  return (
    <div className="bg-indigo-950/80 backdrop-blur-xl border border-indigo-800/80 rounded-[2rem] p-6 text-white shadow-xl transition-all hover:shadow-2xl" id="swot-analysis-section">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-indigo-500/20 p-2.5 rounded-2xl text-indigo-300 border border-indigo-500/30">
          <Flame className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">تحليل SWOT لقرار الشراء</h2>
          <p className="text-xs text-indigo-200 mt-0.5">مستشار الشراء الذكي: الموازنة بين نقاط القوة والضعف والفرص المتاحة والمخاطر لمنتج "{productName}"</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5" id="swot-grid">
        
        {/* Strengths - نقاط القوة */}
        <div className="bg-white/5 p-5 rounded-2xl border border-white/10 transition-all hover:bg-white/10" id="swot-strengths">
          <div className="flex items-center gap-2 text-emerald-300 font-bold mb-3">
            <div className="bg-emerald-500/20 p-1.5 rounded-xl text-emerald-300 border border-emerald-500/30">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <span>نقاط القوة (Strengths)</span>
          </div>
          <ul className="space-y-2.5">
            {swot.strengths.map((strength, idx) => (
              <li key={idx} className="text-sm text-indigo-100 flex items-start gap-2 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0"></span>
                <span>{strength}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Weaknesses - نقاط الضعف */}
        <div className="bg-white/5 p-5 rounded-2xl border border-white/10 transition-all hover:bg-white/10" id="swot-weaknesses">
          <div className="flex items-center gap-2 text-rose-300 font-bold mb-3">
            <div className="bg-rose-500/20 p-1.5 rounded-xl text-rose-300 border border-rose-500/30">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <span>نقاط الضعف (Weaknesses)</span>
          </div>
          <ul className="space-y-2.5">
            {swot.weaknesses.map((weakness, idx) => (
              <li key={idx} className="text-sm text-indigo-100 flex items-start gap-2 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 shrink-0"></span>
                <span>{weakness}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Opportunities - الفرص */}
        <div className="bg-white/5 p-5 rounded-2xl border border-white/10 transition-all hover:bg-white/10" id="swot-opportunities">
          <div className="flex items-center gap-2 text-sky-300 font-bold mb-3">
            <div className="bg-sky-500/20 p-1.5 rounded-xl text-sky-300 border border-sky-500/30">
              <Lightbulb className="w-5 h-5" />
            </div>
            <span>الالفرص الذهبية (Opportunities)</span>
          </div>
          <ul className="space-y-2.5">
            {swot.opportunities.map((opportunity, idx) => (
              <li key={idx} className="text-sm text-indigo-100 flex items-start gap-2 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-2 shrink-0"></span>
                <span>{opportunity}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Threats - التهديدات */}
        <div className="bg-white/5 p-5 rounded-2xl border border-white/10 transition-all hover:bg-white/10" id="swot-threats">
          <div className="flex items-center gap-2 text-amber-300 font-bold mb-3">
            <div className="bg-amber-500/20 p-1.5 rounded-xl text-amber-300 border border-amber-500/30">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <span>التهديدات والمخاطر (Threats)</span>
          </div>
          <ul className="space-y-2.5">
            {swot.threats.map((threat, idx) => (
              <li key={idx} className="text-sm text-indigo-100 flex items-start gap-2 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0"></span>
                <span>{threat}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}
