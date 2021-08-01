import _ from 'lodash';
import getFormatter from './formatters/index.js';
import parse from './parsers.js';
import getFileData from './getFileData.js';

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const fileData1 = parse(...getFileData(filepath1));
  const fileData2 = parse(...getFileData(filepath2));

  const diff = (data1, data2) => {
    const keys1 = _.keys(data1);
    const keys2 = _.keys(data2);
    const sortedKeys = _.sortBy(_.union(keys2, keys1));

    const result = sortedKeys.map((key) => {
      if (!_.has(data2, key)) {
        return {
          name: key, type: 'removed', value: data1[key],
        };
      } if (!_.has(data1, key)) {
        return {
          name: key, type: 'added', value: data2[key],
        };
      } if ((_.isObject(data1[key]) && _.isObject(data2[key]))) {
        return {
          name: key, type: 'unchanged', value: '[complex value]', children: diff(data1[key], data2[key]),
        };
      } if (data1[key] === data2[key]) {
        return {
          name: key, type: 'unchanged', value: data1[key],
        };
      }
      return {
        name: key, type: 'updated', value: data1[key], newValue: data2[key],
      };
    });
    return result;
  };
  const formatter = getFormatter(formatName);
  return formatter(diff(fileData1, fileData2));
};

export default genDiff;
