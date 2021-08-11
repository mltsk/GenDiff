import formatPlain from './plain.js';
import formatStylish from './stylish.js';

const getFormatter = (formatName) => {
  switch (formatName) {
    case 'plain':
      return formatPlain;
    case 'json':
      return JSON.stringify;
    case 'stylish':
      return formatStylish;
    default:
      throw new Error(`Unknown format: ${formatName}!`);
  }
};

export default getFormatter;
