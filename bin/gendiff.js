#!/usr/bin/env node
import { Command } from 'commander';
import genDiff from '../module/genDiff.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const program = new Command();

program
  .arguments('<file1> <file2>')
  .version('0.1.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .action((file1, file2) => {
    const diff = genDiff(getFixturePath(file1), getFixturePath(file2));
    console.log(diff);
  });

program.parse(program.args);

// const options = program.opts();

// if (options.format) console.log(`- ${options.format}`);

// export default genDiff;
