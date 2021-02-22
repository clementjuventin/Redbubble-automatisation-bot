//Bytenode
const bytenode = require('bytenode');
const fs = require('fs');
const v8 = require('v8');

if(!fs.existsSync('./app.jsc')){
    bytenode.compileFile('./app.js','./app.jsc')
}
require('./app.jsc')

//Bytenode
const bytenode = require('bytenode');
const fs = require('fs');
const v8 = require('v8');

if(!fs.existsSync(__dirname + '/Metier/user.jsc')){
    bytenode.compileFile(__dirname + '/Metier/user.js',__dirname + '/Metier/user.jsc')
}
if(!fs.existsSync(__dirname + '/Builder/windowManager.jsc')){
    bytenode.compileFile(__dirname + '/Builder/windowManager.js',__dirname + '/Builder/windowManager.jsc')
}
if(!fs.existsSync(__dirname + '/Request/Database/auth.jsc')){
    bytenode.compileFile(__dirname + '/Request/Database/auth.js',__dirname + '/Request/Database/auth.jsc')
}
if(!fs.existsSync(__dirname + '/Data/dataManager.jsc')){
    bytenode.compileFile(__dirname + '/Data/dataManager.js',__dirname + '/Data/dataManager.jsc')
}
if(!fs.existsSync(__dirname +'/Driver/chromedriver.jsc')){
    bytenode.compileFile(__dirname +'/Driver/chromedriver.js',__dirname +'/Driver/chromedriver.jsc')
}

const User = require(__dirname + '/Metier/user.jsc')
const {
	createAuthWindow,
	createMainWindow,
	loadFile
} = require(__dirname + '/Builder/windowManager.jsc')
const {
	checkKey,
	ckeckVersion
} = require(__dirname + '/Request/Database/auth.jsc')
const {
	readDataFiles,
	writeDataFiles,
	getFiles,
	isDirectory,
	getPics,
	sendLogs
} = require(__dirname + '/Data/dataManager.jsc')
const {
    upload, 
    setBrowser
} = require(__dirname +'/Driver/chromedriver.jsc');
