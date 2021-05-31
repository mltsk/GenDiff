import _ from 'lodash';

const path = (property1, property2) => {
    return property1 ? `${property1}.${property2}` : property2;
}

const removePath = (property, item) => {
    property = property.replace(`.${item}`, '')
    property = property.replace(`${item}`, '')
    return property;
}

export default function genDiff(data1, data2, property = '') {
  
    const result = [];

    const diff = (data1, data2, result) => {
        
    const key1 = _.keys(data1);
    const key2 = _.keys(data2);
    const keys = _.uniq((key1).concat(key2));
    const keysSorted = _.sortBy(keys);


    keysSorted.map((item) => {
        const temp = {};
        temp.name = `${item}`;
        temp.property = `${path(property, `${item}`)}`;

        if((typeof(data1[item]) === 'object' && typeof(data2[item]) === 'object')) {
            temp.status = "unchanged";
            temp.value = "[complex value]";
            temp.children = (genDiff(data1[item], data2[item], property =`${path(property, `${item}`)}`));
            property = removePath(property, `${item}`)

        }else if (key1.includes(item) && key2.includes(item) && data1[item] === data2[item]) {
            temp.status = "unchanged" 
            temp.value = data1[item];

        } else if (key1.includes(item) && key2.includes(item) && data1[item] !== data2[item]) {
            temp.status = "updated" 
            temp.value = data1[item]; 
            temp.newValue = data2[item];

        } else if (key1.includes(item)) {
            temp.status = "removed" 
            temp.value = data1[item]

        } else {
            temp.status = "added" 
            temp.value = data2[item]
        }
        
        result.push(temp); 

    });

    return result;

    }
  
    diff(data1, data2, result);
    return result;
}


