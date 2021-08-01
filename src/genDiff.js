import _ from 'lodash';
import getFormatter from './formatters/index.js';
import parse from './parsers.js';
import getFileData from './getFileData.js';

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const fileData1 = parse(...getFileData(filepath1));
  const fileData2 = parse(...getFileData(filepath2));

  const diff = (data1, data2) => {
    const key1 = _.keys(data1);
    const key2 = _.keys(data2);
    const keys = _.union(key2, key1);
    const keysSorted = _.sortBy(keys);

    const result = keysSorted.map((key) => {
      const name = { name: key };
      if ((_.isObject(data1[key]) && _.isObject(data2[key]))) {
        return {
          ...name, type: 'unchanged', value: '[complex value]', children: diff(data1[key], data2[key]),
        };
      } if (key1.includes(key) && key2.includes(key) && data1[key] === data2[key]) {
        return {
          ...name, type: 'unchanged', value: data1[key],
        };
      } if (key1.includes(key) && key2.includes(key) && data1[key] !== data2[key]) {
        return {
          ...name, type: 'updated', value: data1[key], newValue: data2[key],
        };
      } if (key1.includes(key)) {
        return {
          ...name, type: 'removed', value: data1[key],
        };
      }
      return {
        ...name, type: 'added', value: data2[key],
      };
    });
    return result;
  };
  const formatter = getFormatter(formatName);
  return formatter(diff(fileData1, fileData2));
};

export default genDiff;
