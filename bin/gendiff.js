#!/usr/bin/env node
import { Command } from 'commander';
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
    const formatName = options.format;
    const diff = genDiff(parsers(file1), parsers(file2), formatName);
    console.log(diff);
  });
program.parse(program.args);
