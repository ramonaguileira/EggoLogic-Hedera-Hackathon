# Eggologic — Circular Impact Infrastructure on Hedera

Eggologic is a circular-bioeconomy project that tracks the diversion and regenerative bioconversion of organic waste. The repository combines a browser dashboard, Hedera Mirror Node integrations and a published Hedera Guardian policy implementing **EWD-RB v0.3**.

The current flow is designed around traceable operational records:

**restaurant organic waste → verified delivery → processing / bioconversion → regenerative outputs → auditable impact records**

> This repository documents a testnet implementation. The Circular Impact NFT (CIN) is an EWD-RB impact/issuance record; this repository does not present CIN as an independently certified carbon credit.

## Current Hedera / Guardian deployment

| Component | Current reference |
|---|---|
| Network | Hedera Testnet |
| Guardian policy | EWD-RB v0.3 |
| Guardian policy ID | `69bc4638e755119d0774dd03` |
| Policy topic | `0.0.8291451` |
| Instance topic | `0.0.8294148` |
| Guardian MGS | `3.5.1` |
| EGGOCOIN | `0.0.8287358` |
| Circular Impact NFT (CIN) | `0.0.8287362` |

### Roles

- `OWNER`
- `Registry`
- `Project_Proponent`
- `Operator`
- `VVB`

Authentication is **fail-closed**: the dashboard only treats a user as authenticated after a successful Guardian login. The repository does not contain a demo password fallback or privileged-role auto-login path.

## EWD-RB v0.3 schemas

The repository contains the eight schema contracts used to document the EWD-RB v0.3 workflow:

| # | Schema | Published Guardian identity |
|---:|---|---|
| 1 | Supplier Registration | `#85f16b9d-f3f8-4763-9522-8977957ccb6f&1.0.0` |
| 2 | Waste Delivery | `#8f0b83a5-da18-47ac-a849-e2f46d3ae9b6&1.0.0` |
| 3 | Waste Batch | `#5414b8bf-f06c-4129-bdf1-033f76090714&1.0.0` |
| 4 | Production Output | `#379210b0-4291-4b40-abb6-45c3d221ba03&1.0.0` |
| 5 | Impact Calculation | `#35dd5b7f-5f1c-46f0-809e-26a0e3fd6198&1.0.0` |
| 6 | VVB Assessment Record | `#9a08c91d-9414-4d94-8d0b-cf0e20905777&1.0.0` |
| 7 | External Validation Record | `#912044fe-8201-4227-bc4a-5c001aa59a6c&1.0.0` |
| 8 | Issuance Record | `#70fca042-7578-4607-92d3-171a903bfb88&1.0.0` |

### Schema provenance

Direct access to the currently published Guardian policy is unavailable. The standalone JSON files under `guardian/schemas/` were therefore **reconstructed from project artifacts** rather than represented as byte-for-byte exports of the published policy.

The reconstruction is based on:

1. the EWD-RB v0.3 methodology source containing the eight JSON Schema definitions;
2. a historical Guardian Dry Run policy export confirming the eight-schema workflow structure;
3. Guardian-format draft schema exports used as structural cross-checks;
4. known published schema UUID/version references already documented in the project;
5. repository credentials/VC cache evidence for the published Waste Delivery and Impact Calculation schema references.

See [`guardian/README.md`](guardian/README.md), [`guardian/policy-manifest.json`](guardian/policy-manifest.json) and [`guardian/schemas/schema-index.json`](guardian/schemas/schema-index.json) for the detailed provenance record.

## Core EWD-RB logic represented in the dashboard

### Waste Delivery

The current dashboard records the EWD-RB delivery data used by the published policy workflow, including gross weight, contaminants, net weight, adjusted weight, category and evidence.

The operational calculation currently represented by the dashboard is:

```text
kg_netos = kg_bruto - kg_impropios
kg_ajustados = kg_netos × 0.70
```

Accepted deliveries proceed to a **separate VVB approval step**. The dashboard does not approve deliveries on behalf of the VVB.

### Circular Impact NFT (CIN)

The reconstructed Impact Calculation schema encodes:

```text
nft_threshold_kg = 1000
```

The dashboard therefore represents one CIN issuance unit per **1,000 verified adjusted kg**, subject to the Guardian/VVB workflow. Legacy references to `CIT` and a 10,000-$EGGO threshold have been removed from the active dashboard.

## Security model

The current repository intentionally removes hackathon-only shortcuts that were unsuitable for continued use:

- no fail-open `offline-mode` authentication;
- no local restaurant password authentication;
- no VVB auto-approval backdoor;
- no silent VVB impersonation from the impact dashboard;
- no demo password prefilled in the login form;
- no registration passwords stored in `localStorage`;
- legacy locally stored application passwords are stripped by the dashboard when encountered.

Public visitors can use read-only cached Guardian data where appropriate. Role-restricted live Guardian data requires a real authenticated Guardian session.

> Historical Git commits may still contain old demo credentials. If access to the corresponding Guardian accounts is recovered, those credentials should be rotated before reuse.

## Repository structure

```text
.
├── dashboard/
│   ├── index.html
│   ├── impact.html
│   ├── wallet.html
│   ├── marketplace.html
│   ├── data/
│   │   └── guardian-cache.json
│   └── js/
│       ├── api.js
│       ├── config.js
│       ├── dashboard.js
│       ├── hedera.js
│       ├── impact.js
│       ├── ui.js
│       └── wallet.js
├── guardian/
│   ├── README.md
│   ├── policy-manifest.json
│   └── schemas/
│       ├── schema-index.json
│       ├── supplier-registration.schema.json
│       ├── waste-delivery.schema.json
│       ├── waste-batch.schema.json
│       ├── production-output.schema.json
│       ├── impact-calculation.schema.json
│       ├── vvb-assessment-record.schema.json
│       ├── external-validation-record.schema.json
│       └── issuance-record.schema.json
├── docs/
├── tests/
└── package.json
```

## Run locally

Requirements:

- Node.js 20+ recommended for the test tooling.
- A modern browser.

Install dependencies and run the dashboard:

```bash
npm ci
npm run dashboard:dev
```

Then open the local URL printed by `serve`.

Guardian-authenticated actions require valid credentials for the appropriate Guardian account/role. No credentials are included in this repository.

## Tests

Run the complete Jest suite:

```bash
npm test
```

The suite covers the API wrapper, Hedera helper surface, UI module, security regression checks and Guardian schema integrity. In particular, tests guard against reintroducing the removed VVB/authentication bypasses and validate the eight EWD-RB schema identities.

## Important implementation limitations

- The current published Guardian policy cannot be re-exported from the original Standard Registry account, so reconstructed schema JSON is explicitly labeled as such.
- `dashboard/data/guardian-cache.json` is a read-only snapshot and may contain historical credentials issued under earlier Guardian runtime metadata.
- The project is on Hedera Testnet; token IDs and policy references in this repository are testnet references.
- Regulatory, carbon-accounting or certification claims require the relevant independent validation beyond the technical traceability demonstrated here.

## License

MIT. See [`LICENSE`](LICENSE).
