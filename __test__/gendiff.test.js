import genDiff from '../module/genDiff.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);


test('genDiff', () => {

const reference = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

  // const reference = readFileSync(getFixturePath('expected_file.txt'), 'utf8').toString();

  const actual = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));

  expect(actual).toEqual(reference);
});

// console.log(genDiff('./files/file1.json', './files/file2.json'));


// const reference = readFileSync(getFixturePath('expected_file.txt'), 'utf8').toString();
// console.log(reference);
// const actual = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
// console.log(actual);
