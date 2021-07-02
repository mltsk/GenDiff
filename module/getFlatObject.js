const getFlatObject = (obj) => {
  const flatObj = obj.flatMap((item) => {
    if (typeof (item.children) === 'object') {
      return getFlatObject(item.children);
    }
    return item;
  });
  return flatObj;
};

export default getFlatObject;
