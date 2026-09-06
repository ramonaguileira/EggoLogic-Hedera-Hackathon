const fs = require('fs');
const path = require('path');

describe('HederaMirror Module Structure', () => {
    let hederaScript;

    beforeAll(() => {
        hederaScript = fs.readFileSync(path.join(__dirname, '../dashboard/js/hedera.js'), 'utf8');
    });

    test('Script exposes HederaMirror global', () => {
        expect(hederaScript).toContain('const HederaMirror =');
    });

    test('HederaMirror contains essential token and wallet methods', () => {
        expect(hederaScript).toContain('getEggocoinBalance');
        expect(hederaScript).toContain('getEggocoinSupply');
        expect(hederaScript).toContain('getCINSupply');
        expect(hederaScript).toContain('getUserCIN');
        expect(hederaScript).toContain('getAllCINNfts');
        expect(hederaScript).not.toContain('getCITSupply');
    });
});
