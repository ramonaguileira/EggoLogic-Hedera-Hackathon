import React, { useState, useEffect } from 'react';
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
  ArrowUpRight,
  ExternalLink,
  Loader2
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

const App = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [statsRes, deliveriesRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/dashboard/stats`),
          fetch(`${API_BASE_URL}/api/dashboard/deliveries/recent`)
        ]);

        if (!statsRes.ok || !deliveriesRes.ok) {
          throw new Error('Failed to fetch dashboard data');
        }

        const statsData = await statsRes.json();
        const deliveriesData = await deliveriesRes.json();

        setStats(statsData);
        setDeliveries(deliveriesData.deliveries);
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Connection to middleware failed. Is the backend running?');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000); // Polling every 30s
    return () => clearInterval(interval);
  }, []);

  const gradeColors = {
    A: 'bg-green-100 text-green-700 border-green-200',
    B: 'bg-blue-100 text-blue-700 border-blue-200',
    C: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    D: 'bg-red-100 text-red-700 border-red-200',
  };

  if (loading && !stats) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Loading Live Impact Data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
        <div className="glass p-8 rounded-3xl border-red-100 flex flex-col items-center text-center gap-4">
          <AlertCircle className="w-12 h-12 text-red-500" />
          <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">System Offline</h2>
          <p className="text-slate-500 text-sm max-w-sm">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 px-6 py-2 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-700 transition-colors"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

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

        <div className="flex items-center gap-4">
          {loading && <Loader2 className="w-4 h-4 text-primary animate-spin" />}
          <div className="flex items-center gap-2 px-5 py-2.5 rounded-full font-bold bg-white border border-slate-200 text-slate-700 shadow-sm">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            Operator Node: 0.0.xxxxx
          </div>
        </div>
      </header>

      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full space-y-10">
        {/* Summary Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass p-8 rounded-3xl card-hover relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <CircleDot className="w-24 h-24 text-primary" />
            </div>
            <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mb-4">Eggocoins Balance</p>
            <div className="flex items-baseline gap-2">
              <h2 className="text-5xl font-black text-slate-800">{stats.eggocoins_total.toLocaleString()}</h2>
              <span className="text-primary font-black text-lg">EGGO</span>
            </div>
            <div className="mt-6 flex items-center gap-2 text-green-600 font-bold text-sm bg-green-50 w-fit px-3 py-1 rounded-full">
              <TrendingUp className="w-4 h-4" />
              Real-time Minted
            </div>
          </div>

          <div className="glass p-8 rounded-3xl card-hover relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Leaf className="w-24 h-24 text-accent" />
            </div>
            <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mb-4">Total Deliveries</p>
            <div className="flex items-baseline gap-2">
              <h2 className="text-5xl font-black text-slate-800">{stats.total_deliveries}</h2>
              <span className="text-accent font-black text-lg">LOGS</span>
            </div>
            <p className="mt-6 text-slate-400 text-sm font-medium">Verified by Hedera Consensus</p>
          </div>

          <div className="bg-slate-900 p-8 rounded-3xl card-hover relative overflow-hidden text-white group">
            <div className="absolute -bottom-6 -right-6 p-4 opacity-10 group-hover:opacity-30 transition-all rotate-12">
              <BarChart3 className="w-40 h-40 text-primary" />
            </div>
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-4">Carbon Avoided</p>
            <div className="flex items-baseline gap-2">
              <h2 className="text-5xl font-black">{stats.co2e_avoided_total}</h2>
              <span className="text-slate-400 font-medium">/ 700.00 kg CO2e</span>
            </div>
            <div className="mt-8 space-y-3">
              <div className="h-4 w-full bg-slate-800 rounded-full overflow-hidden border border-slate-700 p-1">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-primary rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)] transition-all duration-1000"
                  style={{ width: `${(stats.carbon_progress / stats.carbon_threshold) * 100}%` }}
                />
              </div>
              <p className="text-[10px] text-slate-400 font-bold flex justify-between uppercase">
                <span>Total Waste: {stats.kg_net_total} kg</span>
                <span>Threshold: {stats.carbon_threshold} kg</span>
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
                    <th className="px-6 py-4">Provider</th>
                    <th className="px-6 py-4 text-center">Net Weight</th>
                    <th className="px-6 py-4 text-center">Verification</th>
                    <th className="px-6 py-4 text-right">Reward</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {deliveries.map((d) => (
                    <tr key={d.id} className="group hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-5">
                        <div className="font-bold text-slate-700">{d.provider}</div>
                        <div className="text-[10px] text-slate-400 font-medium">{d.id} | {d.date}</div>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <div className="font-black text-slate-800">{d.kg_netos} <span className="text-[10px] text-slate-400">kg</span></div>
                        <div className="text-[10px] text-slate-400 font-medium">-{d.pct_impropios}% impurities</div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex flex-col items-center gap-1">
                          <span className={cn(
                            "px-3 py-0.5 rounded-lg text-[10px] font-black border uppercase",
                            gradeColors[d.grade]
                          )}>
                            Grade {d.grade}
                          </span>
                          <div className="flex gap-2 text-[9px] font-bold">
                            {d.hcs_tx && (
                              <a
                                href={`https://hashscan.io/testnet/transaction/${d.hcs_tx}`}
                                target="_blank" rel="noreferrer"
                                className="text-slate-400 hover:text-primary flex items-center gap-0.5"
                              >
                                HCS <ExternalLink className="w-2 h-2" />
                              </a>
                            )}
                            {d.hts_mint_tx && (
                              <a
                                href={`https://hashscan.io/testnet/transaction/${d.hts_mint_tx}`}
                                target="_blank" rel="noreferrer"
                                className="text-slate-400 hover:text-green-600 flex items-center gap-0.5"
                              >
                                HTS <ExternalLink className="w-2 h-2" />
                              </a>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-right font-black text-primary">
                        +{d.coins.toFixed(2)} EGGO
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
                    strokeDashoffset={(2 * Math.PI * 90) * (1 - Math.min(stats.carbon_progress / stats.carbon_threshold, 1))}
                    className="stroke-primary group-hover:stroke-green-400 transition-all duration-1000"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-black text-slate-800 leading-none">{Math.round(Math.min((stats.carbon_progress / stats.carbon_threshold) * 100, 100))}%</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase mt-1">Goal Reached</span>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-black text-slate-800 uppercase tracking-tight">CarbonCoin Status</h4>
                {stats.carboncoin_minted ? (
                  <div className="bg-green-100 border border-green-200 text-green-700 px-4 py-3 rounded-2xl flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="text-xs font-bold uppercase">NFT Issued on Hedera</span>
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 font-medium leading-relaxed px-4">
                    Deliver {stats.carbon_threshold - stats.carbon_progress} kg more of organic waste to unlock your next CarbonCoin NFT.
                  </p>
                )}
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
                <span className="text-[10px] font-black uppercase tracking-widest text-green-100">Network Info</span>
              </div>
              <p className="text-sm font-bold leading-tight">
                Dashboard live on Hedera Testnet. All transactions are verifiable on-chain.
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
