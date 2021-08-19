const makePath = (property1, property2) => (property1 ? `${property1}.${property2}` : property2);

const formatValue = (value) => {
  if (value === null) return null;
  switch (typeof value) {
    case ('object'): return '[complex value]';
    case 'string': return `'${value}'`;
    default: return String(value);
  }
};

const formatPlain = (object) => {
  const iter = (obj, property = '') => {
    const result = obj.flatMap((item) => {
      const value = formatValue(item.value);
      switch (item.type) {
        case 'added':
          return `Property '${makePath(property, item.name)}' was added with value: ${value}`;
        case 'removed':
          return `Property '${makePath(property, item.name)}' was removed`;
        case 'nested':
          return iter(item.children, makePath(property, item.name));
        case 'changed':
          return `Property '${makePath(property, item.name)}' was updated. From ${value} to ${formatValue(item.newValue)}`;
        case 'unchanged':
          return [];
        default:
          throw new Error(`Unknown type: ${item.type}!`);
      }
    });
    return result.join('\n');
  };
  return iter(object);
};

export default formatPlain;
