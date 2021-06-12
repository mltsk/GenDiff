import yaml from 'js-yaml';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const parse = (filename) => {
  const data = yaml.load(fs.readFileSync(getFixturePath(filename), 'utf8'));
  return data;
};

export default parse;
