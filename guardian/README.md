# Guardian — EWD-RB v0.3

This directory documents the **published EWD-RB v0.3 Guardian policy** used by Eggologic on Hedera testnet and contains a complete repository-side reconstruction of its eight methodology schemas.

> **Provenance note:** direct access to the currently published Guardian policy is not available. The JSON schemas in `guardian/schemas/` were reconstructed from the project owner's EWD-RB v0.3 methodology source, cross-checked against a historical Guardian Dry Run policy export and Guardian-format draft schema exports. They are valid standalone JSON Schemas, but are **not claimed to be byte-for-byte authoritative exports** of the currently published Guardian schema records.

> The previous repository documentation described six legacy schemas (`entrega`, `supplier`, `batch`, `production`, `points`, `carbon-credit`). Those are not the current EWD-RB v0.3 schema set and must not be restored as current policy assets.

## Published policy identity

| Property | Value |
|---|---|
| Policy | EWD-RB |
| Methodology version | `0.3.0` |
| Status | Published |
| Guardian policy ID | `69bc4638e755119d0774dd03` |
| Policy topic | `0.0.8291451` |
| Instance topic | `0.0.8294148` |
| Guardian MGS | `3.5.1` |
| EGGOCOIN | `0.0.8287358` |
| CIN NFT | `0.0.8287362` |

Machine-readable metadata is stored in [`policy-manifest.json`](./policy-manifest.json).

## EWD-RB schema set

| # | Schema | Published Guardian reference | Repository JSON |
|---|---|---|---|
| 1 | Supplier Registration | `#85f16b9d-f3f8-4763-9522-8977957ccb6f&1.0.0` | [`supplier-registration.schema.json`](./schemas/supplier-registration.schema.json) |
| 2 | Waste Delivery | `#8f0b83a5-da18-47ac-a849-e2f46d3ae9b6&1.0.0` | [`waste-delivery.schema.json`](./schemas/waste-delivery.schema.json) |
| 3 | Waste Batch | `#5414b8bf-f06c-4129-bdf1-033f76090714&1.0.0` | [`waste-batch.schema.json`](./schemas/waste-batch.schema.json) |
| 4 | Production Output | `#379210b0-4291-4b40-abb6-45c3d221ba03&1.0.0` | [`production-output.schema.json`](./schemas/production-output.schema.json) |
| 5 | Impact Calculation | `#35dd5b7f-5f1c-46f0-809e-26a0e3fd6198&1.0.0` | [`impact-calculation.schema.json`](./schemas/impact-calculation.schema.json) |
| 6 | VVB Assessment Record | `#9a08c91d-9414-4d94-8d0b-cf0e20905777&1.0.0` | [`vvb-assessment-record.schema.json`](./schemas/vvb-assessment-record.schema.json) |
| 7 | External Validation Record | `#912044fe-8201-4227-bc4a-5c001aa59a6c&1.0.0` | [`external-validation-record.schema.json`](./schemas/external-validation-record.schema.json) |
| 8 | Issuance Record | `#70fca042-7578-4607-92d3-171a903bfb88&1.0.0` | [`issuance-record.schema.json`](./schemas/issuance-record.schema.json) |

The published UUID/version references above are kept separately from the reconstructed JSON content. This prevents the repository from falsely asserting that a reconstructed file is an official Guardian export.

## Reconstruction basis

The reconstruction uses three project-provided sources:

1. **EWD-RB v0.3 methodology source** — contains eight JSON Schema blocks plus common `$defs` for UUIDs, evidence references and geographic location.
2. **Historical Guardian Dry Run policy export** — confirms the eight-schema workflow structure, roles and Guardian block relationships, but belongs to an earlier Dry Run policy with different IDs/tokens.
3. **Guardian-format draft schema exports** — provide an additional structural cross-check for Supplier Registration and Impact Calculation.

The repository schemas embed the common `$defs` into every file so each file resolves its own `$ref` values and can be validated independently.

## Corrected source inconsistency

The supplied `VVB Assessment Record` source declared these properties:

- `assessment_id`
- `assessed_at`
- `assessment_evidence`

but its `required` list incorrectly referenced:

- `verification_id`
- `verified_at`
- `verification_evidence`

The repository reconstruction corrects the `required` list to match the declared assessment fields. The correction is explicitly documented in the schema `$comment` and in the manifest/index.

## Validation status

All eight reconstructed files were checked as JSON Schema Draft 2020-12 schemas after embedding the shared `$defs`.

The current dashboard cache independently contains issued credentials referencing the published Waste Delivery schema (`#8f0b83a5-da18-47ac-a849-e2f46d3ae9b6&1.0.0`) and Impact Calculation schema (`#35dd5b7f-5f1c-46f0-809e-26a0e3fd6198&1.0.0`), providing repository-side evidence that those published references are active policy identifiers rather than placeholders.

## Directory structure

```text
guardian/
├── README.md
├── policy-manifest.json
└── schemas/
    ├── schema-index.json
    ├── supplier-registration.schema.json
    ├── waste-delivery.schema.json
    ├── waste-batch.schema.json
    ├── production-output.schema.json
    ├── impact-calculation.schema.json
    ├── vvb-assessment-record.schema.json
    ├── external-validation-record.schema.json
    └── issuance-record.schema.json
```

If Standard Registry access is recovered in the future, the authoritative Guardian exports can be compared against these files and any differences documented without losing this reconstruction history.

Do not reintroduce the removed legacy `CARBONCOIN` / `EGGOCOINS` schema set as the current EWD-RB policy schemas.
