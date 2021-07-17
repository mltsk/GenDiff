#!/usr/bin/env node
import { Command } from 'commander';
import genDiff from '../../index.js';

const program = new Command();
const options = program.opts();

program
  .arguments('<filepath1> <filepath2>')
  .version('0.1.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    const formatName = options.format;
    const result = genDiff(filepath1, filepath2, formatName);
  });
program.parse(program.args);
