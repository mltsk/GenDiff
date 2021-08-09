import path from 'path';
import getFormatter from './formatters/index.js';
import parse from './parsers.js';
import getFileData from './getFileData.js';
import builtDiff from './builtDiff.js';

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const fileData1 = parse(getFileData(filepath1), path.extname(filepath1));
  const fileData2 = parse(getFileData(filepath2), path.extname(filepath2));
  const formatter = getFormatter(formatName);
  return formatter(builtDiff(fileData1, fileData2));
};

export default genDiff;
