#!/usr/bin/env node
'use strict';
const figlet = require('figlet');
const clear = require('clear');
const chalk = require('chalk');
const pusage = require('pidusage')
const program = require('commander');
const fs = require('fs');

//clear();
console.log(chalk.yellow(figlet.textSync('Log Galaxy CLI Tool', { horizontalLayout: 'full'})));

//const argv = require('minimist')(process.argv.slice(2));
//console.log(argv);
program
	.version('0.0.1')
	.command('start [file]', 'Start server')
	.command('stop [pid]', 'Stop server')
	.command('list', 'List all servers').alias('ls')
	.command('delete', 'Delete zombie instance').alias('del');

program.parse(process.argv);

//setInterval(function () {
//    pusage.stat(child.pid, function (err, stat) {
//        console.log('Pcpu: %s', stat.cpu)
//        console.log('Mem: %s', stat.memory) //those are bytes
//    })
//}, 1000)
