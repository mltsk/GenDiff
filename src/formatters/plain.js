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
  const result = object
    .reduce((acc, item) => {
      const value = formatValue(item.value);
      const newValue = formatValue(item.newValue);
      const { name } = item;
      if (item.children) {
        return [...acc, plain(item.children, makePath(property, name))];
      }

      if (item.type === 'added') {
        return [...acc, [`Property '${makePath(property, name)}' was added with value: ${value}`]];
      } if (item.type === 'changed') {
        return [...acc, [`Property '${makePath(property, name)}' was updated. From ${value} to ${newValue}`]];
      } if (item.type === 'removed') {
        return [...acc, [`Property '${makePath(property, name)}' was removed`]];
      }
      return acc;
    }, []);
  return result.join('\n');
};

export default plain;
