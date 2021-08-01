import plain from './plain.js';
import stylish from './stylish.js';
import json from './json.js';

const getFormatter = (formatName) => {
  switch (formatName) {
    case 'plain':
      return plain;
    case 'json':
      return json;
    case 'stylish':
      return stylish;
    default:
      throw new Error('Unknown format!');
  }
};

export default getFormatter;
