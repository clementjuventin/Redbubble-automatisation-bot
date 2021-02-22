//Dependances
//Electron
const electron = require('electron');
const ipc = electron.ipcMain;

const moment = require('moment');
moment.locale('fr')

const User = require(__dirname + '/Metier/user')
const {
	createAuthWindow,
	createMainWindow,
	loadFile
} = require(__dirname + '/Builder/windowManager.js')
const {
	checkKey,
	ckeckVersion
} = require(__dirname + '/Request/Database/auth.js')
const {
	readDataFiles,
	writeDataFiles,
	getFiles,
	isDirectory,
	getPics,
	sendLogs
} = require(__dirname + '/Data/dataManager.js')
const {
    upload, 
    setBrowser
} = require(__dirname +'/Driver/chromedriver.js');

//Global var
const path = require(__dirname + '/config/path.json');

class App {

	constructor() {
		this.user = new User()
		this.win = null
		this.app = electron.app

		this.app.whenReady().then(() => {
			this.win = createMainWindow() //createAuthWindow()
		})
		this.app.on('window-all-closed', () => {
			if (process.platform !== 'darwin') {
				app.user.saveUserInFile()
				try {
					writeDataFiles(this.user.currentOeuvre, this.user.currentOeuvrePath)
				} catch {}
				this.app.quit()
			}
		})

		this.loadListener()
	}
	loadListener() {
		//LOGIN
		ipc.on('loginRequest', (event, arg) => {
			async function request() {
				const version = require(__dirname + '/package.json').version
				var keyBool = await checkKey(arg)
				var versionBool = await ckeckVersion(version);
				async function checkSession() {
					if (!versionBool) {
						event.reply('error', 'Check if your version is up to date please: ' + version)
					} else if (!keyBool) {
						event.reply('error', 'The key used no longer works')
					} else {
						var toDestroy = app.win
						app.win = createMainWindow()
						toDestroy.close()
					}
				}
				await checkSession()
			}
			try {
				request()
			} catch (error) {
				event.reply('error', 'The connection to the server failed.')
			}
		})
		//ALL
		ipc.on('changeWindowToDirectories', (event, arg) => {
			if (arg != "") {
				app.user.currentFolder = arg
			} else {
				try {
					writeDataFiles(app.user.currentOeuvre, app.user.currentOeuvrePath)
				} catch (error) {
					//sendLogs(error, "dev") No needs to do that
				}
			}
			loadFile(__dirname + '/renderers/directories.html')
		});
		//INIT
		ipc.on('initialize', (event, renderer) => {
			event.reply('foldersUpdate', app.user.folders)
			switch (renderer) {
				case 'home':
					break
				case 'config':
					event.reply('userData', app.user.getUserJson())
					break
				case 'directories':
					if (app.user.currentFolder != "") {
						try {
							event.reply('files', getPics(app.user.currentFolder))
						} catch {
							app.user.folders.pop(app.user.currentFolder)
							app.user.currentFolder = ""
							loadFile(__dirname + '/renderers/config.html')
							event.reply('error', 'The folder may have been moved or deleted.')
						}
					}
					break
			}
		});
		ipc.on('addFolderRequest', (event, arg) => {
			if (!isDirectory(arg)) {
				event.reply('invalidFolder')
			} else {
				if (arg.lastIndexOf('/') == arg.length - 1 || arg.lastIndexOf('\\') == arg.length - 1) {
					arg = arg.substring(0, arg.length - 1)
				}
				app.user.folders.push(arg);
				event.reply('foldersUpdate', app.user.folders)
			}
		});
		ipc.on('setUsername', (event, arg) => {
			app.user.username = arg;
		})
		ipc.on('setBaseUrl', (event, arg) => {
			app.user.baseUrl = arg;
		})
		ipc.on('setTimeToWait', (event, arg) => {
			if(!isNaN(arg) && arg > 1)
				app.user.timeToWait = arg;
		})
		//DIRECTORIES
		ipc.on('delCurrent', (event) => {
			app.user.folders.pop(app.user.currentFolder)
			loadFile(__dirname + '/renderers/config.html')
		});
		ipc.on('export', (event, arg) => {
			arg = arg.substring(0, arg.lastIndexOf('.')) + '.rdb'
			try {
				let dataTmp = readDataFiles(arg);
				getPics(app.user.currentFolder).forEach(element => {
					dataTmp.path = element;
					writeDataFiles(dataTmp, element.substring(0, element.lastIndexOf('.')) + '.rdb')
				})
				event.reply('exportWasMade', 'Export is completed.')
			} catch(error) {
				event.reply('exportWasMade', 'The export failed, please check if the selected configuration exists.')
			}
		})
		ipc.on('upload', (event) => {
			loadFile(__dirname + '/renderers/log.html')

			var allFiles = getFiles(app.user.currentFolder, 'rdb')
			var count = 0
			var errCount = 0
			var start = moment().format('LLL');

            
			async function lunchSession() {
                await delay(200)
                function castLog(log) {
                    var tdy = moment().format('LLL');
                    log = tdy + ': ' + log
                    sendLogs(log + '\n', 'user')
                    return log
                }
                function delay(time) {
                    return new Promise(function(resolve) {
                        setTimeout(resolve, time)
                    });
                }
				try {
					await setBrowser()
				} catch (error) {
					event.reply('log', castLog('Problem initializing the driver, check your chrome started and is well set.'), 'danger')
					return;
				}
				await delay(200)
				event.reply('log', castLog(app.user.currentFolder + ' upload will start.'), 'primary')
				for (const file of allFiles) {
					event.reply('update', count, errCount, allFiles.length, start)
					count++
					event.reply('log', castLog('Upload ' + count + '/' + allFiles.length + ' in progress.'), 'primary')
					try {
						await upload(readDataFiles(file), app.user.baseUrl, app.user.timeToWait)
						event.reply('log', castLog(file + ' was uploaded.'), 'success')
					} catch (error) {
						if (error.name == "TimeoutError") {
							event.reply('log', castLog(file + ' encountered an error during the upload. Please check that all languages of your base URL are checked.'), 'danger')
							errCount++
							break;
						} else {
							event.reply('log', castLog(error), 'danger')
							event.reply('log', castLog(file + ' encountered an error during the upload. Please retry and open a ticket if the error persists.'), 'danger')
							errCount++
							break;
						}
					}
				}
				event.reply('update', count, errCount, allFiles.length, start)
				event.reply('log', castLog('Upload done with ' + errCount + ' error(s).'), 'primary')
			}
			lunchSession()
		})
		ipc.on('selectedFile', (event, arg) => {
			app.user.currentOeuvrePath = arg.substring(0, arg.lastIndexOf('.')) + '.rdb'
			try {
				app.user.currentOeuvre = readDataFiles(app.user.currentOeuvrePath)
			} catch {
				app.user.currentOeuvre = require(__dirname + path.config.emptyOeuvre);
				app.user.currentOeuvre.path = arg;
			}
			writeDataFiles(app.user.currentOeuvre, app.user.currentOeuvrePath)
			loadFile(__dirname + '/renderers/oeuvre.html')
		});
		//OEUVRES
		ipc.on('exportLang', (event) => {
			let typeT
			switch (app.user.currentLang) {
				case "FR":
					typeT = [{
							tag: "description",
							value: app.user.currentOeuvre.description.FR
						},
						{
							tag: "tags",
							value: app.user.currentOeuvre.tags.FR
						},
						{
							tag: "title",
							value: app.user.currentOeuvre.title.FR
						}
					]
					break;
				case "EN":
					typeT = [{
							tag: "description",
							value: app.user.currentOeuvre.description.EN
						},
						{
							tag: "tags",
							value: app.user.currentOeuvre.tags.EN
						},
						{
							tag: "title",
							value: app.user.currentOeuvre.title.EN
						}
					]
					break;
				case "DK":
					typeT = [{
							tag: "description",
							value: app.user.currentOeuvre.description.DK
						},
						{
							tag: "tags",
							value: app.user.currentOeuvre.tags.DK
						},
						{
							tag: "title",
							value: app.user.currentOeuvre.title.DK
						}
					]
					break;
				case "ES":
					typeT = [{
							tag: "description",
							value: app.user.currentOeuvre.description.ES
						},
						{
							tag: "tags",
							value: app.user.currentOeuvre.tags.ES
						},
						{
							tag: "title",
							value: app.user.currentOeuvre.title.ES
						}
					]
					break;
				default:
					break;
			}
			let lang = ["FR", "EN", "DK", "ES"]
			lang.forEach(elementL => {
				typeT.forEach(elementT => {
					this.change(elementT.tag, elementL, app.user.currentOeuvre, elementT.value)
				})
			})
			event.reply('exportWasMade', "Export was succesfully made.")
		});

		ipc.on('changeFromOeuvreWindowToDirectories', (event, arg) => {
			app.user.currentFolder = arg
			writeDataFiles(user.currentOeuvre, app.user.currentOeuvrePath)
			if (win != null) {
				win.loadFile(path.views.directories)
			}
		});
		ipc.on('lang', (event, arg) => {
			switch (arg) {
				case "1":
					app.user.currentLang = "FR"
					break;
				case "2":
					app.user.currentLang = "EN"
					break;
				case "3":
					app.user.currentLang = "DK"
					break;
				case "4":
					app.user.currentLang = "ES"
					break;
				default:
					break;
			}
			event.reply('oeuvre', app.user.currentOeuvre, app.user.currentLang)
		});
		ipc.on('getOeuvre', (event) => {
			event.reply('oeuvre', app.user.currentOeuvre, app.user.currentLang)
		});
		ipc.on('title', (event, arg) => {
			this.change("title", app.user.currentLang, app.user.currentOeuvre, arg)
		});
		ipc.on('description', (event, arg) => {
			this.change("description", app.user.currentLang, app.user.currentOeuvre, arg)
		});
		ipc.on('tags', (event, arg) => {
			this.change("tags", app.user.currentLang, app.user.currentOeuvre, arg)
		});
		ipc.on('input', (event, arg) => {
			this.change("path", app.user.currentLang, app.user.currentOeuvre, arg)
		});
		ipc.on('log', (event, arg) => {
			console.log(arg)
		})
	}
	change(type, lang, oeuvre, newOne) {
		switch (type) {
			case "title":
				switch (lang) {
					case "FR":
						oeuvre.title.FR = newOne
						break;
					case "EN":
						oeuvre.title.EN = newOne
						break;
					case "DK":
						oeuvre.title.DK = newOne
						break;
					case "ES":
						oeuvre.title.ES = newOne
						break;
					default:
						break;
				}
				break;
			case "tags":
				switch (lang) {
					case "FR":
						oeuvre.tags.FR = newOne
						break;
					case "EN":
						oeuvre.tags.EN = newOne
						break;
					case "DK":
						oeuvre.tags.DK = newOne
						break;
					case "ES":
						oeuvre.tags.ES = newOne
						break;
					default:
						break;
				}
				break;
			case "description":
				switch (lang) {
					case "FR":
						oeuvre.description.FR = newOne
						break;
					case "EN":
						oeuvre.description.EN = newOne
						break;
					case "DK":
						oeuvre.description.DK = newOne
						break;
					case "ES":
						oeuvre.description.ES = newOne
						break;
					default:
						break;
				}
				break;
			case "path":
				oeuvre.path = newOne
				break;
			default:
				break;
		}
		app.user.currentOeuvre = oeuvre
	}
}
	const app = new App()