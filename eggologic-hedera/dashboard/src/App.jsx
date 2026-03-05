import React from 'react';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-green-700 text-white p-4">
        <h1 className="text-2xl font-bold">🥚 Eggologic Dashboard</h1>
        <p className="text-green-200">Circular Economy • Verified on Hedera</p>
      </header>
      <main className="max-w-6xl mx-auto p-6">
        <p className="text-gray-600">Dashboard components: DeliveryTable, PointsBalance, CarbonTracker, WalletConnect</p>
        <p className="text-gray-400 mt-2">Phase 2 implementation</p>
      </main>
    </div>
  );
}
