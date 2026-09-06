const fs = require('fs');
const path = require('path');

const manifest = JSON.parse(fs.readFileSync('guardian/policy-manifest.json', 'utf8'));
const index = JSON.parse(fs.readFileSync('guardian/schemas/schema-index.json', 'utf8'));

const expected = [
  '85f16b9d-f3f8-4763-9522-8977957ccb6f',
  '8f0b83a5-da18-47ac-a849-e2f46d3ae9b6',
  '5414b8bf-f06c-4129-bdf1-033f76090714',
  '379210b0-4291-4b40-abb6-45c3d221ba03',
  '35dd5b7f-5f1c-46f0-809e-26a0e3fd6198',
  '9a08c91d-9414-4d94-8d0b-cf0e20905777',
  '912044fe-8201-4227-bc4a-5c001aa59a6c',
  '70fca042-7578-4607-92d3-171a903bfb88'
];

describe('EWD-RB Guardian assets', () => {
  test('manifest and index describe exactly the eight known published schema identities', () => {
    expect(manifest.schemas).toHaveLength(8);
    expect(index.schemas).toHaveLength(8);
    expect(manifest.schemas.map(s => s.uuid)).toEqual(expected);
    expect(index.schemas.map(s => s.uuid)).toEqual(expected);
  });

  test('all reconstructed standalone schema files exist and include local common defs', () => {
    for (const entry of index.schemas) {
      expect(entry.repositorySchemaFile).toBeTruthy();
      const schemaPath = path.join('guardian', 'schemas', entry.repositorySchemaFile);
      expect(fs.existsSync(schemaPath)).toBe(true);
      const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
      expect(schema.$defs && schema.$defs.uuid).toBeTruthy();
      expect(schema.$defs && schema.$defs.evidenceRefs).toBeTruthy();
    }
  });

  test('VVB Assessment required fields match declared properties', () => {
    const schema = JSON.parse(fs.readFileSync('guardian/schemas/vvb-assessment-record.schema.json', 'utf8'));
    for (const required of schema.required) {
      expect(schema.properties[required]).toBeTruthy();
    }
    expect(schema.required).toContain('assessment_id');
    expect(schema.required).toContain('assessed_at');
    expect(schema.required).toContain('assessment_evidence');
    expect(schema.required).not.toContain('verification_id');
  });

  test('Impact Calculation encodes the EWD-RB 1,000 kg CIN threshold', () => {
    const schema = JSON.parse(fs.readFileSync('guardian/schemas/impact-calculation.schema.json', 'utf8'));
    expect(schema.properties.nft_threshold_kg.const).toBe(1000);
  });
});
