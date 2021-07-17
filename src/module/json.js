import _ from 'lodash';

const genFlatObject = (obj) => obj.flatMap((item) => {
  if (_.isObject(item.children)) {
    return genFlatObject(item.children);
  }
  return item;
});

const json = (object) => {
  const flatObject = genFlatObject(object);
  const result = flatObject.filter((item) => (item.type === 'added' || item.type === 'updated' || item.type === 'removed'))
    .reduce((acc, item) => {
      const value = _.isObject(item.value) ? '[complex value]' : item.value;
      const { name, type, newValue } = item;
      if (type === 'updated') {
        return { ...acc, [name]: { type, value, newValue } };
      }
      return { ...acc, [name]: { type, value } };
    }, {});
  return JSON.stringify(result, null, 2);
};
export default json;
