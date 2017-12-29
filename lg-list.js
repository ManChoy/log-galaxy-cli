#!/usr/bin/env node
let program = require('commander');
const fs = require('fs');
const chalk = require('chalk');
const pusage = require('pidusage');
const HOME = process.env['HOME'];
const pidPath = HOME + '/.pids';
const Table = require('cli-table');
const promisify = require('es6-promisify');

const listServer = async () => {
	const pStat = promisify(pusage.stat);
	let table = new Table({
			head: ['Process ID', 'CPU', 'Memory'],
	});
	var files = fs.readdirSync(pidPath);
	for (let pid of files) {
		try {
			const stat = await pStat(pid);
			table.push([pid, stat.cpu, stat.memory]);
		} catch (e) {
			table.push([pid + '(zombie)', '-', '-']);
		}
	}
	console.log(table.toString());
};

//program.parse(process.argv);
listServer();
