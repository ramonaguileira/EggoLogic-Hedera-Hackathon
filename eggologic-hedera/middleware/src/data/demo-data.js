/**
 * Demo data for EggoLogic Dashboard
 * Consistent with transactions generated in seed-demo-data.js
 */
const DEMO_DELIVERIES = [
    {
        id: 'E-001',
        date: '2024-03-05',
        provider: 'Restaurante La Esquina',
        kg_brutos: 80,
        pct_impropios: 5,
        kg_netos: 76.00,
        grade: 'A',
        coins: 100.32,
        hcs_tx: '0.0.7167600@1772759108.325850068',
        hts_mint_tx: '0.0.7167600@1772759104.095763483'
    },
    {
        id: 'E-002',
        date: '2024-03-05',
        provider: 'Parrilla Don José',
        kg_brutos: 60,
        pct_impropios: 12,
        kg_netos: 52.80,
        grade: 'B',
        coins: 63.89,
        hcs_tx: '0.0.7167600@1772759113.985020434',
        hts_mint_tx: '0.0.7167600@1772759110.777227814'
    },
    {
        id: 'E-003',
        date: '2024-03-05',
        provider: 'Cafetería Central',
        kg_brutos: 45,
        pct_impropios: 25,
        kg_netos: 33.75,
        grade: 'C',
        coins: 30.38,
        hcs_tx: '0.0.7167600@1772759117.821054048',
        hts_mint_tx: '0.0.7167600@1772759115.354735474'
    },
    {
        id: 'E-004',
        date: '2024-03-05',
        provider: 'Hotel Playa',
        kg_brutos: 120,
        pct_impropios: 3,
        kg_netos: 116.40,
        grade: 'A',
        coins: 153.65,
        hcs_tx: '0.0.7167600@1772759119.764061210',
        hts_mint_tx: '0.0.7167600@1772759121.672298143'
    },
    {
        id: 'E-005',
        date: '2024-03-05',
        provider: 'Comedor Escolar',
        kg_brutos: 55,
        pct_impropios: 8,
        kg_netos: 50.60,
        grade: 'B',
        coins: 55.66,
        hcs_tx: '0.0.7167600@1772759124.271259230',
        hts_mint_tx: '0.0.7167600@1772759123.626796901'
    },
    {
        id: 'E-006',
        date: '2024-03-05',
        provider: 'Mercado del Puerto',
        kg_brutos: 90,
        pct_impropios: 28,
        kg_netos: 64.80,
        grade: 'D',
        coins: 0,
        hcs_tx: '0.0.7167600@1772759124.997959068',
        hts_mint_tx: null
    },
    {
        id: 'E-007',
        date: '2024-03-05',
        provider: 'Cooperativa Agraria',
        kg_brutos: 1100,
        pct_impropios: 2,
        kg_netos: 1078.00,
        grade: 'A',
        coins: 1681.68,
        hcs_tx: '0.0.7167600@1772757046.484643143',
        hts_mint_tx: '0.0.7167600@1772757044.478761570'
    }
];

module.exports = { DEMO_DELIVERIES };
