const json = (object) => {
  const result = {};
  const iter = (obj) => {
    obj.forEach((item) => {
      if (typeof (item.children) === 'object') {
        iter(item.children);
      }

      const value = (typeof (item.value) === 'object') ? '[complex value]' : item.value;

      if (item.status === 'added') {
        result[item.name] = { property: item.property, status: item.status, value };
      } else if (item.status === 'updated') {
        result[item.name] = {
          property: item.property, status: item.status, value, newValue: item.newValue,
        };
      } else if (item.status === 'removed') {
        result[item.name] = { property: item.property, status: item.status, value };
      }
    });
    return JSON.stringify(result, null, 2);
  };
  return iter(object);
};

export default json;
