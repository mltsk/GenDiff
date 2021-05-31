import _ from 'lodash';


export default function genDiff(data1, data2) {
  
  const result = ['{\n'];
  const diff = (data1, data2, result) => {
    const key1 = _.keys(data1);
    const key2 = _.keys(data2);
    const keys = _.uniq((key1).concat(key2));
    const keysSorted = _.sortBy(keys);

    keysSorted.forEach((item) => {

      if((typeof(data1[item]) === 'object' && typeof(data2[item]) === 'object')) {
        console.log('keyyyyyyyyy', item);
        result.push(`${item}:` + diff(data1[item], data2[item], result));
      }
      if(typeof(data1[item]) === 'object' && typeof(data2[item]) === 'object'){
        result.push(`    ${item}: ${data1[item]}\n`);
      }
      else if(typeof(data1[item]) === 'object'){
        result.push(`  - ${item}: ${data1[item]}\n`);
        // result.push(`  + ${item}: ${data2[item]}\n`);
        // console.log('result1: ', result);
      }
      else if(typeof(data2[item]) === 'object'){
        result.push(`  + ${item}: ${data2[item]}\n`);
        // console.log('result2: ', result);
      }
      else if (key1.includes(item) && key2.includes(item) && data1[item] === data2[item]) {
        result.push(`    ${item}: ${data1[item]}\n`);
      } else if (key1.includes(item) && key2.includes(item) && data1[item] !== data2[item]) {
        result.push(`  - ${item}: ${data1[item]}\n`);
        result.push(`  + ${item}: ${data2[item]}\n`);
      } else if (key1.includes(item)) {
        result.push(`  - ${item}: ${data1[item]}\n`);
      } else {
        result.push(`  + ${item}: ${data2[item]}\n`);
      }
    });
    // console.log('diff', result);
    return result;
  }
  
  diff(data1, data2, result);
  result.push('}');
  // console.log('result', result.toString().replace(/[,]/g, ''));
  return (result.toString().replace(/[,]/g, ''));
}

// console.log(genDiff('files/file1.json', 'files/file2.json'));
