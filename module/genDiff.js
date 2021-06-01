import _ from 'lodash';

const path = (property1, property2) => (property1 ? `${property1}.${property2}` : property2);

const removePath = (property, item) => {
  property.replace(`.${item}`, '');
  property.replace(`${item}`, '');
};

export default function genDiff(data1, data2, property = '') {
  const result = [];

  const key1 = _.keys(data1);
  const key2 = _.keys(data2);
  const keys = _.uniq((key1).concat(key2));
  const keysSorted = _.sortBy(keys);

  keysSorted.forEach((item) => {
    const temp = {};
    temp.name = `${item}`;
    temp.property = `${path(property, `${item}`)}`;

    if ((typeof (data1[item]) === 'object' && typeof (data2[item]) === 'object')) {
      temp.status = 'unchanged';
      temp.value = '[complex value]';
      temp.children = (genDiff(data1[item], data2[item], `${path(property, `${item}`)}`));
      removePath(property, `${item}`);
    } else if (key1.includes(item) && key2.includes(item) && data1[item] === data2[item]) {
      temp.status = 'unchanged';
      temp.value = data1[item];
    } else if (key1.includes(item) && key2.includes(item) && data1[item] !== data2[item]) {
      temp.status = 'updated';
      temp.value = data1[item];
      temp.newValue = data2[item];
    } else if (key1.includes(item)) {
      temp.status = 'removed';
      temp.value = data1[item];
    } else {
      temp.status = 'added';
      temp.value = data2[item];
    }

    result.push(temp);
  });

  return result;
}
