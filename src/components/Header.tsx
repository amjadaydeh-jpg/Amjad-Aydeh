import { Globe, TrendingDown, ShoppingBag, Sun, Moon } from "lucide-react";
import { CountryConfig } from "../types";

interface HeaderProps {
  selectedCountry: CountryConfig;
  onCountryChange: (country: CountryConfig) => void;
  countries: CountryConfig[];
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export default function Header({ selectedCountry, onCountryChange, countries, isDarkMode, onToggleDarkMode }: HeaderProps) {
  return (
    <header className={`backdrop-blur-md border rounded-3xl shadow-sm relative overflow-hidden mt-6 mx-4 md:mx-6 lg:mx-8 transition-all duration-300 ${
      isDarkMode 
        ? "bg-slate-900/50 border-slate-800/60 text-slate-100 shadow-slate-950/20" 
        : "bg-white/40 border-white/40 text-indigo-950"
    }`} id="app-header">
      {/* Abstract Background Shapes */}
      <div className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl -mr-20 -mt-20 transition-colors duration-300 ${
        isDarkMode ? "bg-indigo-500/5" : "bg-indigo-500/10"
      }`}></div>
      <div className={`absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl -ml-20 -mb-20 transition-colors duration-300 ${
        isDarkMode ? "bg-rose-500/5" : "bg-rose-500/10"
      }`}></div>

      <div className="max-w-7xl mx-auto px-6 py-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-4" id="logo-container">
            <div className={`p-3 rounded-2xl shadow-lg flex items-center justify-center animate-pulse transition-all duration-300 ${
              isDarkMode 
                ? "bg-gradient-to-tr from-indigo-600 to-rose-500 shadow-indigo-950" 
                : "bg-gradient-to-tr from-indigo-500 to-rose-400 shadow-indigo-200"
            }`}>
              <ShoppingBag className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-tight bg-clip-text text-transparent transition-all duration-300 bg-gradient-to-r ${
                  isDarkMode ? "from-indigo-300 to-rose-300" : "from-indigo-800 to-rose-600"
                }`}>
                  البحث عن الأرخص
                </h1>
                <span className={`text-xs px-2.5 py-1 rounded-full border font-bold transition-all duration-300 ${
                  isDarkMode 
                    ? "bg-indigo-400/10 text-indigo-300 border-indigo-400/20" 
                    : "bg-indigo-600/10 text-indigo-700 border-indigo-600/20"
                }`}>
                  مستشار التسوق الذكي
                </span>
              </div>
              <p className={`text-sm mt-1 max-w-xl font-medium leading-relaxed transition-all duration-300 ${
                isDarkMode ? "text-slate-300" : "text-slate-600"
              }`}>
                قارن الأسعار الحقيقية، حلل خيارات الشراء بذكاء (SWOT)، واحصل على تنبيهات فورية عندما تهبط الأسعار في بلدك.
              </p>
            </div>
          </div>

          {/* Actions: Dark Mode Toggle & Country Selection Dropdown */}
          <div className="flex flex-wrap items-center gap-3 shrink-0" id="header-actions">
            
            {/* Dark Mode Toggle */}
            <button
              onClick={onToggleDarkMode}
              className={`p-3 rounded-2xl border transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
                isDarkMode 
                  ? "bg-slate-800/80 border-slate-700/60 text-amber-400 hover:bg-slate-800 hover:shadow-lg hover:shadow-amber-500/10" 
                  : "bg-white/60 border-white/40 text-indigo-600 hover:bg-white/95 hover:shadow-md hover:shadow-indigo-100"
              }`}
              aria-label="تبديل الوضع الليلي"
              title={isDarkMode ? "الوضع المضيء" : "الوضع الليلي"}
            >
              {isDarkMode ? (
                <>
                  <Sun className="w-5 h-5 animate-pulse" />
                  <span className="text-xs font-bold text-slate-200 hidden sm:inline">الوضع المضيء</span>
                </>
              ) : (
                <>
                  <Moon className="w-5 h-5" />
                  <span className="text-xs font-bold text-indigo-950 hidden sm:inline">الوضع الليلي</span>
                </>
              )}
            </button>

            {/* Country Selection Dropdown */}
            <div className={`flex items-center gap-3 p-3 rounded-2xl border shadow-sm transition-all duration-300 ${
              isDarkMode ? "bg-slate-800/60 border-slate-700/40 text-slate-100" : "bg-white/60 border-white/40 text-indigo-950"
            }`} id="country-selector-box">
              <div className={`p-2 rounded-xl transition-all duration-300 ${isDarkMode ? "bg-slate-700 text-indigo-300" : "bg-indigo-100 text-indigo-600"}`}>
                <Globe className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <label className={`text-[10px] font-bold transition-all duration-300 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>دولة البحث الحالية</label>
                <select
                  id="country-select"
                  value={selectedCountry.code}
                  onChange={(e) => {
                    const country = countries.find(c => c.code === e.target.value);
                    if (country) onCountryChange(country);
                  }}
                  className={`bg-transparent font-bold text-sm focus:outline-none cursor-pointer pr-1 py-0.5 transition-all duration-300 ${
                    isDarkMode ? "text-slate-100" : "text-indigo-950"
                  }`}
                >
                  {countries.map((country) => (
                    <option key={country.code} value={country.code} className={`font-medium ${
                      isDarkMode ? "bg-slate-900 text-slate-100" : "bg-white text-slate-800"
                    }`}>
                      {country.flag} {country.name} ({country.currency})
                    </option>
                  ))}
                </select>
              </div>
            </div>

          </div>

        </div>

        {/* Highlight Banner */}
        <div className={`mt-6 flex flex-wrap gap-4 text-xs border-t pt-4 transition-all duration-300 ${
          isDarkMode ? "border-slate-800/60 text-slate-300" : "border-indigo-100/40 text-slate-600"
        }`} id="header-stats">
          <div className={`flex items-center gap-1.5 py-1.5 px-3 rounded-lg border transition-all duration-300 ${
            isDarkMode ? "bg-slate-850/40 border-slate-800/30" : "bg-white/50 border-white/20"
          }`}>
            <TrendingDown className="w-4 h-4 text-emerald-500" />
            <span>فحص الأسعار في الوقت الفعلي باستخدام <strong>Google Search Grounding</strong></span>
          </div>
          <div className={`flex items-center gap-1.5 py-1.5 px-3 rounded-lg border transition-all duration-300 ${
            isDarkMode ? "bg-slate-850/40 border-slate-800/30" : "bg-white/50 border-white/20"
          }`}>
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping"></span>
            <span>مراقبة وتنبيهات الخصومات الموسمية الذكية</span>
          </div>
        </div>

      </div>
    </header>
  );
}
