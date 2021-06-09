import _ from 'lodash';
import { stylish, plain, json } from '../formatters/index.js';

const path = (property1, property2) => (property1 ? `${property1}.${property2}` : property2);

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

export default function genDiff(file1, file2, format = 'stylish') {
  const diff = (data1, data2, property = '') => {
    const result = [];
    const key1 = _.keys(data1);
    const key2 = _.keys(data2);
    const keys = _.uniq((key1).concat(key2));
    const keysSorted = _.sortBy(keys);

    keysSorted.forEach((key) => {
      const temp = {};
      temp.name = `${key}`;
      temp.property = `${path(property, `${key}`)}`;

      if ((typeof (data1[key]) === 'object' && typeof (data2[key]) === 'object')) {
        temp.status = 'unchanged';
        temp.value = '[complex value]';
        temp.children = (diff(data1[key], data2[key], `${path(property, `${key}`)}`));
        removePath(property, `${key}`);
      } else if (key1.includes(key) && key2.includes(key) && data1[key] === data2[key]) {
        temp.status = 'unchanged';
        temp.value = data1[key];
      } else if (key1.includes(key) && key2.includes(key) && data1[key] !== data2[key]) {
        temp.status = 'updated';
        temp.value = data1[key];
        temp.newValue = data2[key];
      } else if (key1.includes(key)) {
        temp.status = 'removed';
        temp.value = data1[key];
      } else {
        temp.status = 'added';
        temp.value = data2[key];
      }

      result.push(temp);
    });
    return result;
  };

  const formatter = getFormatter(format);

  return formatter(diff(file1, file2));
}
