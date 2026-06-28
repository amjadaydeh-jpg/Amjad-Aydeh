import { ArrowUpDown, Star, Shield, Truck, Bell, ExternalLink, Award } from "lucide-react";
import { StoreOffer } from "../types";

interface ComparisonTableProps {
  stores: StoreOffer[];
  onAddWatch: (store: StoreOffer) => void;
  watchlistNames: string[];
  isDarkMode?: boolean;
}

export default function ComparisonTable({ stores, onAddWatch, watchlistNames, isDarkMode = false }: ComparisonTableProps) {
  // Sort stores by total price (price + shipping cost)
  const sortedStores = [...stores].sort((a, b) => {
    const totalA = a.price + a.shippingCost;
    const totalB = b.price + b.shippingCost;
    return totalA - totalB;
  });

  return (
    <div className={`backdrop-blur-md border rounded-[2rem] p-6 shadow-sm transition-all duration-300 hover:shadow-md ${
      isDarkMode 
        ? "bg-slate-900/50 border-slate-800/60 shadow-slate-950/20" 
        : "bg-white/40 border-white/40"
    }`} id="comparison-table-section">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-2xl transition-all duration-300 ${
            isDarkMode ? "bg-slate-800 text-indigo-300" : "bg-indigo-100 text-indigo-600"
          }`}>
            <ArrowUpDown className="w-6 h-6" />
          </div>
          <div>
            <h2 className={`text-xl font-bold transition-all duration-300 ${isDarkMode ? "text-indigo-100" : "text-indigo-950"}`}>جدول مقارنة الأسعار والخيارات</h2>
            <p className={`text-xs mt-0.5 font-medium transition-all duration-300 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>مرتبة تلقائياً من الأرخص إجمالاً (سعر المنتج + الشحن)</p>
          </div>
        </div>
      </div>

      {/* Desktop View Table */}
      <div className={`hidden lg:block overflow-x-auto rounded-2xl border transition-all duration-300 ${
        isDarkMode ? "border-slate-800/60" : "border-white/30"
      }`} id="desktop-table-container">
        <table className="w-full text-right border-collapse">
          <thead>
            <tr className={`border-b text-xs font-bold transition-all duration-300 ${
              isDarkMode 
                ? "bg-slate-900/80 border-slate-800/60 text-indigo-300" 
                : "bg-white/50 border-white/20 text-indigo-900"
            }`}>
              <th className="py-4 px-5">المتجر وعنوان التوصيل</th>
              <th className="py-4 px-4 text-center">التقييم</th>
              <th className="py-4 px-4 text-center">سعر السلعة</th>
              <th className="py-4 px-4 text-center">تكلفة الشحن</th>
              <th className={`py-4 px-4 text-center text-xs font-bold transition-all duration-300 ${
                isDarkMode ? "text-indigo-200 bg-indigo-950/20" : "text-indigo-700 bg-indigo-50/50"
              }`}>السعر الإجمالي</th>
              <th className="py-4 px-4 text-center">مدة التوصيل</th>
              <th className="py-4 px-4">ملاحظات وضمانات</th>
              <th className="py-4 px-5 text-center">الإجراء</th>
            </tr>
          </thead>
          <tbody className={`divide-y text-sm transition-all duration-300 ${
            isDarkMode ? "divide-slate-800/40 text-slate-300" : "divide-white/20 text-slate-700"
          }`}>
            {sortedStores.map((store, index) => {
              const totalPrice = store.price + store.shippingCost;
              const isFirst = index === 0;
              const isAlreadyWatched = watchlistNames.includes(store.name.toLowerCase());

              return (
                <tr key={index} className={`transition-all duration-200 ${
                  isDarkMode 
                    ? "hover:bg-slate-800/40" 
                    : "hover:bg-white/40"
                } ${isFirst ? (isDarkMode ? 'bg-amber-500/5' : 'bg-amber-100/10') : ''}`} id={`store-row-${index}`}>
                  
                  {/* Store Name & Badges */}
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-2">
                      <span className={`font-bold text-base transition-all duration-300 ${isDarkMode ? "text-slate-100" : "text-indigo-950"}`}>{store.name}</span>
                      {isFirst && (
                        <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold flex items-center gap-0.5 transition-all duration-300 ${
                          isDarkMode 
                            ? "bg-amber-500/10 text-amber-300 border-amber-500/20" 
                            : "bg-amber-100 text-amber-800 border-amber-200"
                        }`}>
                          <Award className="w-3 h-3" /> الخيار الأوفر
                        </span>
                      )}
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold transition-all duration-300 ${
                        store.type === "local" 
                          ? (isDarkMode ? "bg-blue-950/60 text-blue-300 border border-blue-900/30" : "bg-blue-100/60 text-blue-700 border border-blue-200")
                          : (isDarkMode ? "bg-purple-950/60 text-purple-300 border border-purple-900/30" : "bg-purple-100/60 text-purple-700 border border-purple-200")
                      }`}>
                        {store.type === "local" ? "محلي" : "شحن دولي"}
                      </span>
                    </div>
                  </td>

                  {/* Rating */}
                  <td className="py-4 px-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className={`font-bold text-xs transition-all duration-300 ${isDarkMode ? "text-slate-200" : "text-slate-800"}`}>{store.reliabilityRating.toFixed(1)}</span>
                    </div>
                  </td>

                  {/* Base Price */}
                  <td className={`py-4 px-4 text-center font-bold transition-all duration-300 ${isDarkMode ? "text-slate-200" : "text-slate-800"}`}>
                    {store.price.toLocaleString()} {store.currency}
                  </td>

                  {/* Shipping Cost */}
                  <td className={`py-4 px-4 text-center text-xs font-medium transition-all duration-300 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                    {store.shippingCost === 0 ? (
                      <span className={`font-bold px-2 py-0.5 rounded border transition-all duration-300 ${
                        isDarkMode 
                          ? "text-emerald-300 bg-emerald-950/40 border-emerald-900/30" 
                          : "text-emerald-700 bg-emerald-100/60 border-emerald-200"
                      }`}>مجاني</span>
                    ) : (
                      `+ ${store.shippingCost.toLocaleString()} ${store.currency}`
                    )}
                  </td>

                  {/* Total Price */}
                  <td className={`py-4 px-4 text-center font-extrabold text-base transition-all duration-300 ${
                    isDarkMode ? "text-indigo-300 bg-indigo-950/20" : "text-indigo-800 bg-indigo-50/40"
                  }`}>
                    {totalPrice.toLocaleString()} {store.currency}
                  </td>

                  {/* Delivery Time */}
                  <td className="py-4 px-4 text-center text-xs font-semibold">
                    <div className={`flex items-center justify-center gap-1 transition-all duration-300 ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
                      <Truck className="w-3.5 h-3.5" />
                      <span>{store.deliveryTime}</span>
                    </div>
                  </td>

                  {/* Notes & Guarantees */}
                  <td className={`py-4 px-4 text-xs max-w-xs font-medium transition-all duration-300 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                    <div className="flex items-start gap-1">
                      <Shield className={`w-3.5 h-3.5 mt-0.5 shrink-0 transition-all duration-300 ${isDarkMode ? "text-slate-500" : "text-slate-400"}`} />
                      <span className="leading-relaxed">{store.notes}</span>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-5 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => onAddWatch(store)}
                        disabled={isAlreadyWatched}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 shadow-sm transition-all duration-300 ${
                          isAlreadyWatched
                            ? (isDarkMode 
                                ? "bg-slate-800/80 text-slate-500 border border-slate-700/40 cursor-not-allowed" 
                                : "bg-white/20 text-slate-400 border border-white/40 cursor-not-allowed")
                            : "bg-indigo-600 hover:bg-indigo-700 text-white hover:shadow-lg hover:shadow-indigo-100"
                        }`}
                      >
                        <Bell className="w-3.5 h-3.5" />
                        {isAlreadyWatched ? "مراقب حالياً" : "تنبيه هبوط السعر"}
                      </button>

                      {store.url && (
                        <a
                          href={store.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`p-1.5 rounded-xl border transition-all duration-300 flex items-center justify-center shadow-sm ${
                            isDarkMode 
                              ? "bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700/60" 
                              : "bg-white/60 hover:bg-white text-slate-700 border-white/40"
                          }`}
                          title="زيارة المتجر"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </td>

                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile & Tablet Card Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden" id="mobile-cards-container">
        {sortedStores.map((store, index) => {
          const totalPrice = store.price + store.shippingCost;
          const isFirst = index === 0;
          const isAlreadyWatched = watchlistNames.includes(store.name.toLowerCase());

          return (
            <div 
              key={index} 
              className={`p-5 rounded-2xl border transition-all duration-300 ${
                isFirst 
                  ? (isDarkMode 
                      ? "bg-gradient-to-tr from-amber-950/20 to-slate-900/60 backdrop-blur-md border-amber-500/30 shadow-sm" 
                      : "bg-gradient-to-tr from-amber-50/30 to-white/40 backdrop-blur-md border-amber-300/40 shadow-sm")
                  : (isDarkMode 
                      ? "bg-slate-900/50 backdrop-blur-md border-slate-800/60 text-slate-100" 
                      : "bg-white/40 backdrop-blur-md border-white/30")
              }`}
              id={`store-card-${index}`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex flex-wrap items-center gap-1.5">
                  <h3 className={`font-bold text-lg transition-all duration-300 ${isDarkMode ? "text-slate-100" : "text-indigo-950"}`}>{store.name}</h3>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold transition-all duration-300 ${
                    store.type === "local" 
                      ? (isDarkMode ? "bg-blue-950/60 text-blue-300 border border-blue-900/30" : "bg-blue-100/60 text-blue-700 border border-blue-200")
                      : (isDarkMode ? "bg-purple-950/60 text-purple-300 border border-purple-900/30" : "bg-purple-100/60 text-purple-700 border border-purple-200")
                  }`}>
                    {store.type === "local" ? "محلي" : "دولي"}
                  </span>
                  {isFirst && (
                    <span className={`text-[9px] px-2 py-0.5 rounded-full border font-extrabold transition-all duration-300 ${
                      isDarkMode 
                        ? "bg-amber-500/10 text-amber-300 border-amber-500/20" 
                        : "bg-amber-100 text-amber-800 border-amber-200"
                    }`}>
                      الأرخص إجمالاً
                    </span>
                  )}
                </div>
                <div className={`flex items-center gap-1 border py-0.5 px-2 rounded-lg shrink-0 transition-all duration-300 ${
                  isDarkMode ? "bg-slate-800/60 border-slate-700/40 text-slate-200" : "bg-white/60 border-white/40"
                }`}>
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-xs">{store.reliabilityRating.toFixed(1)}</span>
                </div>
              </div>

              {/* Pricing breakdown */}
              <div className={`grid grid-cols-3 gap-2 border p-3 rounded-xl mb-4 transition-all duration-300 ${
                isDarkMode ? "bg-slate-950/40 border-slate-800/40" : "bg-white/50 border-white/30"
              }`}>
                <div className="text-center">
                  <span className={`block text-[10px] font-bold transition-all duration-300 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>سعر السلعة</span>
                  <span className={`font-bold text-sm transition-all duration-300 ${isDarkMode ? "text-slate-200" : "text-slate-800"}`}>{store.price.toLocaleString()} {store.currency}</span>
                </div>
                <div className={`text-center border-x transition-all duration-300 ${isDarkMode ? "border-slate-800/60" : "border-white/40"}`}>
                  <span className={`block text-[10px] font-bold transition-all duration-300 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>الشحن</span>
                  <span className={`font-bold text-sm transition-all duration-300 ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
                    {store.shippingCost === 0 ? "مجاني" : `${store.shippingCost.toLocaleString()} ${store.currency}`}
                  </span>
                </div>
                <div className="text-center">
                  <span className={`block text-[10px] font-bold transition-all duration-300 ${isDarkMode ? "text-indigo-400" : "text-indigo-600"}`}>الإجمالي</span>
                  <span className={`font-black text-base transition-all duration-300 ${isDarkMode ? "text-indigo-300" : "text-indigo-700"}`}>{totalPrice.toLocaleString()} {store.currency}</span>
                </div>
              </div>

              {/* Delivery and Guarantee details */}
              <div className={`space-y-2 text-xs mb-4 font-medium transition-all duration-300 ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
                <div className="flex items-center gap-1.5">
                  <Truck className={`w-4 h-4 shrink-0 transition-all duration-300 ${isDarkMode ? "text-slate-500" : "text-slate-400"}`} />
                  <span>وقت التوصيل: <strong>{store.deliveryTime}</strong></span>
                </div>
                <div className="flex items-start gap-1.5">
                  <Shield className={`w-4 h-4 mt-0.5 shrink-0 transition-all duration-300 ${isDarkMode ? "text-slate-500" : "text-slate-400"}`} />
                  <span>{store.notes}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onAddWatch(store)}
                  disabled={isAlreadyWatched}
                  className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm transition-all duration-300 ${
                    isAlreadyWatched
                      ? (isDarkMode 
                          ? "bg-slate-800/80 text-slate-500 border border-slate-700/40 cursor-not-allowed" 
                          : "bg-white/20 text-slate-400 border border-white/40 cursor-not-allowed")
                      : "bg-indigo-600 hover:bg-indigo-700 text-white"
                  }`}
                >
                  <Bell className="w-4 h-4" />
                  {isAlreadyWatched ? "مراقب حالياً" : "تنبيه هبوط السعر"}
                </button>
                {store.url && (
                  <a
                    href={store.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2.5 rounded-xl border transition-all duration-300 flex items-center justify-center shrink-0 shadow-sm ${
                      isDarkMode 
                        ? "bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700/60" 
                        : "bg-white/60 hover:bg-white text-slate-700 border-white/40"
                    }`}
                    title="زيارة المتجر"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
