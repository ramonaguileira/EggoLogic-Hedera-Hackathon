import React, { useState } from 'react';
import {
  Wallet,
  Recycle,
  Leaf,
  History,
  BarChart3,
  CircleDot,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  ArrowUpRight
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Mock Data
const MOCK_DELIVERIES = [
  { id: 1, date: '2024-03-01', provider: 'Finca Los Pinos', kg_brutos: 450, pct_impropios: 5, kg_netos: 427.5, grade: 'A', coins: 427 },
  { id: 2, date: '2024-03-02', provider: 'EcoHuerta Sur', kg_brutos: 320, pct_impropios: 12, kg_netos: 281.6, grade: 'B', coins: 281 },
  { id: 3, date: '2024-03-04', provider: 'BioResiduos Central', kg_brutos: 600, pct_impropios: 3, kg_netos: 582, grade: 'A', coins: 582 },
  { id: 4, date: '2024-03-05', provider: 'Granja Verde', kg_brutos: 150, pct_impropios: 25, kg_netos: 112.5, grade: 'D', coins: 112 },
  { id: 5, date: '2024-03-05', provider: 'EcoHuerta Sur', kg_brutos: 280, pct_impropios: 8, kg_netos: 257.6, grade: 'B', coins: 257 },
];

const STATS = {
  eggocoins: 12450,
  totalDeliveries: 42,
  carbonProgress: 750, // kg
  nextGoal: 1000,
};

const App = () => {
  const [walletConnected, setWalletConnected] = useState(false);

  const gradeColors = {
    A: 'bg-green-100 text-green-700 border-green-200',
    B: 'bg-blue-100 text-blue-700 border-blue-200',
    C: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    D: 'bg-red-100 text-red-700 border-red-200',
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary/20 p-2 rounded-xl">
            <Recycle className="text-primary w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-800">
              Eggo<span className="text-primary font-black">Logic</span>
            </h1>
            <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Circular Economy</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8 mx-auto">
          {['Dashboard', 'Deliveries', 'Rewards', 'Market'].map((item) => (
            <a key={item} href="#" className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors">
              {item}
            </a>
          ))}
        </nav>

        <button
          onClick={() => setWalletConnected(!walletConnected)}
          className={cn(
            "flex items-center gap-2 px-5 py-2.5 rounded-full font-bold transition-all active:scale-95 shadow-lg",
            walletConnected
              ? "bg-white border border-slate-200 text-slate-700"
              : "bg-primary text-white hover:bg-green-600 shadow-green-200"
          )}
        >
          <Wallet className="w-4 h-4" />
          {walletConnected ? "0x7a...f2e" : "Connect Wallet"}
        </button>
      </header>

      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full space-y-10">
        {/* Summary Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass p-8 rounded-3xl card-hover relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <CircleDot className="w-24 h-24 text-primary" />
            </div>
            <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mb-4">Balance Balance</p>
            <div className="flex items-baseline gap-2">
              <h2 className="text-5xl font-black text-slate-800">{STATS.eggocoins.toLocaleString()}</h2>
              <span className="text-primary font-black text-lg">EGGO</span>
            </div>
            <div className="mt-6 flex items-center gap-2 text-green-600 font-bold text-sm bg-green-50 w-fit px-3 py-1 rounded-full">
              <TrendingUp className="w-4 h-4" />
              +12% this week
            </div>
          </div>

          <div className="glass p-8 rounded-3xl card-hover relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Leaf className="w-24 h-24 text-accent" />
            </div>
            <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mb-4">Total Deliveries</p>
            <div className="flex items-baseline gap-2">
              <h2 className="text-5xl font-black text-slate-800">{STATS.totalDeliveries}</h2>
              <span className="text-accent font-black text-lg">LOGS</span>
            </div>
            <p className="mt-6 text-slate-400 text-sm font-medium">Verified by Hedera Consensus</p>
          </div>

          <div className="bg-slate-900 p-8 rounded-3xl card-hover relative overflow-hidden text-white group">
            <div className="absolute -bottom-6 -right-6 p-4 opacity-10 group-hover:opacity-30 transition-all rotate-12">
              <BarChart3 className="w-40 h-40 text-primary" />
            </div>
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-4">Carbon Progress</p>
            <div className="flex items-baseline gap-2">
              <h2 className="text-5xl font-black">{STATS.carbonProgress}</h2>
              <span className="text-slate-400 font-medium">/ {STATS.nextGoal} kg</span>
            </div>
            <div className="mt-8 space-y-3">
              <div className="h-4 w-full bg-slate-800 rounded-full overflow-hidden border border-slate-700 p-1">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-primary rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)] transition-all duration-1000"
                  style={{ width: `${(STATS.carbonProgress / STATS.nextGoal) * 100}%` }}
                />
              </div>
              <p className="text-[10px] text-slate-400 font-bold flex justify-between uppercase">
                <span>Earned: {STATS.carbonProgress} kg</span>
                <span>Next CarbonCoin: 250 kg</span>
              </p>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Deliveries Table */}
          <section className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-slate-100 p-2 rounded-lg">
                  <History className="text-slate-600 w-5 h-5" />
                </div>
                <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">Recent Deliveries</h3>
              </div>
              <button className="text-sm font-bold text-primary group flex items-center gap-1 hover:gap-2 transition-all">
                View All <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            <div className="glass rounded-[2rem] overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50 border-b text-[10px] uppercase font-black text-slate-400">
                    <th className="px-6 py-4">Date & Provider</th>
                    <th className="px-6 py-4 text-center">Net Weight</th>
                    <th className="px-6 py-4 text-center">Quality</th>
                    <th className="px-6 py-4 text-right">Reward</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {MOCK_DELIVERIES.map((d) => (
                    <tr key={d.id} className="group hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-5">
                        <div className="font-bold text-slate-700">{d.provider}</div>
                        <div className="text-[10px] text-slate-400 font-medium">{d.date}</div>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <div className="font-black text-slate-800">{d.kg_netos} <span className="text-[10px] text-slate-400">kg</span></div>
                        <div className="text-[10px] text-slate-400 font-medium">-{d.pct_impropios}% impurities</div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex justify-center">
                          <span className={cn(
                            "px-3 py-1 rounded-lg text-xs font-black border",
                            gradeColors[d.grade]
                          )}>
                            Grade {d.grade}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-right font-black text-primary">
                        +{d.coins} EGGO
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Progress Section */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-lg">
                <BarChart3 className="text-primary w-5 h-5" />
              </div>
              <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">NFT Milestone</h3>
            </div>

            <div className="glass p-8 rounded-[2rem] space-y-8 flex flex-col items-center text-center">
              <div className="relative w-48 h-48 flex items-center justify-center">
                {/* SVG Progress Circle */}
                <svg className="w-full h-full -rotate-90">
                  <circle
                    cx="50%" cy="50%" r="90"
                    fill="none" strokeWidth="12"
                    className="stroke-slate-100"
                  />
                  <circle
                    cx="50%" cy="50%" r="90"
                    fill="none" strokeWidth="12"
                    strokeDasharray={2 * Math.PI * 90}
                    strokeDashoffset={(2 * Math.PI * 90) * (1 - STATS.carbonProgress / STATS.nextGoal)}
                    className="stroke-primary group-hover:stroke-green-400 transition-all duration-1000"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-black text-slate-800 leading-none">{Math.round((STATS.carbonProgress / STATS.nextGoal) * 100)}%</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase mt-1">Goal Reached</span>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-black text-slate-800 uppercase tracking-tight">Mint Next CarbonCoin</h4>
                <p className="text-xs text-slate-500 font-medium leading-relaxed px-4">
                  Deliver 250 kg more of organic waste to unlock your next CarbonCoin NFT and increase your revenue share.
                </p>
                <button className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 py-3 rounded-2xl font-black text-xs uppercase transition-colors">
                  Learn about CarbonCoins
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary to-green-600 p-6 rounded-[2rem] text-white space-y-4 shadow-xl shadow-green-200 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform duration-700">
                <CheckCircle2 className="w-20 h-20" />
              </div>
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-green-200" />
                <span className="text-[10px] font-black uppercase tracking-widest text-green-100">Quality Alert</span>
              </div>
              <p className="text-sm font-bold leading-tight">
                Your average grade has increased to A! You're earning 15% more EGGOCOINS.
              </p>
            </div>
          </section>
        </div>
      </main>

      <footer className="p-8 text-center text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
        &copy; 2024 EggoLogic. Built on <span className="text-slate-800">Hedera Hashgraph</span>
      </footer>
    </div>
  );
};

export default App;
