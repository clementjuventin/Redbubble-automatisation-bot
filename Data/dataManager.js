const fs = require('fs');
const path = require('path');

function getFiles(dirPath, ext) {
	files = fs.readdirSync(dirPath);
	filelist = [];
	files.forEach(function(file) {
		if (!fs.statSync(path.join(dirPath, file)).isDirectory()) {
			if (get_extension(file) == ext) {
				filelist.push(path.join(dirPath, file));
			}
		}
	});
	return filelist;
}
function get_extension(filename) {
	return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
}
function readDataFiles(file) {
	let fichier = fs.readFileSync(file)
	let data = JSON.parse(fichier)
	return data;
}
function writeDataFiles(data, file) {
	fs.writeFileSync(file, JSON.stringify(data));
}
function isDirectory(path) {
    if (!fs.existsSync(path)) {
        return false
    }
    if (!fs.lstatSync(path).isDirectory()) {
        return false
	}
	return true
}
function getPics(dirPath) {
	var extention = ['png','PNG','jpg','JPG','jpeg']
	files = fs.readdirSync(dirPath);
	filelist = [];
	files.forEach(function(file) {
		extentionFile = get_extension(file)
        extention.forEach(ext=>{
            if (!fs.statSync(path.join(dirPath, file)).isDirectory()) {
                if (extentionFile == ext) {
                    filelist.push(path.join(dirPath, file));
                }
            }
        })
	});
	return filelist;
}
function sendLogs(mess, type){
	logFile = __dirname+'/Logs/logs.rdb'
	switch(type){
		case "sql":
			break
		case "dev":
			logFile = __dirname+'/Logs/devLogs.rdb'
			break
		default:
	}
	try {
		fs.appendFileSync(logFile, mess)
	} catch (error) {
		fs.appendFileSync('./EMERGENCYLOGS.rdb', error)
	}
}
module.exports = {readDataFiles, writeDataFiles, getFiles, isDirectory, getPics, sendLogs};