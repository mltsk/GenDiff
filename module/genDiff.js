import _ from 'lodash';
import { stylish, plain, json } from '../formatters/index.js';
import parse from './parsers.js';

const makePath = (property1, property2) => (property1 ? `${property1}.${property2}` : property2);

const removePath = (property, key) => {
  property.replace(`.${key}`, '');
};

const getFormatter = (format) => {
  if (format === 'plain') {
    return plain;
  } if (format === 'json') {
    return json;
  }
  return stylish;
};

export default function genDiff(filepath1, filepath2, format) {
  const fileData1 = parse(filepath1);
  const fileData2 = parse(filepath2);

  const diff = (data1, data2, property) => {
    const key1 = _.keys(data1);
    const key2 = _.keys(data2);
    const keys = _.uniq((key1).concat(key2));
    const keysSorted = _.sortBy(keys);

    const result = keysSorted.reduce((acc, key) => {
      const nameAndProperty = { name: `${key}`, property: `${makePath(property, `${key}`)}` };
      removePath(property, `${key}`);
      if ((typeof (data1[key]) === 'object' && typeof (data2[key]) === 'object')) {
        return [...acc, {
          ...nameAndProperty, status: 'unchanged', value: '[complex value]', children: diff(data1[key], data2[key], makePath(property, key)),
        }];
      } if (key1.includes(key) && key2.includes(key) && data1[key] === data2[key]) {
        return [...acc, { ...nameAndProperty, status: 'unchanged', value: data1[key] }];
      } if (key1.includes(key) && key2.includes(key) && data1[key] !== data2[key]) {
        return [...acc, {
          ...nameAndProperty, status: 'updated', value: data1[key], newValue: data2[key],
        }];
      } if (key1.includes(key)) {
        return [...acc, { ...nameAndProperty, status: 'removed', value: data1[key] }];
      }
      return [...acc, { ...nameAndProperty, status: 'added', value: data2[key] }];
    }, '');
    return result;
  };
  const formatter = getFormatter(format);
  return formatter(diff(fileData1, fileData2, ''));
}
