import _ from 'lodash';

const path = (property1, property2) => {
    return property1 ? `${property1}.${property2}` : property2;
}

const removePath = (property, item) => {
    property = property.replace(`.${item}`, '')
    property = property.replace(`${item}`, '')
    return property;
}

export default function genDiff(data1, data2) {
  
    const result = [];

  const diff = (data1, data2, result, property = "") => {

    const key1 = _.keys(data1);
    const key2 = _.keys(data2);
    const keys = _.uniq((key1).concat(key2));
    const keysSorted = _.sortBy(keys);


    keysSorted.map((item) => {
        const temp = {};
        
        // result.push(`{ property: ${path(property, item)}`);
        // temp.property = `${path(property, item)}`;

        if((typeof(data1[item]) === 'object' && typeof(data2[item]) === 'object')) {
            temp.name = `${item}`;
            temp.property = `${path(property, `${item}`)}`;
            temp.status = "unchanged";
            temp.value = "[complex value]";
            result.push(temp);
            diff(data1[item], data2[item], result, property =`${path(property, `${item}`)}`);

            property = removePath(property, `${item}`)

        }
        
        else if (key1.includes(item) && key2.includes(item) && data1[item] === data2[item]) {
            // result.push(` "status": "unchanged" "value": "${data1[item]} }"`);
            temp.name = `${item}`;
            temp.property = `${path(property, `${item}`)}`;
            temp.status = "unchanged" 
            temp.value = data1[item];
            result.push(temp);
        } else if (key1.includes(item) && key2.includes(item) && data1[item] !== data2[item]) {
            // result.push(` "status": "updated" "value": "${data1[item]}" "new value": "${data2[item]} }"`);
            temp.name = `${item}`;
            temp.property = `${path(property, `${item}`)}`;
            temp.status = "updated" 
            temp.value = data1[item]; 
            temp.newValue = data2[item];
            result.push(temp);
        } else if (key1.includes(item)) {
            // result.push(` "status": "removed" "value": "${data1[item]} }"`);
            temp.name = `${item}`;
            temp.property = `${path(property, `${item}`)}`;
            temp.status = "removed" 
            temp.value = data1[item]
            result.push(temp); 
        } else {
            // result.push(` "status": "added" "value": "${data2[item]} }"`);
            temp.name = `${item}`;
            temp.property = `${path(property, `${item}`)}`;
            temp.status = "added" 
            temp.value = data2[item]
            // console.log('data2[item]: ', JSON.stringify(temp.value, null, 2));
            // console.log('data2[item]: ', temp.value);
            // console.log('data2[item]: ', console.log(Object.values(temp.value)));
            result.push(temp); 
        }
        
        
        
        
        // return result;
    });
    // console.log('diff', result);
    // result = _.sortBy(result, [function(o) { return o.property; }]);
  }
  
  diff(data1, data2, result);
  // console.log('result', result.toString().replace(/[,]/g, ''));
//   return (result.toString().replace(/[,]/g, ''));
//   return (JSON.stringify(result));
  return (result);
}

// console.log(genDiff('files/file1.json', 'files/file2.json'));
