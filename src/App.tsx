import { useState } from 'react'

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
    name: '長榮航',
    code: '2618',
    confidence: 70,
    price: 38.75,
    change: 0.15,
    changePercent: 0.39,
    break5DayHigh: true,
    volumeBoost: false,
    kdj: '70, 56, 98',
    macd: '-',
    rsi: 65.64,
    eps: 2.34,
    dividendYield: '6.22%',
    industry: '航運業',
    bias: '1.92%',
    tenDayChange: '1.17%',
    priority: 4,
    analysis: '股價在均線之上穩定攀升，量能溫和。'
  }
];

function App() {
  const [selectedStock, setSelectedStock] = useState<StockData | null>(null);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-10">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight">AI 選股報表</h1>
          </div>
          <div className="text-slate-500 text-sm font-medium bg-slate-100 px-3 py-1 rounded-full">
            2026-02-09
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 mt-6">
        {/* Statistics Summary - Desktop only */}
        <div className="hidden md:grid grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="text-slate-500 text-sm mb-1">今日追蹤</div>
            <div className="text-2xl font-bold">5 檔個股</div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm border-l-4 border-l-green-500">
            <div className="text-slate-500 text-sm mb-1">最高信心</div>
            <div className="text-2xl font-bold text-green-600">85%</div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="text-slate-500 text-sm mb-1">平均漲幅</div>
            <div className="text-2xl font-bold">3.35%</div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="text-slate-500 text-sm mb-1">主要產業</div>
            <div className="text-2xl font-bold">金融/電子</div>
          </div>
        </div>

        {/* Stock List */}
        <div className="space-y-4">
          <div className="flex justify-between items-end mb-2 px-1">
            <h2 className="text-lg font-bold text-slate-700">技術分析清單 (5筆)</h2>
            <span className="text-xs text-slate-400">點擊卡片查看詳細分析</span>
          </div>
          
          {STOCKS.map((stock) => (
            <div 
              key={stock.id}
              className="group bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer"
              onClick={() => setSelectedStock(stock === selectedStock ? null : stock)}
            >
              <div className="p-4 md:p-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  {/* Name and Confidence */}
                  <div className="flex items-center gap-4 min-w-[140px]">
                    <div className="relative flex-shrink-0">
                      <svg className="w-12 h-12 transform -rotate-90">
                        <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-slate-100" />
                        <circle 
                          cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" 
                          strokeDasharray={125.6} 
                          strokeDashoffset={125.6 - (stock.confidence / 100) * 125.6}
                          className={stock.confidence >= 80 ? "text-red-500" : "text-orange-500"} 
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-bold leading-none">{stock.confidence}</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-lg font-black leading-tight">{stock.name}</div>
                      <div className="text-xs text-slate-400 font-medium tracking-wider">{stock.code}</div>
                    </div>
                  </div>

                  {/* Price Info */}
                  <div className="flex-1 md:flex-none flex items-center justify-between md:justify-end gap-8">
                    <div className="text-right">
                      <div className="text-xl font-black tabular-nums">{stock.price.toFixed(2)}</div>
                      <div className={`text-sm font-bold flex items-center justify-end gap-1 ${stock.change > 0 ? 'text-red-500' : 'text-green-500'}`}>
                        {stock.change > 0 ? '▲' : '▼'} {stock.change.toFixed(2)} ({stock.changePercent}%)
                      </div>
                    </div>
                    <div className="hidden sm:block text-right min-w-[80px]">
                      <div className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">殖利率</div>
                      <div className="text-sm font-bold text-slate-600">{stock.dividendYield}</div>
                    </div>
                    <div className="hidden lg:block text-right min-w-[100px]">
                      <div className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">產業</div>
                      <div className="text-xs font-bold text-slate-500">{stock.industry}</div>
                    </div>
                  </div>

                  {/* Indicators - Badges */}
                  <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto no-scrollbar pt-2 md:pt-0 border-t md:border-t-0 border-slate-50">
                    {stock.break5DayHigh && <span className="flex-shrink-0 bg-red-50 text-red-600 text-[10px] font-black px-2 py-1 rounded-md border border-red-100">破5日高</span>}
                    {stock.volumeBoost && <span className="flex-shrink-0 bg-orange-50 text-orange-600 text-[10px] font-black px-2 py-1 rounded-md border border-orange-100">量能</span>}
                    <span className="flex-shrink-0 bg-slate-100 text-slate-600 text-[10px] font-black px-2 py-1 rounded-md">RSI {stock.rsi}</span>
                  </div>
                </div>

                {/* Analysis Drawer */}
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${selectedStock?.id === stock.id ? 'max-h-96 mt-6 pt-6 border-t border-slate-100' : 'max-h-0'}`}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-4">
                      <div>
                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
                          分析原因
                        </h4>
                        <p className="text-sm leading-relaxed text-slate-600 font-medium">
                          {stock.analysis}
                        </p>
                      </div>
                      <div className="flex gap-4">
                        <div className="bg-slate-50 p-3 rounded-xl flex-1">
                          <div className="text-[10px] text-slate-400 font-bold mb-1">KDJ</div>
                          <div className="text-xs font-bold text-slate-700">{stock.kdj}</div>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-xl flex-1">
                          <div className="text-[10px] text-slate-400 font-bold mb-1">MACD</div>
                          <div className="text-xs font-bold text-slate-700">{stock.macd}</div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100/50 flex flex-col justify-between">
                       <div>
                        <div className="text-[10px] text-indigo-400 font-black uppercase tracking-widest mb-3">優先級</div>
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={`text-lg ${i < stock.priority ? 'text-yellow-400' : 'text-slate-200'}`}>★</span>
                          ))}
                        </div>
                       </div>
                       <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-xl text-xs font-bold hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200">
                         查看詳細 K 線
                       </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer for App View */}
      <footer className="mt-12 text-center px-4">
        <p className="text-slate-400 text-[10px] font-medium tracking-widest uppercase">
          Hycode AI Analysis System
        </p>
      </footer>
    </div>
  )
}

export default App
