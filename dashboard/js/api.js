// Eggologic Dashboard — Guardian API Wrapper
// Handles auth (login, token refresh) and policy data fetching.

const GuardianAPI = (() => {
  const STORAGE_KEY = 'eggologic_auth';

  // --- Auth State (persisted in localStorage) ---
  function _loadAuth() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch {
      return {};
    }
  }

  function _saveAuth(auth) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(auth));
  }

  /**
   * Authenticate directly against Guardian MGS.
   *
   * Security rule: authentication fails closed. A failed Guardian login must
   * never create an "offline" authenticated session or infer access from a
   * locally stored restaurant application.
   */
  async function login(email, password) {
    if (!email || !password) throw new Error('Email and password are required');

    const account = CONFIG.ACCOUNTS.find(a => a.email.toLowerCase() === email.toLowerCase());

    const res = await fetch(`${CONFIG.GUARDIAN_URL}/accounts/loginByEmail`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) throw new Error(`Login failed: ${res.status}`);

    const data = await res.json();
    const refreshToken = data.login?.refreshToken || data.refreshToken;
    if (!refreshToken) throw new Error('No refreshToken in Guardian response');

    const accessToken = await _getAccessToken(refreshToken);
    const auth = {
      email,
      refreshToken,
      accessToken,
      ts: Date.now(),
      hedera: account?.hedera || null,
      role: account?.role || null,
    };

    _saveAuth(auth);
    return auth;
  }

  async function _getAccessToken(refreshToken) {
    const res = await fetch(`${CONFIG.GUARDIAN_URL}/accounts/access-token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });
    if (!res.ok) throw new Error(`Access token failed: ${res.status}`);
    const data = await res.json();
    if (!data.accessToken) throw new Error('No accessToken in Guardian response');
    return data.accessToken;
  }

  /** Returns a valid access token, refreshing when the local TTL expires. */
  async function getToken() {
    const auth = _loadAuth();
    if (!auth.refreshToken) throw new Error('Not logged in');

    if (auth.accessToken && (Date.now() - auth.ts) < CONFIG.TOKEN_TTL_MS) {
      return auth.accessToken;
    }

    const accessToken = await _getAccessToken(auth.refreshToken);
    auth.accessToken = accessToken;
    auth.ts = Date.now();
    _saveAuth(auth);
    return accessToken;
  }

  /** Generic authenticated GET to Guardian API. */
  async function get(path) {
    const token = await getToken();
    const res = await fetch(`${CONFIG.GUARDIAN_URL}${path}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.status === 401) {
      const auth = _loadAuth();
      auth.ts = 0;
      _saveAuth(auth);
      const newToken = await getToken();
      const retry = await fetch(`${CONFIG.GUARDIAN_URL}${path}`, {
        headers: { Authorization: `Bearer ${newToken}` },
      });
      if (!retry.ok) throw new Error(`Guardian GET ${path}: ${retry.status}`);
      return retry.json();
    }

    if (!res.ok) throw new Error(`Guardian GET ${path}: ${res.status}`);
    return res.json();
  }

  /**
   * Fetch documents from a specific policy block.
   * Live Guardian data is preferred for authenticated users; the repository
   * cache is a read-only public fallback and never grants authenticated access.
   */
  async function getBlockData(blockId) {
    if (isLoggedIn()) {
      try {
        return await get(`/policies/${CONFIG.POLICY_ID}/blocks/${blockId}?pageSize=50`);
      } catch (e) {
        console.warn('[Guardian] Live API failed, trying public cache:', e.message);
      }
    }

    const cached = await _tryCache(blockId);
    if (cached) return cached;

    if (!isLoggedIn()) throw new Error('Authentication required for live Guardian block data');
    return get(`/policies/${CONFIG.POLICY_ID}/blocks/${blockId}?pageSize=50`);
  }

  /** Load pre-fetched Guardian data from data/guardian-cache.json. */
  let _cachePromise = null;
  let _cacheTimestamp = 0;
  const CACHE_TTL_MS = 5 * 60 * 1000;

  async function _tryCache(blockId) {
    try {
      const now = Date.now();
      if (!_cachePromise || (now - _cacheTimestamp) > CACHE_TTL_MS) {
        _cachePromise = fetch('data/guardian-cache.json')
          .then(r => (r.ok ? r.json() : null))
          .catch(() => null);
        _cacheTimestamp = now;
      }

      const cache = await _cachePromise;
      if (!cache?.blocks) return null;
      const blockName = Object.keys(CONFIG.BLOCKS).find(k => CONFIG.BLOCKS[k] === blockId);
      return blockName ? cache.blocks[blockName] || null : null;
    } catch {
      return null;
    }
  }

  function isLoggedIn() {
    const auth = _loadAuth();
    return Boolean(auth.refreshToken && auth.accessToken);
  }

  function currentUser() {
    return _loadAuth();
  }

  function logout() {
    localStorage.removeItem(STORAGE_KEY);
  }

  /** Generic authenticated POST to Guardian API. */
  async function post(path, body) {
    const token = await getToken();
    const res = await fetch(`${CONFIG.GUARDIAN_URL}${path}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (res.status === 401) {
      const auth = _loadAuth();
      auth.ts = 0;
      _saveAuth(auth);
      const newToken = await getToken();
      const retry = await fetch(`${CONFIG.GUARDIAN_URL}${path}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${newToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      if (!retry.ok) throw new Error(`Guardian POST ${path}: ${retry.status}`);
      return retry.json();
    }

    if (!res.ok) throw new Error(`Guardian POST ${path}: ${res.status}`);
    return res.json();
  }

  /** Submit a waste delivery document to the published Guardian policy. */
  async function submitDelivery(doc) {
    return post(`/policies/${CONFIG.POLICY_ID}/blocks/${CONFIG.BLOCKS.PP_DELIVERY_FORM}`, {
      document: doc,
      ref: null,
    });
  }

  return {
    login,
    getToken,
    get,
    post,
    getBlockData,
    isLoggedIn,
    currentUser,
    logout,
    submitDelivery,
  };
})();
