import { useState, useEffect } from "react";
import { Search, Sparkles, TrendingDown, BookOpen, AlertCircle, RefreshCw, X, BellRing } from "lucide-react";
import Header from "./components/Header";
import ComparisonTable from "./components/ComparisonTable";
import SwotAnalysis from "./components/SwotAnalysis";
import SeasonalRecommendations from "./components/SeasonalRecommendations";
import WatchlistDashboard from "./components/WatchlistDashboard";
import { CountryConfig, SearchResult, WatchedItem, StoreOffer } from "./types";

const COUNTRIES: CountryConfig[] = [
  { code: "SA", name: "السعودية", flag: "🇸🇦", currency: "SAR" },
  { code: "EG", name: "مصر", flag: "🇪🇬", currency: "EGP" },
  { code: "AE", name: "الإمارات", flag: "🇦🇪", currency: "AED" },
  { code: "KW", name: "الكويت", flag: "🇰🇼", currency: "KWD" },
  { code: "JO", name: "الأردن", flag: "🇯🇴", currency: "JOD" }
];

const QUICK_SUGGESTIONS = [
  "آيفون 15 برو",
  "بلايستيشن 5",
  "سماعات آبل AirPods Pro",
  "تلفزيون سامسونج 55 بوصة"
];

const LOADER_QUOTES = [
  "جاري إشعال محركات البحث المتقدمة...",
  "نبحث في المتاجر المحلية والعالمية التي تتيح التوصيل لباب بيتك...",
  "نجمع الأسعار الحية من الإنترنت باستخدام تقنيات Grounding...",
  "نقارن تكلفة الشحن بذكاء لتحديد الخيار الأوفر الإجمالي...",
  "نصيغ تحليل SWOT استراتيجي لتقييم المخاطر والفرص لهذا المنتج...",
  "جاري حساب وتوقع أفضل سعر مستهدف وتنبيهات الخصم الموسمية..."
];

export default function App() {
  // 1. Core state
  const [selectedCountry, setSelectedCountry] = useState<CountryConfig>(COUNTRIES[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [watchlist, setWatchlist] = useState<WatchedItem[]>([]);
  const [checkingAlerts, setCheckingAlerts] = useState(false);
  
  // Elegant Dark Mode State
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem("find_cheapest_dark_mode");
    return saved === "true";
  });

  // Save dark mode state to local storage
  useEffect(() => {
    localStorage.setItem("find_cheapest_dark_mode", String(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Rotating loader quotes state
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  // Elegant in-app floating notifications/toast state
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);

  // Initialize watchlist from localStorage or pre-populate with attractive presets
  useEffect(() => {
    const saved = localStorage.getItem("find_cheapest_watchlist_v1");
    if (saved) {
      try {
        setWatchlist(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    } else {
      // 2 standard demo items to immediately highlight how the alert and notification center operates beautifully
      const demoItems: WatchedItem[] = [
        {
          id: "demo-1",
          name: "بلايستيشن 5 (PlayStation 5)",
          targetPrice: 1900,
          currentPrice: 2150,
          currency: "SAR",
          country: "السعودية",
          bestStore: "أمازون السعودية",
          lastChecked: new Date().toISOString(),
          triggered: false,
          alertMessage: "السعر الحالي هو 2150 ر.س. نراقبه حتى يهبط إلى 1900 ر.س."
        },
        {
          id: "demo-2",
          name: "شاحن أنكر 65 واط سريع",
          targetPrice: 120,
          currentPrice: 110,
          currency: "SAR",
          country: "السعودية",
          bestStore: "نون السعودية",
          lastChecked: new Date().toISOString(),
          triggered: true,
          alertMessage: "🎉 هبط السعر الآن في نون إلى 110 ر.س وهو أقل من سعرك المستهدف (120 ر.س)!"
        }
      ];
      setWatchlist(demoItems);
      localStorage.setItem("find_cheapest_watchlist_v1", JSON.stringify(demoItems));
    }
  }, []);

  // Save watchlist updates to localStorage
  const saveWatchlist = (updated: WatchedItem[]) => {
    setWatchlist(updated);
    localStorage.setItem("find_cheapest_watchlist_v1", JSON.stringify(updated));
  };

  // Rotating quote interval during search loading
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (searching) {
      interval = setInterval(() => {
        setCurrentQuoteIndex((prev) => (prev + 1) % LOADER_QUOTES.length);
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [searching]);

  // Toast auto-clear helper
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 4500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const showToastMessage = (message: string, type: "success" | "error" | "info" = "success") => {
    setToast({ message, type });
  };

  // Perform AI ground search & comparison
  const handleSearch = async (queryToSearch = searchQuery) => {
    const finalQuery = queryToSearch.trim();
    if (!finalQuery) {
      showToastMessage("الرجاء كتابة اسم سلعة للبحث عنها.", "error");
      return;
    }

    setSearching(true);
    setSearchResult(null);
    setCurrentQuoteIndex(0);

    try {
      const response = await fetch("/api/search-cheap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productName: finalQuery,
          country: selectedCountry.name,
          currency: selectedCountry.currency
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "فشل البحث من السيرفر.");
      }

      const data = await response.json();
      setSearchResult(data);
      showToastMessage(`عثرنا على أفضل عروض "${finalQuery}" بالذكاء الاصطناعي!`);
    } catch (error: any) {
      console.error(error);
      showToastMessage(error.message || "عذراً، فشل استدعاء الذكاء الاصطناعي. الرجاء التحقق من مفتاح Gemini الخاص بك في الإعدادات.", "error");
    } finally {
      setSearching(false);
    }
  };

  // Add product store to Watchlist
  const handleAddWatch = (store: StoreOffer) => {
    if (!searchResult) return;

    // Check if store already exists
    const isAlreadyWatched = watchlist.some(
      item => item.name.toLowerCase() === searchResult.productTitle.toLowerCase() && item.country === selectedCountry.name
    );

    if (isAlreadyWatched) {
      showToastMessage("هذا المنتج تحت المراقبة بالفعل في هذا البلد.", "info");
      return;
    }

    // Recommended default target price (e.g., 5-10% below current price or as returned by AI)
    const target = searchResult.seasonalTips.recommendedTargetPrice || Math.round(store.price * 0.9);

    const newItem: WatchedItem = {
      id: "watch-" + Date.now(),
      name: searchResult.productTitle,
      targetPrice: target,
      currentPrice: store.price,
      currency: store.currency,
      country: selectedCountry.name,
      bestStore: store.name,
      storeUrl: store.url || "",
      lastChecked: new Date().toISOString(),
      triggered: false,
      alertMessage: `السعر الحالي هو ${store.price} ${store.currency}. نراقبه حتى يهبط إلى ${target} ${store.currency}.`
    };

    saveWatchlist([newItem, ...watchlist]);
    showToastMessage(`تمت إضافة "${searchResult.productTitle}" لقائمة التنبيهات بنجاح.`);
  };

  const handleRemoveWatch = (id: string) => {
    const updated = watchlist.filter(item => item.id !== id);
    saveWatchlist(updated);
    showToastMessage("تمت الإزالة من المراقبة.");
  };

  // Run real-time background price check using Search Grounding
  const handleCheckAlerts = async () => {
    if (watchlist.length === 0) return;
    setCheckingAlerts(true);
    showToastMessage("جاري تدقيق أسعار السوق بالذكاء الاصطناعي...", "info");

    try {
      const response = await fetch("/api/check-alerts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ watchlist })
      });

      if (!response.ok) {
        throw new Error("فشل فحص الأسعار.");
      }

      const data = await response.json();
      saveWatchlist(data.updatedList);
      
      const triggeredCount = data.updatedList.filter((item: WatchedItem) => item.triggered).length;
      if (triggeredCount > 0) {
        showToastMessage(`🚨 عاجل! عثرنا على صفقات ممتازة لـ ${triggeredCount} من منتجاتك تحت المراقبة!`, "success");
      } else {
        showToastMessage("تم تحديث أسعار المراقبة بالكامل. لا توجد تنبيهات جديدة بعد.", "info");
      }
    } catch (e) {
      console.error(e);
      showToastMessage("حدث خطأ أثناء فحص الأسعار.", "error");
    } finally {
      setCheckingAlerts(false);
    }
  };

  // Simulate a sudden discount on one of the items to show users how alerts and notifications work flawlessly
  const handleSimulateDiscount = () => {
    if (watchlist.length === 0) return;

    // Pick a random untriggered watch item or the first item
    const untriggered = watchlist.find(item => !item.triggered) || watchlist[0];
    if (!untriggered) return;

    const discountPrice = Math.round(untriggered.targetPrice * 0.95); // 5% below target
    const updated = watchlist.map(item => {
      if (item.id === untriggered.id) {
        return {
          ...item,
          currentPrice: discountPrice,
          triggered: true,
          lastChecked: new Date().toISOString(),
          alertMessage: `🎉 عاجل! محاكاة التخفيضات الموسمية: تراجع السعر في ${item.bestStore} بشكل مفاجئ إلى ${discountPrice} ${item.currency} وهو أقل من سعرك المستهدف (${item.targetPrice} ${item.currency})!`
        };
      }
      return item;
    });

    saveWatchlist(updated);
    showToastMessage(`🚨 تنبيه فوري: تراجع سعر "${untriggered.name}" بشكل كبير! راجع التنبيهات في الأسفل.`, "success");
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 bg-gradient-to-br ${
      isDarkMode 
        ? "from-slate-950 via-indigo-950/65 to-slate-900" 
        : "from-blue-50 via-indigo-100 to-rose-100"
    }`} id="app-root">
      
      {/* 1. Header with Country Selection */}
      <Header
        selectedCountry={selectedCountry}
        onCountryChange={(country) => {
          setSelectedCountry(country);
          showToastMessage(`تم تغيير بلد التسوق إلى ${country.name}`);
        }}
        countries={COUNTRIES}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
      />

      {/* 2. Floating Toast Notification */}
      {toast && (
        <div className="fixed top-5 left-5 z-50 fade-in" id="toast-notification">
          <div className={`p-4 rounded-2xl shadow-xl flex items-center gap-3 border text-sm max-w-sm ${
            toast.type === "success" 
              ? "bg-emerald-900 text-white border-emerald-800"
              : toast.type === "error"
              ? "bg-rose-950 text-rose-100 border-rose-900"
              : "bg-indigo-950 text-sky-100 border-indigo-900"
          }`}>
            <div className={`p-1.5 rounded-lg ${
              toast.type === "success" 
                ? "bg-emerald-800 text-emerald-300" 
                : toast.type === "error" 
                ? "bg-rose-900 text-rose-300" 
                : "bg-indigo-900 text-sky-300"
            }`}>
              <BellRing className="w-4 h-4" />
            </div>
            <p className="font-semibold leading-relaxed">{toast.message}</p>
            <button onClick={() => setToast(null)} className="text-slate-400 hover:text-white shrink-0 mr-auto">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-8" id="main-content">
        
        {/* Search Panel Card */}
        <section className={`backdrop-blur-md rounded-[2.5rem] p-6 md:p-8 shadow-sm border transition-all duration-300 hover:shadow-md relative overflow-hidden ${
          isDarkMode ? "bg-slate-900/40 border-slate-800/60 shadow-slate-950/20" : "bg-white/40 border-white/40"
        }`} id="search-section">
          <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl transition-all duration-300 ${
            isDarkMode ? "bg-indigo-500/5" : "bg-indigo-500/10"
          }`}></div>
          
          <div className="relative z-10 max-w-2xl mx-auto text-center mb-6">
            <h2 className={`text-2xl font-extrabold flex items-center justify-center gap-2 transition-all duration-300 ${
              isDarkMode ? "text-indigo-100" : "text-indigo-950"
            }`}>
              <Search className={`w-6 h-6 transition-all duration-300 ${isDarkMode ? "text-indigo-400" : "text-indigo-600"}`} />
              <span>ابحث عن السلعة الأوفر الآن</span>
            </h2>
            <p className={`text-xs mt-1 font-semibold transition-all duration-300 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
              اكتب اسم السلعة بدقة (مثل ماركتها ونوعها) ليقوم مستشار الذكاء الاصطناعي بالبحث الحي وتفتيش الأسعار في متاجر {selectedCountry.name}.
            </p>
          </div>

          <div className="max-w-2xl mx-auto relative z-10" id="search-input-wrapper">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="مثال: آيفون 15 برو 256 جيجا، شاشة LG OLED 55..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className={`w-full pl-12 pr-4 py-3.5 backdrop-blur-sm border rounded-2xl font-bold transition-all text-right ${
                    isDarkMode 
                      ? "bg-slate-950/60 border-slate-800/50 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/70 focus:bg-slate-900/80" 
                      : "bg-white/60 border-white/40 text-indigo-950 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                  }`}
                  id="product-search-input"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-450" />
              </div>
              <button
                onClick={() => handleSearch()}
                disabled={searching}
                className={`bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-bold px-8 py-3.5 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg ${
                  isDarkMode ? "shadow-indigo-950/40" : "shadow-indigo-100 hover:shadow-indigo-200"
                }`}
                id="search-submit-btn"
              >
                {searching ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>جاري التفتيش...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>البحث والتحليل</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick Suggestions */}
            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs justify-center" id="quick-suggestions-box">
              <span className={`font-bold transition-all duration-300 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>مقترحات شائعة:</span>
              {QUICK_SUGGESTIONS.map((sug, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSearchQuery(sug);
                    handleSearch(sug);
                  }}
                  className={`py-1.5 px-3 rounded-xl border font-bold shadow-sm transition-all duration-300 ${
                    isDarkMode 
                      ? "bg-slate-800/60 hover:bg-slate-700/80 hover:text-indigo-300 text-slate-200 border-slate-700/50" 
                      : "bg-white/60 hover:bg-white hover:text-indigo-600 text-indigo-950 border-white/40"
                  }`}
                >
                  {sug}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Loading Sequence View */}
        {searching && (
          <section className={`backdrop-blur-md rounded-[2rem] p-12 text-center border shadow-sm flex flex-col items-center justify-center transition-all duration-300 ${
            isDarkMode ? "bg-slate-900/40 border-slate-800/60 shadow-slate-950/20" : "bg-white/40 border-white/40 shadow-sm"
          }`} id="loading-view">
            <div className="relative mb-6">
              <div className="w-16 h-16 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin"></div>
              <Sparkles className="w-6 h-6 text-amber-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
            </div>
            
            <h3 className={`text-lg font-bold mb-2 transition-all duration-300 ${isDarkMode ? "text-indigo-100" : "text-indigo-950"}`}>جاري استشارة الذكاء الاصطناعي وبحث الويب...</h3>
            
            <div className={`backdrop-blur-sm px-6 py-3.5 rounded-2xl border max-w-lg shadow-sm transition-all duration-300 ${
              isDarkMode ? "bg-slate-950/60 border-slate-800/40" : "bg-white/60 border-white/40"
            }`}>
              <p className={`text-sm font-bold animate-pulse leading-relaxed transition-all duration-300 ${isDarkMode ? "text-indigo-300" : "text-indigo-800"}`}>
                "{LOADER_QUOTES[currentQuoteIndex]}"
              </p>
            </div>
          </section>
        )}

        {/* 4. Active Search Results Section */}
        {searchResult && !searching && (
          <div className="space-y-8 fade-in" id="search-results-section">
            
            {/* Header info */}
            <div className={`backdrop-blur-md border p-6 rounded-[2rem] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all duration-300 ${
              isDarkMode ? "bg-slate-900/40 border-slate-800/60 shadow-slate-950/20" : "bg-white/40 border-white/40 shadow-sm"
            }`}>
              <div>
                <span className={`text-xs font-bold py-1 px-3 rounded-full border transition-all duration-300 ${
                  isDarkMode ? "text-indigo-300 bg-indigo-950/50 border-indigo-900/35" : "text-indigo-700 bg-indigo-100/60 border-indigo-200/40"
                }`}>
                  نتيجة البحث والتحليل الذكي لـ {selectedCountry.name}
                </span>
                <h3 className={`text-2xl font-black mt-2 transition-all duration-300 ${isDarkMode ? "text-slate-100" : "text-indigo-950"}`}>{searchResult.productTitle}</h3>
              </div>
              <div className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl border shadow-sm transition-all duration-300 ${
                isDarkMode ? "text-emerald-300 bg-emerald-950/45 border-emerald-900/35" : "text-emerald-850 bg-emerald-100/60 border-emerald-200/40 shadow-sm"
              }`}>
                <TrendingDown className="w-4 h-4 text-emerald-500" />
                <span>عثرنا على {searchResult.stores.length} متاجر تبيع السلعة وتشحن إليك</span>
              </div>
            </div>

            {/* Comparison Table */}
            <ComparisonTable
              stores={searchResult.stores}
              onAddWatch={handleAddWatch}
              watchlistNames={watchlist.map(w => w.bestStore.toLowerCase())}
              isDarkMode={isDarkMode}
            />

            {/* SWOT Cards Layout */}
            <SwotAnalysis
              swot={searchResult.swot}
              productName={searchResult.productTitle}
              isDarkMode={isDarkMode}
            />

            {/* Seasonal Tips & Ticker Price */}
            <SeasonalRecommendations
              tips={searchResult.seasonalTips}
              currency={selectedCountry.currency}
            />

            {/* Citations / Real Web Sources if any */}
            {searchResult.citations && searchResult.citations.length > 0 && (
              <div className={`backdrop-blur-md p-6 rounded-[2rem] border shadow-sm transition-all duration-300 ${
                isDarkMode ? "bg-slate-900/40 border-slate-800/60 shadow-slate-950/20" : "bg-white/40 border-white/40 shadow-sm"
              }`} id="search-citations-panel">
                <div className={`flex items-center gap-2 mb-3.5 transition-all duration-300 ${isDarkMode ? "text-indigo-200" : "text-indigo-950"}`}>
                  <BookOpen className="w-5 h-5 text-indigo-500" />
                  <h3 className="font-bold text-base">المصادر والمراجع المفتوحة المعتمدة</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {searchResult.citations.map((cite, index) => (
                    <a
                      key={index}
                      href={cite.uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 border rounded-xl shadow-sm transition-all block text-xs font-semibold ${
                        isDarkMode ? "bg-slate-950/50 hover:bg-slate-900 border-slate-800/40 text-slate-300" : "bg-white/60 hover:bg-white border-white/30 text-slate-700"
                      }`}
                    >
                      <span className={`font-bold hover:underline block line-clamp-1 ${isDarkMode ? "text-indigo-300" : "text-indigo-700"}`}>{cite.title}</span>
                      <span className={`block truncate mt-1 font-medium ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>{cite.uri}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

        {/* 5. Saved Watches & Alerting Dashboard */}
        <WatchlistDashboard
          watchlist={watchlist}
          onRemoveWatch={handleRemoveWatch}
          onCheckAlerts={handleCheckAlerts}
          onSimulateDiscount={handleSimulateDiscount}
          checkingAlerts={checkingAlerts}
          isDarkMode={isDarkMode}
        />

      </main>

      {/* Footer */}
      <footer className={`py-8 text-center border-t backdrop-blur-md transition-all duration-300 ${
        isDarkMode ? "bg-slate-950/40 border-slate-900/60" : "bg-white/30 border-white/30"
      }`} id="app-footer">
        <div className={`max-w-7xl mx-auto px-4 text-xs font-bold transition-all duration-300 ${
          isDarkMode ? "text-indigo-300/60" : "text-indigo-900/60"
        }`}>
          <p>© 2026 البحث عن الأرخص. جميع الحقوق محفوظة.</p>
          <p className={`mt-1 font-medium transition-all duration-300 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
            مساعدك المالي للتسوق الذكي. نوظف الذكاء الاصطناعي لتفتيش أفضل الصفقات وحماية ميزانيتك.
          </p>
        </div>
      </footer>

    </div>
  );
}
