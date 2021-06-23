const makeSpace = (offset, symbol, correction = 0) => symbol.repeat(offset + correction);

const getPrefix = (status) => {
  const prefix = { added: '+ ', removed: '- ', unchanged: '  ' };
  return prefix[status];
};

const ObjectStylish = (obj, symbol, offset) => {
  if (obj === null || obj === undefined) return '';
  const result = [];
  result.push('{');

  Object.entries(obj).forEach((item) => {
    const key = item[0];
    let value = item[1];
    if (typeof (value) === 'object') {
      value = ObjectStylish(value, symbol, offset + 4);
    }
    result.push(`${makeSpace(offset, symbol)}${key}: ${value}`);
  });
  result.push(`${makeSpace(offset - 4, symbol)}}`);
  return result.join('\n');
};

const stylish = (obj, symbol = ' ', offset = 4) => {
  const result = [];
  result.push('{');
  obj.forEach((item) => {
    let { value, newValue } = item;
    if (typeof (item.children) === 'object') {
      value = stylish(item.children, symbol, offset + 4);
    } else if (typeof (value) === 'object') {
      value = ObjectStylish(value, symbol, offset + 4);
    } else if (typeof (newValue) === 'object' && newValue !== null) {
      newValue = ObjectStylish(newValue, symbol, offset + 4);
    }
    if (item.status === 'updated') {
      result.push(`${makeSpace(offset, symbol, -2)}${getPrefix('removed')}${item.name}: ${value}`);
      result.push(`${makeSpace(offset, symbol, -2)}${getPrefix('added')}${item.name}: ${newValue}`);
    } else {
      result.push(`${makeSpace(offset, symbol, -2)}${getPrefix(item.status)}${item.name}: ${value}`);
    }
  });

  result.push(`${makeSpace(offset - 4, symbol)}}`);
  return result.join('\n');
};

export default stylish;
