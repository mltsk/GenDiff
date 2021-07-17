import genFlatObject from './genFlatObject.js';

const plain = (object) => {
  const formatValue = (value) => {
    if (value === null) return null;
    switch (typeof value) {
      case ('object'): return '[complex value]';
      case 'string': return `'${value}'`;
      default: return value;
    }
  };

  const flatObj = genFlatObject(object);

  const result = flatObj.filter((item) => (item.type === 'added' || item.type === 'updated' || item.type === 'removed'))
    .reduce((acc, item) => {
      const value = formatValue(item.value);
      const newValue = formatValue(item.newValue);
      const { property } = item;

      if (item.type === 'added') {
        return [...acc, [`Property '${property}' was added with value: ${value}`]];
      } if (item.type === 'updated') {
        return [...acc, [`Property '${property}' was updated. From ${value} to ${newValue}`]];
      }
      return [...acc, [`Property '${property}' was removed`]];
    }, []);
  return result.join('\n');
};

export default plain;
