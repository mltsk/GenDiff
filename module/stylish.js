const makeSpace = (offset, symbol, correction = 0) => symbol.repeat(offset + correction);

const getPrefix = (status) => {
  const prefix = { added: '+ ', removed: '- ', unchanged: '  ' };
  return prefix[status];
};

const ObjectStylish = (obj, symbol, offset) => {
  const result = Object.entries(obj).reduce((acc, item) => {
    const [key, value] = item;
    const getValue = (value) => {
      if (typeof (value) === 'object' && value !== null) {
        return ObjectStylish(value, symbol, offset + 4);
      }
      return value;
    };
    return [...acc, `${makeSpace(offset, symbol)}${key}: ${getValue(value)}`];
  }, ['{']);
  return [...result, [`${makeSpace(offset - 4, symbol)}}`]].join('\n');
};

const stylish = (obj, symbol = ' ', offset = 4) => {
  const result = obj.reduce((acc, item) => {
    const formatValue = (item, key) => {
      if (typeof (item.children) === 'object') {
        return stylish(item.children, symbol, offset + 4);
      }
      if (typeof (item[key]) === 'object' && item[key] !== null) {
        return ObjectStylish(item[key], symbol, offset + 4);
      }
      return item[key];
    };

    if (item.status === 'updated') {
      return [...acc, [`${makeSpace(offset, symbol, -2)}${getPrefix('removed')}${item.name}: ${formatValue(item, 'value')}`],
        [`${makeSpace(offset, symbol, -2)}${getPrefix('added')}${item.name}: ${formatValue(item, 'newValue')}`]];
    }
    return [...acc, [`${makeSpace(offset, symbol, -2)}${getPrefix(item.status)}${item.name}: ${formatValue(item, 'value')}`]];
  }, ['{']);
  return [...result, [`${makeSpace(offset - 4, symbol)}}`]].join('\n');
};

export default stylish;
