import { Calendar, Target, Info, Sparkles } from "lucide-react";
import { SeasonalTips } from "../types";

interface SeasonalRecommendationsProps {
  tips: SeasonalTips;
  currency: string;
}

export default function SeasonalRecommendations({ tips, currency }: SeasonalRecommendationsProps) {
  return (
    <div className="bg-indigo-950/70 backdrop-blur-md text-white rounded-[2rem] p-6 shadow-md border border-indigo-800/60 transition-all hover:shadow-lg" id="seasonal-tips-section">
      
      <div className="flex items-center gap-3 mb-5 border-b border-indigo-800/40 pb-4">
        <div className="bg-indigo-500/20 p-2.5 rounded-2xl text-sky-300 border border-indigo-500/30">
          <Calendar className="w-6 h-6 animate-pulse" />
        </div>
        <div>
          <h2 className="text-xl font-bold bg-gradient-to-r from-sky-300 to-indigo-200 bg-clip-text text-transparent">التوقعات ومواسم التخفيضات الذكية</h2>
          <p className="text-xs text-indigo-200 mt-0.5 font-medium">تحليل الذكاء الاصطناعي للمواسم والأسعار المستهدفة للسلعة</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="tips-grid">
        
        {/* Recommended target price */}
        <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex flex-col justify-between" id="tip-target-price">
          <div>
            <div className="flex items-center gap-2 text-sky-300 font-bold mb-2">
              <Target className="w-5 h-5" />
              <span className="text-sm">السعر المستهدف للانتظار</span>
            </div>
            <p className="text-xs text-indigo-150 leading-relaxed font-medium">
              ننصح بضبط تنبيه ومراقبة السعر عند هذا الحد أو أقل، حيث من المحتمل جداً أن تصله التخفيضات قريباً.
            </p>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-black text-sky-300">
              {tips.recommendedTargetPrice ? tips.recommendedTargetPrice.toLocaleString() : "---"}
            </span>
            <span className="text-xs font-bold text-sky-200 mr-1.5">{currency}</span>
          </div>
        </div>

        {/* Typical sale seasons */}
        <div className="bg-white/5 border border-white/10 p-5 rounded-2xl md:col-span-2 flex flex-col justify-between" id="tip-sale-seasons">
          <div>
            <div className="flex items-center gap-2 text-amber-300 font-bold mb-3">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm">أهم مواسم الخصم المتوقعة لهذا المنتج</span>
            </div>
            
            <div className="flex flex-wrap gap-2" id="seasons-list">
              {tips.typicalSaleSeasons && tips.typicalSaleSeasons.length > 0 ? (
                tips.typicalSaleSeasons.map((season, idx) => (
                  <span
                    key={idx}
                    className="bg-indigo-500/35 text-indigo-100 border border-indigo-500/40 text-xs px-3 py-1.5 rounded-xl font-bold"
                  >
                    📅 {season}
                  </span>
                ))
              ) : (
                <span className="text-indigo-200 text-xs font-medium">لا تتوفر مواسم تخفيضات محددة حالياً</span>
              )}
            </div>
          </div>

          <div className="mt-5 border-t border-white/5 pt-3.5 flex items-start gap-2.5 text-xs text-indigo-100 bg-indigo-900/40 p-3 rounded-xl border border-indigo-800/30">
            <Info className="w-4 h-4 text-sky-300 mt-0.5 shrink-0" />
            <p className="leading-relaxed font-medium">
              <strong className="text-white font-bold">نصيحة الخبير: </strong>
              {tips.advice || "تتبع السعر بانتظام من خلال لوحة المراقبة التلقائية لتحصل على إشعار فوري."}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
