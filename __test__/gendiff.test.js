import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.resolve(__dirname, '..', '__fixtures__', filename);

const jsonFilePath1 = getFixturePath('file1.json');
const jsonFilePath2 = getFixturePath('file2.json');

test('stylish json', () => {
  const expected = fs.readFileSync(getFixturePath('expected_stylish.txt'), 'utf-8');
  const actual = genDiff(jsonFilePath1, jsonFilePath2, 'stylish');
  expect(actual).toBe(expected);
});

test('stylish yaml', () => {
  const expected = fs.readFileSync(getFixturePath('expected_stylish.txt'), 'utf-8');
  const yamlFilePath1 = getFixturePath('file1.yaml');
  const yamlFilePath2 = getFixturePath('file2.yaml');
  const actual = genDiff(yamlFilePath1, yamlFilePath2, 'stylish');
  expect(actual).toBe(expected);
});

test('plain', () => {
  const expected = fs.readFileSync(getFixturePath('expected_plain.txt'), 'utf-8');

  const actual = genDiff(jsonFilePath1, jsonFilePath2, 'plain');
  expect(actual).toEqual(expected);
});

test('json', () => {
  const expected = fs.readFileSync(getFixturePath('expected_json.txt'), 'utf-8');

  const actual = genDiff(jsonFilePath1, jsonFilePath2, 'json');
  expect(actual).toEqual(expected);
});
