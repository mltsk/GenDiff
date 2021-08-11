import _ from 'lodash';

const makeSpace = (offset, correction = 0) => ' '.repeat(offset + correction);

const getPrefix = (type) => {
  const prefix = {
    added: '+ ', removed: '- ', unchanged: '  ', nested: '  ',
  };
  return prefix[type];
};

const ObjectStylish = (obj, offset) => {
  const result = Object.entries(obj).reduce((acc, item) => {
    const [key, value] = item;
    const getValue = (element) => {
      if (_.isPlainObject(element)) {
        return ObjectStylish(element, offset + 4);
      }
      return element;
    };
    return [...acc, `${makeSpace(offset)}${key}: ${getValue(value)}`];
  }, ['{']);
  return [...result, [`${makeSpace(offset - 4)}}`]].join('\n');
};

const stringify = (element, key, offset) => {
  if (_.isObject(element.children)) {
    return formatStylish(element.children, offset + 4);
  }
  if (_.isPlainObject((element[key]))) {
    return ObjectStylish(element[key], offset + 4);
  }
  return element[key];
};

const formatStylish = (obj, offset = 4) => {
  const result = (obj.flatMap((item) => {
    const prefix = getPrefix(item.type);
    if (item.type === 'changed') {
      return [`${makeSpace(offset, -2)}- ${item.name}: ${stringify(item, 'value', offset)}`,
        `${makeSpace(offset, -2)}+ ${item.name}: ${stringify(item, 'newValue', offset)}`];
    }
    return [[`${makeSpace(offset, -2)}${prefix}${item.name}: ${stringify(item, 'value', offset)}`]];
  }));
  return ['{', result, [`${makeSpace(offset - 4)}}`]].flat().join('\n');
};

export default formatStylish;
