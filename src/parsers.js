import yaml from 'js-yaml';

const parse = (fileData, expansion) => {
  switch (expansion) {
    case '.yml':
    case '.yaml':
      return yaml.load(fileData);
    case '.json':
      return JSON.parse(fileData);
    default: 
      throw new Error('Unknown expansion!');
  }
};

export default parse;
