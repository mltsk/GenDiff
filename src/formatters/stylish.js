const makeSpace = (offset, correction = 0) => ' '.repeat(offset + correction);

const getPrefix = (type) => {
  const prefix = { added: '+ ', removed: '- ', unchanged: '  ' };
  return prefix[type];
};

const ObjectStylish = (obj, offset) => {
  const result = Object.entries(obj).reduce((acc, item) => {
    const [key, value] = item;
    const getValue = (element) => {
      if (typeof (element) === 'object' && element !== null) {
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
      if (typeof (element.children) === 'object') {
        return stylish(element.children, offset + 4);
      }
      if (typeof (element[key]) === 'object' && element[key] !== null) {
        return ObjectStylish(element[key], offset + 4);
      }
      return item[key];
    };
    const { name, type } = item;
    const prefix = getPrefix(type);

    if (type === 'updated') {
      return [...acc, [`${makeSpace(offset, -2)}- ${name}: ${formatValue(item, 'value')}`],
        [`${makeSpace(offset, -2)}+ ${name}: ${formatValue(item, 'newValue')}`]];
    }
    return [...acc, [`${makeSpace(offset, -2)}${prefix}${name}: ${formatValue(item, 'value')}`]];
  }, ['{']);
  return [...result, [`${makeSpace(offset - 4)}}`]].join('\n');
};

export default stylish;
