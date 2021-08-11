const makePath = (property1, property2) => (property1 ? `${property1}.${property2}` : property2);

const formatValue = (value) => {
  if (value === null) return null;
  switch (typeof value) {
    case ('object'): return '[complex value]';
    case 'string': return `'${value}'`;
    default: return String(value);
  }
};

const formatPlain = (object, property = '') => {
  const result = object.flatMap((item) => {
    const value = formatValue(item.value);
    switch (item.type) {
      case 'nested':
        return formatPlain(item.children, makePath(property, item.name));
      case 'added':
        return `Property '${makePath(property, item.name)}' was added with value: ${value}`;
      case 'changed':
        return `Property '${makePath(property, item.name)}' was updated. From ${value} to ${formatValue(item.newValue)}`;
      case 'removed':
        return `Property '${makePath(property, item.name)}' was removed`;
      default:
        return [];
    }
  });
  return result.join('\n');
};

export default formatPlain;
