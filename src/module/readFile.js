import fs from 'fs';
import path from 'path';

const readFile = (fileName) => {
  const expansion = path.extname(fileName);
  const fullPath = path.resolve(process.cwd(), 'src', '__fixtures__', fileName);
  const data = fs.readFileSync(fullPath, 'utf-8');
  return [data, expansion];
};

export default readFile;
