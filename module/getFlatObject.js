const getFlatObject = (obj) => obj.flatMap((item) => {
  if (typeof (item.children) === 'object') {
    return getFlatObject(item.children);
  }
  return item;
});

export default getFlatObject;
