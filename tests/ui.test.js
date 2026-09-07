const fs = require('fs');
const path = require('path');

describe('UI Framework Logic', () => {
    let code;

    beforeAll(() => {
        code = fs.readFileSync(path.join(__dirname, '../dashboard/js/ui.js'), 'utf8');
    });

    test('UI module exists and initializes on DOMContentLoaded', () => {
        expect(code).toContain('const UI = (() => {');
        expect(code).toContain("document.addEventListener('DOMContentLoaded', () => UI.init())");
    });

    test('number formatting and relative-time helpers are exposed', () => {
        expect(code).toContain('function fmt(n, decimals = 0)');
        expect(code).toContain('toLocaleString');
        expect(code).toContain('function timeAgo(date)');
        expect(code).toContain('fmt, timeAgo');
    });

    test('login and registration modal handling is defined', () => {
        expect(code).toContain('function openLogin()');
        expect(code).toContain('function closeLogin()');
        expect(code).toContain('function openRegistration()');
        expect(code).toContain('function closeRegistration()');
    });
});
