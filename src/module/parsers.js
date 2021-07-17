import yaml from 'js-yaml';

const parse = (fileData, expansion) => {
  if (expansion === '.yml' || expansion === '.yaml') {
    return yaml.load(fileData);
  }
  return JSON.parse(fileData);
};

export default parse;
