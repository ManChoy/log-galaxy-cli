#!/usr/bin/env node
let program = require('commander');
const fs = require('fs');
const chalk = require('chalk');
const ps = require('ps-node');
const promisify = require('es6-promisify');
const HOME = process.env['HOME'];
const pidPath = HOME + '/.pids';

const psLookup = promisify(ps.lookup);

const deleteZombie = async (pid) => {
	const result = await psLookup({pid});
	if(result && result.length > 0) {
		console.log(chalk.red("Server is running. Please stop the server first."));
	} else {
		var file = `${pidPath}/${pid}`;
		if(fs.existsSync(file)) {
			fs.unlink(file, (err) => {
				if(err) {
					console.log(chalk.red('Unable to remove pid file.'), err);
				} else {
					console.log(chalk.green('PID %s has been deleted.'), pid);
				}
			});
		} else {
			console.log(chalk.red('Process ID not found'));
		}
	}
};

program.parse(process.argv);
if(program.args.length == 0) {
	console.log(chalk.red('Process ID is empty'));
} else {
	deleteZombie(program.args[0]);
}
