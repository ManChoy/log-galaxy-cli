#!/usr/bin/env node

let program = require('commander');
const childProcess = require('child_process');
const fs = require('fs');
const chalk = require('chalk');
const HOME = process.env['HOME'];
const pidPath = HOME + '/.pids';

const startServer = (file) => {
	var child = childProcess.fork(file, { detached: true });
	child.on('message', msg => {
		if(msg.ok) {
			child.unref();
			if (!fs.existsSync(pidPath)) {
				fs.mkdirSync(pidPath);
			} else {
				const file = pidPath + '/' + child.pid;
				fs.writeFile(file, child.pid, (err) => {
					if (err) {
						console.log(chalk.red(err));
					}
				});
			}
			process.exit();
		}
	})
};

program.parse(process.argv);
if(program.args.length == 0) {
	console.log(chalk.red('File name is empty'));
} else {
	startServer(program.args[0]);
}
