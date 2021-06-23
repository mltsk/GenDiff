import yaml from 'js-yaml';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const parse = (filename) => {
  console.log('__dirname: ', __dirname);
  console.log('getFixturePath', getFixturePath(filename));
  const expansion = path.extname(filename);
  if (expansion === '.yml' || expansion === '.yaml') {
    return yaml.load(fs.readFileSync(getFixturePath(filename), 'utf8'));
  }
  return JSON.parse(fs.readFileSync(getFixturePath(filename), 'utf8'));
};

export default parse;
