#!/usr/bin/env node
/**
 * Eggologic Demo Flow
 * Executes the complete pipeline with sample data for hackathon presentation.
 * Run: node scripts/demo-flow.js [--testnet] [--verbose]
 */
import 'dotenv/config';

const DEMO_DELIVERIES = [
  { delivery_id: 'E-20260315-01', supplier_id: 'PROV-001', fecha: '2026-03-15', kg_brutos: 80, pct_impropios: 5, destino: 'BSF', supplier_name: 'Restaurante La Esquina' },
  { delivery_id: 'E-20260315-02', supplier_id: 'PROV-002', fecha: '2026-03-15', kg_brutos: 60, pct_impropios: 25, destino: 'compost', supplier_name: 'Restaurante El Molino' },
  { delivery_id: 'E-20260316-01', supplier_id: 'PROV-001', fecha: '2026-03-16', kg_brutos: 95, pct_impropios: 3, destino: 'BSF', supplier_name: 'Restaurante La Esquina' },
  { delivery_id: 'E-20260317-01', supplier_id: 'PROV-003', fecha: '2026-03-17', kg_brutos: 45, pct_impropios: 12, destino: 'mixto', supplier_name: 'Poda Municipal' },
];

function getQualityGrade(pct) {
  if (pct <= 5) return { grade: 'A', factor: 1.2 };
  if (pct <= 15) return { grade: 'B', factor: 1.0 };
  if (pct <= 30) return { grade: 'C', factor: 0.8 };
  return { grade: 'D', factor: 0.5 };
}

async function main() {
  const verbose = process.argv.includes('--verbose');
  console.log('🥚 Eggologic — Demo Flow');
  console.log('========================\n');

  let totalEggocoins = 0;
  let carbonAccumulator = 0;

  for (const d of DEMO_DELIVERIES) {
    const kgNetos = d.kg_brutos * (1 - d.pct_impropios / 100);
    const { grade, factor } = getQualityGrade(d.pct_impropios);
    const eggocoins = Math.round(kgNetos * factor * 1.0 * 100) / 100; // alianza=1.0 for demo
    const adjustedKg = Math.round(d.kg_brutos * 0.70 * 100) / 100;

    totalEggocoins += eggocoins;
    carbonAccumulator += adjustedKg;

    console.log(`📦 ${d.delivery_id} — ${d.supplier_name}`);
    console.log(`   ${d.kg_brutos} kg brutos → ${Math.round(kgNetos*100)/100} kg netos (${d.pct_impropios}% impropios)`);
    console.log(`   Grade ${grade} (×${factor}) → ${eggocoins} EGGOCOINS`);
    console.log(`   Carbon: +${adjustedKg} kg → accumulator: ${Math.round(carbonAccumulator*100)/100}/1000 kg`);
    if (verbose) console.log(`   Destination: ${d.destino}`);
    console.log('');
  }

  console.log('═══════════════════════════════════');
  console.log(`  Total EGGOCOINS minted: ${Math.round(totalEggocoins*100)/100}`);
  console.log(`  Carbon accumulator: ${Math.round(carbonAccumulator*100)/100}/1000 kg`);
  console.log(`  CARBONCOIN progress: ${Math.round(carbonAccumulator/10)}%`);
  console.log('═══════════════════════════════════\n');

  if (carbonAccumulator >= 1000) {
    console.log('🌍 CARBONCOIN NFT would be minted! (1 tCO₂e avoided)');
  } else {
    console.log(`📊 ${Math.round(1000 - carbonAccumulator)} kg more needed for next CARBONCOIN`);
  }
}

main().catch(console.error);
