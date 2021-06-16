const makeSpace = (number, symbol, correction = 0) => symbol.repeat(number + correction);

const getPrefix = (status) => {
  const prefix = { added: '+ ', removed: '- ', unchanged: '  ' };
  return prefix[status];
};

const ObjectStylish = (obj, symbol, offset) => {
  let result = '{\n';

  Object.entries(obj).forEach((item) => {
    const key = item[0];
    let tempValue = item[1];
    if (typeof (tempValue) === 'object') {
      tempValue = ObjectStylish(tempValue, symbol, offset + 4);
    }
    result += `${makeSpace(offset, symbol)}${key}: ${tempValue}\n`;
  });
  result += `${makeSpace(offset - 4, symbol)}}`;
  return result;
};

const stylish = (obj, symbol = ' ', offset = 4) => {
  const result = [];
  result.push('{');
  obj.forEach((item) => {
    let { value } = item;
    if (typeof (item.children) === 'object') {
      value = stylish(item.children, symbol, offset + 4);
    } else if (typeof (value) === 'object') {
      value = ObjectStylish(value, symbol, offset + 4);
    }
    if (item.status === 'updated') {
      result.push(`${makeSpace(offset, symbol, -2)}${getPrefix('removed')}${item.name}: ${value}`);
      result.push(`${makeSpace(offset, symbol, -2)}${getPrefix('added')}${item.name}: ${item.newValue}`);
    } else {
      result.push(`${makeSpace(offset, symbol, -2)}${getPrefix(item.status)}${item.name}: ${value}`);
    }
  });

  result.push(`${makeSpace(offset - 4, symbol)}}`);
  return result.join('\n');
};

export default stylish;
