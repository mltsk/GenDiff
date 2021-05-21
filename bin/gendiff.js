#!/usr/bin/env node
import { Command } from '../node_modules/commander/esm.mjs';
const program = new Command();

program
    .description('Compares two configuration files and shows a difference.')
    // .option('-h, --help', 'output usage information')
    //.option('-v, --version', 'output the version number');


program.version('0.0.1', '-v, --vers', 'output the current version');
program.parse(process.argv);

const options = program.opts();

// if (options.help) console.log(program.opts());
// if (options.version) console.log('version 0.1');