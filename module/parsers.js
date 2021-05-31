import yaml from 'js-yaml';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const parsers = (filename) => {
  const data = yaml.load(fs.readFileSync(getFixturePath(filename), 'utf8'));
  return data;
};

// console.log('11111', parsers('file3.json').common.setting6);

export default parsers;
