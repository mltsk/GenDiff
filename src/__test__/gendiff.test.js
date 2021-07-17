import fs from 'fs';
import genDiff from '../../index.js';

test('stylish', () => {
  const expected = fs.readFileSync('./src/__fixtures__/expected1.txt', 'utf-8');

  const actual = genDiff('file1.json', 'file2.json', 'stylish');
  expect(actual).toBe(expected);
});

test('plain', () => {
  const expected = `Property 'common.follow' was added with value: false
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

  const actual = genDiff('file1.json', 'file2.json', 'plain');
  expect(actual).toEqual(expected);
});

test('json', () => {
  const expected = `{
  "follow": {
    "property": "common.follow",
    "type": "added",
    "value": false
  },
  "setting2": {
    "property": "common.setting2",
    "type": "removed",
    "value": 200
  },
  "setting3": {
    "property": "common.setting3",
    "type": "updated",
    "value": true,
    "newValue": null
  },
  "setting4": {
    "property": "common.setting4",
    "type": "added",
    "value": "blah blah"
  },
  "setting5": {
    "property": "common.setting5",
    "type": "added",
    "value": "[complex value]"
  },
  "wow": {
    "property": "common.setting6.doge.wow",
    "type": "updated",
    "value": "",
    "newValue": "so much"
  },
  "ops": {
    "property": "common.setting6.ops",
    "type": "added",
    "value": "vops"
  },
  "baz": {
    "property": "group1.baz",
    "type": "updated",
    "value": "bas",
    "newValue": "bars"
  },
  "nest": {
    "property": "group1.nest",
    "type": "updated",
    "value": "[complex value]",
    "newValue": "str"
  },
  "group2": {
    "property": "group2",
    "type": "removed",
    "value": "[complex value]"
  },
  "group3": {
    "property": "group3",
    "type": "added",
    "value": "[complex value]"
  }
}`;

  const actual = genDiff('file1.json', 'file2.json', 'json');
  expect(actual).toEqual(expected);
});
