import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.resolve(__dirname, '..', '__fixtures__', filename);

const jsonFilePath1 = getFixturePath('file1.json');
const jsonFilePath2 = getFixturePath('file2.json');
const yamlFilePath1 = getFixturePath('file1.yaml');
const yamlFilePath2 = getFixturePath('file2.yaml');
const expectedStylish = fs.readFileSync(getFixturePath('expected_stylish.txt'), 'utf-8');
const expectedPlain = fs.readFileSync(getFixturePath('expected_plain.txt'), 'utf-8');
const expectedJson = fs.readFileSync(getFixturePath('expected_json.txt'), 'utf-8');

test('stylish json', () => {
  const actual = genDiff(jsonFilePath1, jsonFilePath2, 'stylish');
  expect(actual).toBe(expectedStylish);
});

test('stylish yaml', () => {
  const actual = genDiff(yamlFilePath1, yamlFilePath2, 'stylish');
  expect(actual).toBe(expectedStylish);
});

test('plain', () => {
  const actual = genDiff(jsonFilePath1, jsonFilePath2, 'plain');
  expect(actual).toEqual(expectedPlain);
});

test('json', () => {
  const actual = genDiff(jsonFilePath1, jsonFilePath2, 'json');
  expect(actual).toEqual(expectedJson);
});
