import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';

const readFile = (fileName) => {
  const fullPath = path.resolve(process.cwd(), '__fixtures__', fileName);
  const data = fs.readFileSync(fullPath, 'utf8').toString();
  return data;
};

const parse = (fileName) => {
  const expansion = path.extname(fileName);
  if (expansion === '.yml' || expansion === '.yaml') {
    return yaml.load(readFile(fileName));
  }
  return JSON.parse(readFile(fileName));
};

export default parse;
