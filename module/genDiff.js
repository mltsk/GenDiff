import _ from 'lodash';
import { stylish, plain, json } from '../formatters/index.js';
import parse from './parsers.js';

const makePath = (property1, property2) => (property1 ? `${property1}.${property2}` : property2);

const getFormatter = (format) => {
  if (format === 'plain') {
    return plain;
  } if (format === 'json') {
    return json;
  }
  return stylish;
};

const genDiff = (filepath1, filepath2, format) => {
  const fileData1 = parse(filepath1);
  const fileData2 = parse(filepath2);

  const diff = (data1, data2, path = '') => {
    const key1 = _.keys(data1);
    const key2 = _.keys(data2);
    const keys = _.uniq((key1).concat(key2));
    const keysSorted = _.sortBy(keys);

    const result = keysSorted.reduce((acc, key) => {
      const name = { name: key };
      const property = { property: makePath(path, key) };
      if ((typeof (data1[key]) === 'object' && typeof (data2[key]) === 'object')) {
        return [...acc, {
          ...name, ...property, status: 'unchanged', value: '[complex value]', children: diff(data1[key], data2[key], makePath(path, key)),
        }];
      } if (key1.includes(key) && key2.includes(key) && data1[key] === data2[key]) {
        return [...acc, {
          ...name, ...property, status: 'unchanged', value: data1[key],
        }];
      } if (key1.includes(key) && key2.includes(key) && data1[key] !== data2[key]) {
        return [...acc, {
          ...name, ...property, status: 'updated', value: data1[key], newValue: data2[key],
        }];
      } if (key1.includes(key)) {
        return [...acc, {
          ...name, ...property, status: 'removed', value: data1[key],
        }];
      }
      return [...acc, {
        ...name, ...property, status: 'added', value: data2[key],
      }];
    }, '');
    return result;
  };
  const formatter = getFormatter(format);
  return formatter(diff(fileData1, fileData2));
}

export default genDiff;
