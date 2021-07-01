const plain = (object) => {
  const getFlatObject = (obj) => {
    const flatObj = obj.flatMap((item) => {
      if (typeof (item.children) === 'object') {
        return getFlatObject(item.children);
      }
      return item;
    });
    return flatObj;
  };

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

      if (item.status === 'added') {
        return [...acc, [`Property '${item.property}' was added with value: ${value}`]];
      } if (item.status === 'updated') {
        return [...acc, [`Property '${item.property}' was updated. From ${value} to ${newValue}`]];
      }
      return [...acc, [`Property '${item.property}' was removed`]];
    }, []);
  return result.join('\n');
};

export default plain;
