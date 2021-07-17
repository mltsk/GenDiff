import genFlatObject from './genFlatObject.js';

const json = (object) => {
  const flatObject = genFlatObject(object);
  const result = flatObject.filter((item) => (item.type === 'added' || item.type === 'updated' || item.type === 'removed'))
    .reduce((acc, item) => {
      const value = (typeof (item.value) === 'object') ? '[complex value]' : item.value;
      const {
        name, property, type, newValue,
      } = item;
      if (type === 'updated') {
        return {
          ...acc,
          [name]: {
            property, type, value, newValue,
          },
        };
      }
      return { ...acc, [name]: { property, type, value } };
    }, {});
  return JSON.stringify(result, null, 2);
};
export default json;
