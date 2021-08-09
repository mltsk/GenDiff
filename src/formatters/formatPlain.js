const makePath = (property1, property2) => (property1 ? `${property1}.${property2}` : property2);

const formatValue = (value) => {
  if (value === null) return null;
  switch (typeof value) {
    case ('object'): return '[complex value]';
    case 'string': return `'${value}'`;
    default: return value;
  }
};

const plain = (object, property = '') => {
  const result = object.flatMap((item) => {
    const value = formatValue(item.value);
    const newValue = formatValue(item.newValue);
    if (item.children) {
      return [plain(item.children, makePath(property, item.name))];
    }

    if (item.type === 'added') {
      return [[`Property '${makePath(property, item.name)}' was added with value: ${value}`]];
    } if (item.type === 'changed') {
      return [[`Property '${makePath(property, item.name)}' was updated. From ${value} to ${newValue}`]];
    }
    if (item.type === 'removed') {
      return [[`Property '${makePath(property, item.name)}' was removed`]];
    }
    return [];
  });
  return result.join('\n');
};

export default plain;
