#!/usr/bin/env node
import { Command } from 'commander';
import path from 'path';
import stylish from '../module/stylish.js';

import genDiff from '../module/genDiff.js';
import parsers from '../module/parsers.js';

const program = new Command();
const options = program.opts();

program
  .arguments('<file1> <file2>')
  .version('0.1.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .action((file1, file2) => {
    options.format = path.extname(file1);
    const diff = genDiff(parsers(file1), parsers(file2));
    console.log(stylish(diff, ' ', 4));
  });

program.parse(program.args);

if (options.format) console.log(`format ${options.format}`);

// export default genDiff;
