import _ from 'lodash';

const builtDiff = (data1, data2) => {
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
        name: key, type: 'nested', children: builtDiff(data1[key], data2[key]),
      };
    } if (data1[key] !== data2[key]) {
      return {
        name: key, type: 'changed', value: data1[key], newValue: data2[key],
      };
    }
    return {
        name: key, type: 'unchanged', value: data1[key],
    };
  });
  return result;
};

export default builtDiff;
