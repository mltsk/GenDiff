import _ from 'lodash';
import { stylish, plain, json } from '../formatters/index.js';
import parse from './parsers.js';
import readFile from './readFile';

const makePath = (property1, property2) => (property1 ? `${property1}.${property2}` : property2);

const getFormatter = (formatName) => {
  switch (formatName) {
    case 'plain':
      return plain;
    case 'json':
      return json;
    case 'stylish':
      return stylish;
    default:
      throw new Error('Unknown format!');
  }
};

const genDiff = (filepath1, filepath2, formatName) => {
  const fileData1 = parse(...readFile(filepath1));
  const fileData2 = parse(...readFile(filepath2));

  const diff = (data1, data2, path = '') => {
    const key1 = _.keys(data1);
    const key2 = _.keys(data2);
    const keys = _.uniq((key1).concat(key2));
    const keysSorted = _.sortBy(keys);

    const result = keysSorted.map((key) => {
      const name = { name: key };
      const property = { property: makePath(path, key) };
      if ((typeof (data1[key]) === 'object' && typeof (data2[key]) === 'object')) {
        return {
          ...name, ...property, type: 'unchanged', value: '[complex value]', children: diff(data1[key], data2[key], makePath(path, key)),
        };
      } if (key1.includes(key) && key2.includes(key) && data1[key] === data2[key]) {
        return {
          ...name, ...property, type: 'unchanged', value: data1[key],
        };
      } if (key1.includes(key) && key2.includes(key) && data1[key] !== data2[key]) {
        return {
          ...name, ...property, type: 'updated', value: data1[key], newValue: data2[key],
        };
      } if (key1.includes(key)) {
        return {
          ...name, ...property, type: 'removed', value: data1[key],
        };
      }
      return {
        ...name, ...property, type: 'added', value: data2[key],
      };
    });
    return result;
  };
  const formatter = getFormatter(formatName);
  return formatter(diff(fileData1, fileData2));
};

export default genDiff;
