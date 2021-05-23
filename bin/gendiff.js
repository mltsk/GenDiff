#!/usr/bin/env node
import { readFileSync } from 'fs';
import _ from 'lodash';
import path from 'path';
import { Command } from 'commander';

const program = new Command();

export const genDiff = (file1, file2) => {
  const result = ['{\n'];
  const data1 = JSON.parse(readFileSync(file1).toString());
  const data2 = JSON.parse(readFileSync(file2).toString());
  const key1 = _.keys(data1);
  const key2 = _.keys(data2);
  const keys = _.uniq((key1).concat(key2));
  const keysSorted = _.sortBy(keys);

  keysSorted.forEach((item) => {
    if (key1.includes(item) && key2.includes(item) && data1[item] === data2[item]) {
      result.push(`    ${item}: ${data1[item]}\n`);
    } else if (key1.includes(item) && key2.includes(item) && data1[item] !== data2[item]) {
      result.push(`  - ${item}: ${data1[item]}\n`);
      result.push(`  + ${item}: ${data2[item]}\n`);
    } else if (key1.includes(item)) {
      result.push(`  - ${item}: ${data1[item]}\n`);
    } else {
      result.push(`  + ${item}: ${data2[item]}\n`);
    }
  });

  result.push('}\n');
  return console.log((result.toString().replace(/[,]/g, '')));
};

program
  .arguments('<file1> <file2>')
  .version('0.1.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .action((file1, file2) => {
    genDiff(file1, file2);
  });

program.parse(process.argv);

// const options = program.opts();

// if (options.format) console.log(`- ${options.format}`);

export default genDiff;
