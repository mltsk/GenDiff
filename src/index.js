import fs from 'fs';
import path from 'path';
import getFormatter from './formatters/index.js';
import parse from './parsers.js';
import buildTree from './treeBuilder.js';

const getFormat = (filepath) => path.extname(filepath).replace('.', '');

const getFileData = (fileName) => {
  const fullPath = path.resolve(process.cwd(), fileName);
  const data = fs.readFileSync(fullPath, 'utf-8');
  return data;
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const fileData1 = parse(getFileData(filepath1), getFormat(filepath1));
  const fileData2 = parse(getFileData(filepath2), getFormat(filepath2));
  const format = getFormatter(formatName);
  return format(buildTree(fileData1, fileData2));
};

export default genDiff;
