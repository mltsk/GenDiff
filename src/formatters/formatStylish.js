import _ from 'lodash';

const makeSpace = (offset, correction = 0) => ' '.repeat(offset + correction);

const getPrefix = (type) => {
  const prefix = { added: '+ ', removed: '- ', unchanged: '  ', nested: '  ' };
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

const stylish = (obj, offset = 4) => {
  const result = obj.reduce((acc, item) => {
    const formatValue = (element, key) => {
      if (_.isObject(element.children)) {
        return stylish(element.children, offset + 4);
      }
      if (_.isPlainObject((element[key]))) {
        return ObjectStylish(element[key], offset + 4);
      }
      return item[key];
    };
    const prefix = getPrefix(item.type);
    if (item.type === 'changed') {
      return [...acc, [`${makeSpace(offset, -2)}- ${item.name}: ${formatValue(item, 'value')}`],
        [`${makeSpace(offset, -2)}+ ${item.name}: ${formatValue(item, 'newValue')}`]];
    }
    return [...acc, [`${makeSpace(offset, -2)}${prefix}${item.name}: ${formatValue(item, 'value')}`]];
  }, ['{']);
  return [...result, [`${makeSpace(offset - 4)}}`]].join('\n');
};

export default stylish;
