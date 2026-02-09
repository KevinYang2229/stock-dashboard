import { useState, useEffect } from 'react'

interface StockData {
  id: string;
  name: string;
  code: string;
  confidence: number;
  price: number;
  change: number;
  changePercent: number;
  break5DayHigh: boolean;
  volumeBoost: boolean;
  kdj: string;
  macd: string;
  rsi: number;
  eps: number;
  dividendYield: string;
  industry: string;
  bias: string;
  tenDayChange: string;
  priority: number;
  analysis: string;
}

const STOCKS: StockData[] = [
  {
    id: '1',
    name: '元大金',
    code: '2885',
    confidence: 85,
    price: 44.15,
    change: 1.50,
    changePercent: 3.52,
    break5DayHigh: true,
    volumeBoost: true,
    kdj: '黃金交叉 (68, 65, 76)',
    macd: '黃金交叉',
    rsi: 74.39,
    eps: 1.22,
    dividendYield: '4.34%',
    industry: '金融保險業',
    bias: '4.7%',
    tenDayChange: '4.37%',
    priority: 5,
    analysis: '連續量價齊揚且突破20日均線壓力，MACD與KD同時黃金交叉，動能強勢共振，短線主力拉抬明顯，技術面結構完整，屬於平台突破型態。'
  },
  {
    id: '2',
    name: '上海商銀',
    code: '5876',
    confidence: 80,
    price: 40.3,
    change: 0.35,
    changePercent: 0.88,
    break5DayHigh: true,
    volumeBoost: true,
    kdj: '超買 (74, 59, 104)',
    macd: '-',
    rsi: 63.93,
    eps: 1.61,
    dividendYield: '4.51%',
    industry: '金融保險業',
    bias: '1.74%',
    tenDayChange: '1.9%',
    priority: 5,
    analysis: '股價連5紅帶量盤堅突破，日K實體大、拉出突破，MACD多方動能穩定，RSI與K值處於強勢區且無超買鈍化，剛剛啟動型短多結構。'
  },
  {
    id: '3',
    name: '盟立',
    code: '2464',
    confidence: 75,
    price: 75.8,
    change: 4.30,
    changePercent: 6.01,
    break5DayHigh: true,
    volumeBoost: true,
    kdj: '65, 54, 88',
    macd: '-',
    rsi: 65.81,
    eps: -0.59,
    dividendYield: '0.49%',
    industry: '其他電子業',
    bias: '10.29%',
    tenDayChange: '10.17%',
    priority: 4,
    analysis: '日K實量噴出突破平台，均線多頭排列，MACD與KD同步增強，主力持續拉抬，技術型態棒，且屬短線慣性續漲結構。'
  },
  {
    id: '4',
    name: '偉詮電',
    code: '2436',
    confidence: 75,
    price: 56.7,
    change: 3.20,
    changePercent: 5.98,
    break5DayHigh: true,
    volumeBoost: true,
    kdj: '62, 53, 80',
    macd: '-',
    rsi: 70.91,
    eps: 0.29,
    dividendYield: '2.8%',
    industry: '半導體業',
    bias: '10.44%',
    tenDayChange: '7.39%',
    priority: 4,
    analysis: '股價帶量連續急拉突破，短中長期均線全面多頭排列，K值強勢上攻，MACD動能維持正值，雖進入超買但短線仍有機會慣性噴出。'
  },
  {
    id: '5',
    name: '華南金',
    code: '2880',
    confidence: 70,
    price: 34,
    change: 0.15,
    changePercent: 0.44,
    break5DayHigh: true,
    volumeBoost: false,
    kdj: '78, 68, 99',
    macd: '-',
    rsi: 68.1,
    eps: 0.39,
    dividendYield: '3.99%',
    industry: '金融保險業',
    bias: '2.5%',
    tenDayChange: '2.87%',
    priority: 4,
    analysis: '股價在均線之上穩定攀升，量能溫和。'
  },
  {
    id: '6',
    name: '長榮航',
    code: '2618',
    confidence: 70,
    price: 38.75,
    change: 0.15,
    changePercent: 0.39,
    break5DayHigh: true,
    volumeBoost: false,
    kdj: '70, 56, 97',
    macd: '-',
    rsi: 65.64,
    eps: 2.34,
    dividendYield: '6.22%',
    industry: '航運業',
    bias: '1.92%',
    tenDayChange: '1.17%',
    priority: 4,
    analysis: '技術面結構紮實，穩步走揚中。'
  },
  {
    id: '7',
    name: '台化',
    code: '1326',
    confidence: 60,
    price: 42.95,
    change: 3.90,
    changePercent: 9.99,
    break5DayHigh: true,
    volumeBoost: false,
    kdj: '42, 49, 28',
    macd: '-',
    rsi: 66.54,
    eps: -1.24,
    dividendYield: '1.28%',
    industry: '塑膠工業',
    bias: '13.56%',
    tenDayChange: '5.92%',
    priority: 3,
    analysis: '低點強勢反彈，今日鎖漲停，動能強勁。'
  },
  {
    id: '8',
    name: '晶彩科',
    code: '3535',
    confidence: 60,
    price: 113,
    change: 6.00,
    changePercent: 5.61,
    break5DayHigh: true,
    volumeBoost: false,
    kdj: '69, 54, 98',
    macd: '-',
    rsi: 66.14,
    eps: -1.68,
    dividendYield: '0.47%',
    industry: '光電業',
    bias: '11.69%',
    tenDayChange: '9.18%',
    priority: 3,
    analysis: '高檔震盪突破，持續創下短波段新高。'
  },
  {
    id: '9',
    name: '榮剛',
    code: '5009',
    confidence: 60,
    price: 34.5,
    change: 1.20,
    changePercent: 3.60,
    break5DayHigh: true,
    volumeBoost: false,
    kdj: '黃金交叉 (42, 40, 46)',
    macd: '黃金交叉',
    rsi: 57.82,
    eps: 2.6,
    dividendYield: '7.81%',
    industry: '鋼鐵工業',
    bias: '2.19%',
    tenDayChange: '3.6%',
    priority: 3,
    analysis: 'MACD與KD同時出現黃金交叉，轉多訊號明顯。'
  }
];

function App() {
  const [selectedStock, setSelectedStock] = useState<StockData | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentTime, setCurrentTime] = useState('');

  // 初始化主題與時間
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setIsDarkMode(false);
    }

    // 設定臺灣日期時間格式
    const updateTime = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat('zh-TW', {
        timeZone: 'Asia/Taipei',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      setCurrentTime(formatter.format(now).replace(/\//g, '-'));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  const theme = {
    bg: isDarkMode ? 'bg-[#131722]' : 'bg-[#f0f3fa]',
    card: isDarkMode ? 'bg-[#1e222d]' : 'bg-white',
    border: isDarkMode ? 'border-[#2a2e39]' : 'border-slate-200',
    text: isDarkMode ? 'text-[#d1d4dc]' : 'text-slate-600',
    textMain: isDarkMode ? 'text-[#f0f3fa]' : 'text-slate-900',
    textMuted: isDarkMode ? 'text-[#868993]' : 'text-slate-400',
    rowHover: isDarkMode ? 'hover:bg-[#2a2e39]' : 'hover:bg-slate-50',
    rowActive: isDarkMode ? 'bg-[#2a2e39]' : 'bg-slate-50',
    subBg: isDarkMode ? 'bg-[#131722]' : 'bg-slate-50',
    divider: isDarkMode ? 'bg-[#2a2e39]' : 'bg-slate-100'
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme.bg} font-sans ${theme.text} pb-10`}>
      {/* TradingView Header */}
      <header className={`${theme.card} border-b ${theme.border} sticky top-0 z-30 shadow-sm`}>
        <div className="max-w-screen-xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#2962ff] rounded flex items-center justify-center">
              <svg viewBox="0 0 28 28" fill="none" className="w-5 h-5 text-white">
                <path d="M7 11.5L11 7.5L15 11.5L19 7.5V16.5H7V11.5Z" fill="currentColor"></path>
              </svg>
            </div>
            <h1 className={`text-lg font-bold tracking-tight ${theme.textMain}`}>HYCODE MARKET</h1>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Theme Toggle Button */}
            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'bg-[#2a2e39] text-yellow-400 hover:bg-[#363a45]' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              {isDarkMode ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.364l-.707-.707M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            <div className={`hidden sm:flex items-center gap-2 text-xs font-semibold ${theme.textMuted}`}>
              <span className="w-2 h-2 bg-[#089981] rounded-full animate-pulse"></span>
              TAIWAN TIME
            </div>
            <div className={`${theme.textMuted} text-xs font-bold ${isDarkMode ? 'bg-[#2a2e39]' : 'bg-slate-100'} px-3 py-1.5 rounded tabular-nums border ${theme.border}`}>
              {currentTime || 'Loading...'}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-screen-xl mx-auto px-4 mt-4">
        {/* Watchlist Table Header - Desktop */}
        <div className={`hidden md:grid grid-cols-12 gap-4 px-4 py-2 text-[11px] font-bold ${theme.textMuted} uppercase tracking-wider border-b ${theme.border}`}>
          <div className="col-span-3">商品 / 信心指數</div>
          <div className="col-span-2 text-right">最新價</div>
          <div className="col-span-2 text-right">漲跌幅</div>
          <div className="col-span-3">技術指標</div>
          <div className="col-span-2 text-right">優先級</div>
        </div>

        {/* Stock List */}
        <div className={`mt-2 space-y-[1px] ${isDarkMode ? 'bg-[#2a2e39]' : 'bg-slate-200'} rounded overflow-hidden shadow-2xl`}>
          {STOCKS.map((stock) => (
            <div 
              key={stock.id}
              className={`group transition-colors cursor-pointer ${selectedStock?.id === stock.id ? theme.rowActive : theme.card + ' ' + theme.rowHover}`}
              onClick={() => setSelectedStock(stock === selectedStock ? null : stock)}
            >
              {/* Desktop Row / Mobile Card */}
              <div className="md:grid md:grid-cols-12 flex flex-col gap-4 p-4 md:items-center">
                
                {/* Symbol and Name */}
                <div className="md:col-span-3 flex items-center gap-3">
                   <div className={`relative w-10 h-10 ${theme.subBg} rounded-full flex items-center justify-center border ${theme.border}`}>
                      <span className={`text-[10px] font-bold ${theme.textMain}`}>{stock.confidence}</span>
                      {/* Confidence Ring */}
                      <svg className="absolute inset-0 w-full h-full -rotate-90">
                        <circle cx="20" cy="20" r="18" fill="none" stroke={isDarkMode ? "#363a45" : "#e2e8f0"} strokeWidth="2" className="origin-center scale-[0.5]" />
                        <circle 
                          cx="20" cy="20" r="18" fill="none" 
                          stroke={stock.confidence >= 80 ? "#f23645" : stock.confidence >= 70 ? "#ff9800" : isDarkMode ? "#868993" : "#94a3b8"} 
                          strokeWidth="2" 
                          strokeDasharray={113}
                          strokeDashoffset={113 - (stock.confidence / 100) * 113}
                          className="origin-center scale-[0.5]"
                        />
                      </svg>
                   </div>
                   <div>
                     <div className={`text-sm font-bold ${theme.textMain} group-hover:text-[#2962ff] transition-colors`}>{stock.name}</div>
                     <div className={`text-[11px] ${theme.textMuted} font-medium`}>{stock.code} · {stock.industry}</div>
                   </div>
                </div>

                {/* Price */}
                <div className="md:col-span-2 flex md:justify-end justify-between items-center">
                  <span className={`md:hidden text-xs ${theme.textMuted}`}>價格</span>
                  <span className={`text-sm font-bold tabular-nums ${theme.textMain}`}>{stock.price.toFixed(2)}</span>
                </div>

                {/* Change */}
                <div className="md:col-span-2 flex md:justify-end justify-between items-center">
                   <span className={`md:hidden text-xs ${theme.textMuted}`}>漲跌</span>
                   <div className={`text-sm font-bold tabular-nums ${stock.change > 0 ? (isDarkMode ? 'text-[#089981]' : 'text-red-600') : (isDarkMode ? 'text-[#f23645]' : 'text-green-600')}`}>
                     {stock.change > 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent}%)
                   </div>
                </div>

                {/* Indicators Badges */}
                <div className="md:col-span-3 flex gap-1.5 flex-wrap">
                  {stock.break5DayHigh && <span className={`${isDarkMode ? 'bg-[#f2364515] text-[#f23645]' : 'bg-red-50 text-red-600'} text-[10px] font-bold px-1.5 py-0.5 rounded border ${isDarkMode ? 'border-[#f2364530]' : 'border-red-100'}`}>破5日高</span>}
                  {stock.volumeBoost && <span className={`${isDarkMode ? 'bg-[#2962ff15] text-[#2962ff]' : 'bg-blue-50 text-blue-600'} text-[10px] font-bold px-1.5 py-0.5 rounded border ${isDarkMode ? 'border-[#2962ff30]' : 'border-blue-100'}`}>帶量</span>}
                  <span className={`${isDarkMode ? 'bg-[#2a2e39] text-[#d1d4dc] border-[#363a45]' : 'bg-slate-100 text-slate-500 border-slate-200'} text-[10px] font-bold px-1.5 py-0.5 rounded border`}>RSI {stock.rsi}</span>
                </div>

                {/* Priority */}
                <div className="md:col-span-2 flex md:justify-end justify-between items-center">
                  <span className={`md:hidden text-xs ${theme.textMuted}`}>優先級</span>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className={`w-1.5 h-3 rounded-sm ${i < stock.priority ? 'bg-[#2962ff]' : (isDarkMode ? 'bg-[#363a45]' : 'bg-slate-200')}`}></div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Analysis Drawer */}
              {selectedStock?.id === stock.id && (
                <div className={`${theme.card} border-t border-b ${theme.border} p-4 md:px-8 md:py-6 shadow-inner animate-in slide-in-from-top-2 duration-200`}>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-3">
                       <div className="flex items-center gap-2 mb-3">
                         <span className="text-[#2962ff] font-bold text-[10px] uppercase tracking-[0.2em]">技術分析報表數據</span>
                         <div className={`h-[1px] flex-1 ${theme.divider}`}></div>
                       </div>
                       
                       <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                         <div className={`${theme.subBg} p-3 rounded border ${theme.border}`}>
                           <div className={`text-[10px] ${theme.textMuted} font-bold uppercase mb-1`}>EPS</div>
                           <div className={`text-sm font-bold ${theme.textMain}`}>{stock.eps}</div>
                         </div>
                         <div className={`${theme.subBg} p-3 rounded border ${theme.border}`}>
                           <div className={`text-[10px] ${theme.textMuted} font-bold uppercase mb-1`}>殖利率</div>
                           <div className={`text-sm font-bold ${theme.textMain}`}>{stock.dividendYield}</div>
                         </div>
                         <div className={`${theme.subBg} p-3 rounded border ${theme.border}`}>
                           <div className={`text-[10px] ${theme.textMuted} font-bold uppercase mb-1`}>乖離率</div>
                           <div className={`text-sm font-bold ${theme.textMain}`}>{stock.bias}</div>
                         </div>
                         <div className={`${theme.subBg} p-3 rounded border ${theme.border}`}>
                           <div className={`text-[10px] ${theme.textMuted} font-bold uppercase mb-1`}>10日漲幅</div>
                           <div className={`text-sm font-bold ${stock.tenDayChange.startsWith('-') ? (isDarkMode ? 'text-[#f23645]' : 'text-green-600') : (isDarkMode ? 'text-[#089981]' : 'text-red-600')}`}>{stock.tenDayChange}</div>
                         </div>
                       </div>

                       <div className="space-y-4">
                         <div className="flex flex-col">
                            <span className={`text-[10px] ${theme.textMuted} font-bold uppercase mb-1 flex items-center gap-1.5`}>
                              <span className="w-1 h-1 bg-[#2962ff] rounded-full"></span>
                              分析觀點
                            </span>
                            <p className={`text-sm leading-relaxed ${theme.text} font-medium`}>
                              {stock.analysis}
                            </p>
                         </div>
                         <div className="flex flex-wrap gap-4">
                            <div className="flex flex-col">
                              <span className={`text-[10px] ${theme.textMuted} font-bold uppercase mb-1`}>KDJ</span>
                              <span className={`text-xs font-bold ${stock.kdj.includes('交叉') ? '#ff9800' : theme.textMain}`}>{stock.kdj}</span>
                            </div>
                            <div className={`flex flex-col border-l ${theme.border} pl-4`}>
                              <span className={`text-[10px] ${theme.textMuted} font-bold uppercase mb-1`}>MACD</span>
                              <span className={`text-xs font-bold ${stock.macd.includes('交叉') ? '#ff9800' : theme.textMain}`}>{stock.macd}</span>
                            </div>
                         </div>
                       </div>
                    </div>
                    <div className="flex flex-col justify-end gap-3">
                       <button className="w-full py-2.5 bg-[#2962ff] hover:bg-[#1e53e5] text-white text-[11px] font-bold rounded transition-colors uppercase tracking-wider">
                         開啟 TradingView 圖表
                       </button>
                       <button className={`w-full py-2.5 bg-transparent ${isDarkMode ? 'hover:bg-[#2a2e39]' : 'hover:bg-slate-50'} ${theme.textMain} text-[11px] font-bold rounded transition-colors uppercase tracking-wider border ${isDarkMode ? 'border-[#363a45]' : 'border-slate-300'}`}>
                         加入追蹤清單
                       </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Market Stats Footer */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
           <div className={`${theme.card} p-4 rounded border ${theme.border} text-center shadow-sm`}>
              <div className={`text-[10px] ${theme.textMuted} font-bold uppercase mb-1`}>追蹤總數</div>
              <div className={`text-xl font-bold ${theme.textMain}`}>28 筆</div>
           </div>
           <div className={`${theme.card} p-4 rounded border ${theme.border} text-center shadow-sm`}>
              <div className={`text-[10px] ${theme.textMuted} font-bold uppercase mb-1`}>當前顯示</div>
              <div className={`text-xl font-bold ${theme.textMain}`}>9 檔</div>
           </div>
           <div className={`${theme.card} p-4 rounded border ${theme.border} text-center shadow-sm`}>
              <div className={`text-[10px] ${theme.textMuted} font-bold uppercase mb-1`}>主要板塊</div>
              <div className={`text-xl font-bold ${theme.textMain}`}>金融/電子</div>
           </div>
           <div className={`${theme.card} p-4 rounded border ${theme.border} text-center shadow-sm`}>
              <div className={`text-[10px] ${theme.textMuted} font-bold uppercase mb-1`}>數據更新</div>
              <div className={`text-xl font-bold ${theme.textMain}`}>Real-time</div>
           </div>
        </div>
      </main>

      <footer className="mt-10 text-center px-4">
        <p className={`${theme.textMuted} text-[9px] font-bold tracking-[0.3em] uppercase opacity-50`}>
          Powered by Hycode AI Engine · Professional Market Intelligence
        </p>
      </footer>
    </div>
  )
}

export default App
