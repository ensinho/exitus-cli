#!/usr/bin/env node
// src/index.ts
import { Command } from 'commander';
import newCommand from './commands/new';

const program = new Command();

program
  .name('exitus-cli')
  .description('CLI for generating Angular components')
  .version('0.1.0');

program.addCommand(newCommand);

program.parse(process.argv);