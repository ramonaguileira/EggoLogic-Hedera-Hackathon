const fs = require('fs');

const read = (p) => fs.readFileSync(p, 'utf8');

describe('Dashboard security hardening', () => {
  test('contains no privileged-role authentication bypasses', () => {
    const files = [
      'dashboard/js/api.js',
      'dashboard/js/dashboard.js',
      'dashboard/js/impact.js',
      'dashboard/js/ui.js'
    ];
    const code = files.map(read).join('\n');

    for (const forbidden of ['_autoApproveAsVVB', 'vvb_hack_token', 'offline-mode', 'offline-restaurant']) {
      expect(code).not.toContain(forbidden);
    }

    expect(read('dashboard/js/dashboard.js')).not.toContain('eggologic-vvb@outlook.com');
    expect(read('dashboard/js/impact.js')).not.toContain('loginByEmail');
  });

  test('registration never collects or persists application passwords', () => {
    const ui = read('dashboard/js/ui.js');
    const dashboard = read('dashboard/js/dashboard.js');

    expect(ui).not.toContain('reg-password');
    expect(ui).not.toContain('reg-confirm-password');
    expect(ui).not.toContain('value="test"');
    expect(dashboard).not.toContain('password: password');
    expect(dashboard).toContain('sanitizeStoredApplications');
  });

  test('active dashboard uses CIN terminology and the 1,000 kg issuance threshold', () => {
    const files = [
      'dashboard/index.html',
      'dashboard/impact.html',
      'dashboard/wallet.html',
      'dashboard/js/hedera.js',
      'dashboard/js/impact.js',
      'dashboard/js/wallet.js'
    ];
    const text = files.map(read).join('\n');

    expect(/\bCIT\b/.test(text)).toBe(false);
    expect(text).not.toContain('10k $EGGO');
    expect(text).not.toContain('Auto-Verified');
    expect(read('dashboard/js/impact.js')).toContain('1000');
    expect(read('dashboard/js/hedera.js')).toContain('getCINSupply');
    expect(read('dashboard/wallet.html')).toContain('id="cin-panel"');
  });
});
