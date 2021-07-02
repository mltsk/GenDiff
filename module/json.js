import getFlatObject from './getFlatObject.js';

const json = (object) => {
  const flatObject = getFlatObject(object);
  const result = flatObject.filter((item) => (item.status === 'added' || item.status === 'updated' || item.status === 'removed'))
    .reduce((acc, item) => {
      const value = (typeof (item.value) === 'object') ? '[complex value]' : item.value;

      if (item.status === 'updated') {
        return {
          ...acc,
          [item.name]: {
            property: item.property, status: item.status, value, newValue: item.newValue,
          },
        };
      }
      return { ...acc, [item.name]: { property: item.property, status: item.status, value } };
    }, {});
  return JSON.stringify(result, null, 2);
};
export default json;
