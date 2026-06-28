import { useState } from "react";
import { BellRing, Trash2, RefreshCw, Sparkles, CheckCircle, Clock, ExternalLink } from "lucide-react";
import { WatchedItem } from "../types";

interface WatchlistDashboardProps {
  watchlist: WatchedItem[];
  onRemoveWatch: (id: string) => void;
  onCheckAlerts: () => Promise<void>;
  onSimulateDiscount: () => void;
  checkingAlerts: boolean;
  isDarkMode?: boolean;
}

export default function WatchlistDashboard({
  watchlist,
  onRemoveWatch,
  onCheckAlerts,
  onSimulateDiscount,
  checkingAlerts,
  isDarkMode = false
}: WatchlistDashboardProps) {
  const [editingId, setEditingId] = useState<string | null>(null);

  return (
    <div className={`backdrop-blur-md rounded-[2rem] p-6 shadow-sm border transition-all duration-300 hover:shadow-md ${
      isDarkMode 
        ? "bg-slate-900/50 border-slate-800/60 shadow-slate-950/20" 
        : "bg-white/40 border-white/40"
    }`} id="watchlist-dashboard">
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b transition-all duration-300 ${
        isDarkMode ? "border-slate-800/60" : "border-white/20"
      }`}>
        
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-2xl relative border shadow-sm transition-all duration-300 ${
            isDarkMode 
              ? "bg-amber-950/40 text-amber-400 border-amber-800/30" 
              : "bg-amber-100/60 text-amber-600 border-amber-200/40 shadow-sm"
          }`}>
            <BellRing className="w-6 h-6 animate-swing" />
            {watchlist.some(item => item.triggered) && (
              <span className={`absolute -top-1 -right-1 w-3.5 h-3.5 bg-rose-500 rounded-full border-2 animate-bounce ${
                isDarkMode ? "border-slate-900" : "border-white"
              }`}></span>
            )}
          </div>
          <div>
            <h2 className={`text-xl font-bold transition-all duration-300 ${isDarkMode ? "text-indigo-100" : "text-indigo-950"}`}>لوحة مراقبة الأسعار وتنبيهات الخصومات</h2>
            <p className={`text-xs mt-0.5 font-medium transition-all duration-300 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>تابع السلع المفضلة لديك وسنخطرك فور هبوط سعرها إلى السعر المستهدف</p>
          </div>
        </div>

        {watchlist.length > 0 && (
          <div className="flex items-center gap-2">
            
            {/* Simulation button */}
            <button
              onClick={onSimulateDiscount}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border shadow-sm transition-all duration-300 ${
                isDarkMode 
                  ? "bg-slate-800 hover:bg-slate-750 text-indigo-300 border-slate-700/40" 
                  : "bg-white/60 hover:bg-indigo-100/60 text-indigo-700 border-indigo-100/40"
              }`}
              title="محاكاة خصم مفاجئ لتجربة الإشعارات"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>محاكاة خصم موسمى</span>
            </button>

            {/* Manual Check now */}
            <button
              onClick={onCheckAlerts}
              disabled={checkingAlerts}
              className={`px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-all flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed shadow-md ${
                isDarkMode ? "shadow-indigo-950/50" : "shadow-indigo-100"
              }`}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${checkingAlerts ? "animate-spin" : ""}`} />
              <span>{checkingAlerts ? "جاري الفحص بالذكاء الاصطناعي..." : "افحص الأسعار الآن"}</span>
            </button>

          </div>
        )}
      </div>

      {watchlist.length === 0 ? (
        <div className="py-12 px-4 text-center" id="empty-watchlist-state">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border shadow-inner transition-all duration-300 ${
            isDarkMode ? "bg-slate-850/40 text-slate-500 border-slate-800/40" : "bg-white/60 text-slate-400 border-white/40 animate-pulse"
          }`}>
            <BellRing className="w-8 h-8" />
          </div>
          <h3 className={`font-bold text-base transition-all duration-300 ${isDarkMode ? "text-indigo-100" : "text-indigo-950"}`}>لا توجد منتجات تحت المراقبة حالياً</h3>
          <p className={`text-xs mt-1 max-w-sm mx-auto leading-relaxed font-medium transition-all duration-300 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
            ابحث عن السلعة التي ترغب بها، ثم اضغط على زر <strong>"تنبيه هبوط السعر"</strong> في جدول المتاجر لتظهر هنا وسنتابعها لك بالذكاء الاصطناعي!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5" id="watchlist-items-grid">
          {watchlist.map((item) => {
            const hasDropped = item.currentPrice <= item.targetPrice;
            const isAlertTriggered = item.triggered;

            return (
              <div
                key={item.id}
                className={`rounded-2xl border p-5 transition-all relative overflow-hidden transition-all duration-300 ${
                  isAlertTriggered
                    ? (isDarkMode 
                        ? "bg-gradient-to-tr from-emerald-950/20 via-slate-900/60 to-slate-900/40 backdrop-blur-md border-emerald-500 shadow-md ring-1 ring-emerald-500/20 text-slate-100" 
                        : "bg-gradient-to-tr from-emerald-50/40 via-white/70 to-white/40 backdrop-blur-md border-emerald-300 shadow-md ring-1 ring-emerald-300/20")
                    : (isDarkMode 
                        ? "bg-slate-900/40 backdrop-blur-md border-slate-800/60 hover:border-indigo-500/30 hover:shadow-md text-slate-100" 
                        : "bg-white/50 backdrop-blur-md border-white/40 hover:border-indigo-200/60 hover:shadow-md")
                }`}
                id={`watch-card-${item.id}`}
              >
                {/* Visual Accent for Triggered Alerts */}
                {isAlertTriggered && (
                  <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-500"></div>
                )}

                {/* Header & Delete */}
                <div className="flex justify-between items-start gap-3 mb-3">
                  <div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border transition-all duration-300 ${
                      isDarkMode 
                        ? "bg-indigo-950/60 text-indigo-300 border-indigo-900/30" 
                        : "bg-indigo-100/60 text-indigo-700 border-indigo-200/40"
                    }`}>
                      {item.country}
                    </span>
                    <h3 className={`font-bold text-base mt-1.5 line-clamp-1 transition-all duration-300 ${isDarkMode ? "text-slate-100" : "text-indigo-950"}`}>{item.name}</h3>
                    <p className={`text-[10px] mt-0.5 flex items-center gap-1 font-semibold transition-all duration-300 ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>
                      <Clock className="w-3 h-3" />
                      آخر فحص: {new Date(item.lastChecked).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  <button
                    onClick={() => onRemoveWatch(item.id)}
                    className={`p-1.5 rounded-lg text-slate-400 hover:text-rose-500 transition-all shrink-0 ${
                      isDarkMode ? "hover:bg-rose-950/20" : "hover:bg-rose-50"
                    }`}
                    title="حذف من المراقبة"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Best Store found */}
                <div className={`rounded-xl p-3 mb-4 flex items-center justify-between text-xs shadow-sm border transition-all duration-300 ${
                  isDarkMode 
                    ? "bg-slate-950/40 border-slate-800/40 text-slate-300" 
                    : "bg-white/60 border-white/40 text-slate-700"
                }`}>
                  <div>
                    <span className={`block text-[9px] font-bold ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>أرخص متجر حالياً</span>
                    <span className={`font-bold ${isDarkMode ? "text-slate-200" : "text-indigo-950"}`}>{item.bestStore}</span>
                  </div>
                  {item.storeUrl && (
                    <a
                      href={item.storeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`font-bold flex items-center gap-0.5 transition-all duration-300 ${
                        isDarkMode ? "text-indigo-300 hover:text-indigo-200" : "text-indigo-600 hover:text-indigo-700"
                      }`}
                    >
                      <span>زيارة</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>

                {/* Comparison Prices */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className={`border p-2.5 rounded-xl shadow-sm transition-all duration-300 ${
                    isDarkMode ? "bg-slate-950/40 border-slate-800/40" : "bg-white/60 border-white/40"
                  }`}>
                    <span className={`block text-[10px] font-bold ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>السعر الحالي المكتشف</span>
                    <span className={`font-black text-sm transition-all duration-300 ${
                      isAlertTriggered ? "text-emerald-500" : (isDarkMode ? "text-slate-200" : "text-slate-800")
                    }`}>
                      {item.currentPrice.toLocaleString()} {item.currency}
                    </span>
                  </div>
                  <div className={`border p-2.5 rounded-xl shadow-sm transition-all duration-300 ${
                    isDarkMode ? "bg-indigo-950/10 border-indigo-900/10" : "bg-indigo-50/40 border-indigo-100/20"
                  }`}>
                    <span className={`block text-[10px] font-bold ${isDarkMode ? "text-indigo-300" : "text-indigo-400"}`}>سعرك المستهدف للخصم</span>
                    <span className={`font-black text-sm transition-all duration-300 ${isDarkMode ? "text-indigo-300" : "text-indigo-700"}`}>
                      {item.targetPrice.toLocaleString()} {item.currency}
                    </span>
                  </div>
                </div>

                {/* Alert/Status message */}
                {isAlertTriggered ? (
                  <div className={`border rounded-xl p-3 flex items-start gap-2 text-xs shadow-sm transition-all duration-300 ${
                    isDarkMode 
                      ? "bg-emerald-950/20 border-emerald-900/20 text-emerald-200" 
                      : "bg-emerald-100/40 border-emerald-200/50 text-emerald-900"
                  }`} id={`alert-message-${item.id}`}>
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div className="leading-relaxed">
                      <span className={`font-bold block ${isDarkMode ? "text-emerald-300" : "text-emerald-800"}`}>🚨 لقد توفر خصم رائع!</span>
                      <span className="font-medium">{item.alertMessage || "السعر الحالي أقل من السعر المستهدف!"}</span>
                    </div>
                  </div>
                ) : (
                  <div className={`border rounded-xl p-3 flex items-start gap-2 text-xs shadow-sm transition-all duration-300 ${
                    isDarkMode 
                      ? "bg-slate-950/40 border-slate-800/40 text-slate-400" 
                      : "bg-white/60 border-white/40 text-slate-500"
                  }`}>
                    <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <div className="leading-relaxed font-medium">
                      <span>{item.alertMessage || "السعر لا يزال أعلى من سعرك المستهدف. نحن نراقبه من أجلك..."}</span>
                    </div>
                  </div>
                )}

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
