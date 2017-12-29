#!/usr/bin/env node
let program = require('commander');
const fs = require('fs');
const chalk = require('chalk');
const ps = require('ps-node');
const HOME = process.env['HOME'];
const pidPath = HOME + '/.pids';

const stopServer = (pid) => {
	var file = `${pidPath}/${pid}`;
	if(fs.existsSync(file)) {
		ps.kill(pid, { signal: 'SIGKILL', timeout: 10 }, (err) => {
			if (err) {
				console.log(chalk.red('Unable to kill process %s: %s:'), pid, err);
			} else {
				fs.unlink(file, (err) => {
					if (err) {
							console.log(chalk.red('Unable to remove pid file.'), err);
					} else {
							console.log(chalk.green('Process %s has been killed.'), pid);
					}
				})
			}
		});
	} else {
		console.log(chalk.red('Process ID not found or removed'));
	}
};

program.parse(process.argv);
if(program.args.length == 0) {
  console.log(chalk.red('Process ID is empty'));
} else {
  stopServer(program.args[0]);
}
