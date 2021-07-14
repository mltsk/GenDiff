import getFlatObject from './getFlatObject.js';

const plain = (object) => {
  const formatValue = (value) => {
    if (value === null) return null;
    switch (typeof value) {
      case ('object'): return '[complex value]';
      case 'string': return `'${value}'`;
      default: return value;
    }
  };

  const flatObj = getFlatObject(object);

  const result = flatObj.filter((item) => (item.status === 'added' || item.status === 'updated' || item.status === 'removed'))
    .reduce((acc, item) => {
      const value = formatValue(item.value);
      const newValue = formatValue(item.newValue);
      const { property } = item;

      if (item.status === 'added') {
        return [...acc, [`Property '${property}' was added with value: ${value}`]];
      } if (item.status === 'updated') {
        return [...acc, [`Property '${property}' was updated. From ${value} to ${newValue}`]];
      }
      return [...acc, [`Property '${property}' was removed`]];
    }, []);
  return result.join('\n');
};

export default plain;
