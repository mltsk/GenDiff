const plain = (obj) => {
    let result = [];
    const iter = (obj, result) => {
        obj.forEach((item) => {
            if (typeof (item.children) === 'object') {
              iter(item.children, result);
            }
            let value = (typeof (item.value) === 'object') ? '[complex value]' : item.value; 
            value = (typeof (item.value) === 'string')? `'${value}'` : value;
            const newValue = (typeof (item.newValue) === 'string')? `'${item.newValue}'` : item.newValue;
            if (item.status === 'added') {
              result.push(`Property '${item.property}' was added with value: ${value}`);
            } else if (item.status === 'updated') {
              result.push(`Property '${item.property}' was updated. From ${value} to ${newValue}`);
            } else if (item.status === 'removed'){
              result.push(`Property '${item.property}' was removed`);
            }
          });
          return result;
    }
    return iter(obj, result).join('\n');
  };

export default plain;