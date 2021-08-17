import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.resolve(__dirname, '..', '__fixtures__', filename);

const expectedStylish = fs.readFileSync(getFixturePath('expected_stylish.txt'), 'utf-8');
const expectedPlain = fs.readFileSync(getFixturePath('expected_plain.txt'), 'utf-8');
const expectedJson = fs.readFileSync(getFixturePath('expected_json.txt'), 'utf-8');

const formats = ['json', 'yaml'];

test.each(formats)('genDiff %s', (format) => {
  expect(genDiff(getFixturePath(`file1.${format}`), getFixturePath(`file2.${format}`), 'stylish')).toBe(expectedStylish);
  expect(genDiff(getFixturePath(`file1.${format}`), getFixturePath(`file2.${format}`), 'plain')).toBe(expectedPlain);
  expect(genDiff(getFixturePath(`file1.${format}`), getFixturePath(`file2.${format}`), 'json')).toBe(expectedJson);
});
