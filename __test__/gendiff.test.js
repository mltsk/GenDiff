import genDiff from '../module/genDiff.js';
import parsers from '../module/parsers.js';
import stylish from '../module/stylish.js';

test('genDiff', () => {
  const reference = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

  // const reference = readFileSync(getFixturePath('expected_file.txt'), 'utf8').toString();

  const actual = genDiff(parsers('file3.json'), parsers('file4.json'));
  console.log('actual: ', stylish(actual));

  expect(stylish(actual)).toEqual(reference);
});

// console.log(genDiff('./files/file1.json', './files/file2.json'));

// const reference = readFileSync(getFixturePath('expected_file.txt'), 'utf8').toString();
// console.log(reference);
// const actual = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
// console.log(actual);
