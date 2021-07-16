const genFlatObject = (obj) => obj.flatMap((item) => {
  if (typeof (item.children) === 'object') {
    return genFlatObject(item.children);
  }
  return item;
});

export default genFlatObject;
