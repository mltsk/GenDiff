import genFlatObject from './genFlatObject.js';

const json = (object) => {
  const flatObject = genFlatObject(object);
  const result = flatObject.filter((item) => (item.status === 'added' || item.status === 'updated' || item.status === 'removed'))
    .reduce((acc, item) => {
      const value = (typeof (item.value) === 'object') ? '[complex value]' : item.value;
      const {
        name, property, status, newValue,
      } = item;
      if (status === 'updated') {
        return {
          ...acc,
          [name]: {
            property, status, value, newValue,
          },
        };
      }
      return { ...acc, [name]: { property, status, value } };
    }, {});
  return JSON.stringify(result, null, 2);
};
export default json;
