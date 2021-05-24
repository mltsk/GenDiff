#!/usr/bin/env node
import { Command } from 'commander';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

import genDiff from '../module/genDiff.js';
import parsers from '../module/parsers.js';
import getFormat from '../module/getformat.js';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const program = new Command();
const options = program.opts();

program
  .arguments('<file1> <file2>')
  .version('0.1.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .action((file1, file2) => {
    options.format = getFormat(file1);
    const diff = genDiff(parsers(file1), parsers(file2));
    console.log(diff);
  });

program.parse(program.args);

if (options.format) console.log(`format ${options.format}`);

// export default genDiff;
