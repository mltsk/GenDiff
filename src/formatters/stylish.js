import _ from 'lodash';

const makeSpace = (depth, correction = 0) => {
  const indent = 4;
  return ' '.repeat(depth * indent + correction);
};

const stringify = (value, depth) => {
  if (!_.isPlainObject(value)) {
    return String(value);
  }
  const lines = Object
    .entries(value)
    .map(([key, val]) => `${makeSpace(depth)}${key}: ${stringify(val, depth + 1)}`);
  return ['{', ...lines, `${makeSpace(depth - 1)}}`].join('\n');
};

const formatStylish = (object) => {
  const iter = (obj, depth = 1) => {
    const result = (obj.flatMap((item) => {
      switch (item.type) {
        case 'added':
          return `${makeSpace(depth, -2)}+ ${item.name}: ${stringify(item.value, depth + 1)}`;
        case 'removed':
          return `${makeSpace(depth, -2)}- ${item.name}: ${stringify(item.value, depth + 1)}`;
        case 'nested':
          return `${makeSpace(depth)}${item.name}: ${iter(item.children, depth + 1)}`;
        case 'changed':
          return [`${makeSpace(depth, -2)}- ${item.name}: ${stringify(item.value, depth + 1)}`,
            `${makeSpace(depth, -2)}+ ${item.name}: ${stringify(item.newValue, depth + 1)}`];
        case 'unchanged':
          return `${makeSpace(depth)}${item.name}: ${stringify(item.value, depth + 1)}`;
        default:
          throw new Error(`Unknown type: ${item.type}!`);
      }
    }));
    return ['{', result, `${makeSpace(depth - 1)}}`].flat().join('\n');
  };
  return iter(object);
};
export default formatStylish;
