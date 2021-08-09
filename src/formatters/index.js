import formatPlain from './formatPlain.js';
import formatStylish from './formatStylish.js';
import formatJson from './formatJson.js';

const getFormatter = (formatName) => {
  switch (formatName) {
    case 'plain':
      return formatPlain;
    case 'json':
      return formatJson;
    case 'stylish':
      return formatStylish;
    default:
      throw new Error('Unknown format!');
  }
};

export default getFormatter;
