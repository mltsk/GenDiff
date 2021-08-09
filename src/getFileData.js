import fs from 'fs';
import path from 'path';

const getFileData = (fileName) => {
  const fullPath = path.resolve(process.cwd(), fileName);
  const data = fs.readFileSync(fullPath, 'utf-8');
  return data;
};

export default getFileData;
