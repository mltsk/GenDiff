import genDiff from '../index.js';
import readFile from '../src/module/readFile.js';

test('stylish json', () => {
  const expected = readFile('expected_stylish.txt')[0];

  const actual = genDiff('file1.json', 'file2.json', 'stylish');
  expect(actual).toBe(expected);
});

test('stylish yaml', () => {
  const expected = readFile('expected_stylish.txt')[0];

  const actual = genDiff('file1.yaml', 'file2.yaml', 'stylish');
  expect(actual).toBe(expected);
});

test('plain', () => {
  const expected = readFile('expected_plain.txt')[0];

  const actual = genDiff('file1.json', 'file2.json', 'plain');
  expect(actual).toEqual(expected);
});

test('json', () => {
  const expected = readFile('expected_json.txt')[0];

  const actual = genDiff('file1.json', 'file2.json', 'json');
  expect(actual).toEqual(expected);
});
