import genDiff from '../module/genDiff.js';

test('genDiff', () => {
  const expected1 = `{
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

  const expected2 = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;

  const expected3 = `{
  "follow": {
    "property": "common.follow",
    "status": "added",
    "value": false
  },
  "setting2": {
    "property": "common.setting2",
    "status": "removed",
    "value": 200
  },
  "setting3": {
    "property": "common.setting3",
    "status": "updated",
    "value": true,
    "newValue": null
  },
  "setting4": {
    "property": "common.setting4",
    "status": "added",
    "value": "blah blah"
  },
  "setting5": {
    "property": "common.setting5",
    "status": "added",
    "value": "[complex value]"
  },
  "wow": {
    "property": "common.setting6.doge.wow",
    "status": "updated",
    "value": "",
    "newValue": "so much"
  },
  "ops": {
    "property": "common.setting6.ops",
    "status": "added",
    "value": "vops"
  },
  "baz": {
    "property": "group1.baz",
    "status": "updated",
    "value": "bas",
    "newValue": "bars"
  },
  "nest": {
    "property": "group1.nest",
    "status": "updated",
    "value": "[complex value]",
    "newValue": "str"
  },
  "group2": {
    "property": "group2",
    "status": "removed",
    "value": "[complex value]"
  },
  "group3": {
    "property": "group3",
    "status": "added",
    "value": "[complex value]"
  }
}`;

  const actual1 = genDiff('file1.json', 'file2.json', 'stylish');
  const actual2 = genDiff('file1.json', 'file2.json', 'plain');
  const actual3 = genDiff('file1.json', 'file2.json', 'json');

  expect(actual1).toEqual(expected1);
  expect(actual2).toEqual(expected2);
  expect(actual3).toEqual(expected3);
});
