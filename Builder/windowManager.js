const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;
const Tray = electron.Tray;
const Menu = electron.Menu;

const path = require(__dirname+'/../config/path.json');
var win

function createAuthWindow() {
    win = new BrowserWindow({
        width: 400,
        height: 70,
        resizable: false,
        webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: false,
        }
    });
    win.setIcon('./assets/img/rdb.ico');
    win.setMenu(null) //Disable menu
    win.loadFile(__dirname+'/../renderers/login.html')
    return win
}
async function createMainWindow() {
    //Icon de menu en bas à droite de l'écran
    const tray = new Tray(__dirname+'/..'+path.appIcon);
    tray.setToolTip('UltimateBubble is running');
    const menu = Menu.buildFromTemplate([ //Click droit
        {
            label: 'Click here to join the discord!',
            click: () => {
                electron.shell.openExternal('https://discord.gg/QXxurRTbBY');
            }
        }
    ]);
    tray.setContextMenu(menu);
    //Window settings
    win = new BrowserWindow({
        width: 1000,
        height: 700,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })
    win.setMenu(null) //Disable menu
    win.setIcon(__dirname+'/..'+path.appIconIco);
    win.loadFile(__dirname+'/../renderers/home.html')
    return win
}

function loadFile(file){
    win.loadFile(file)
}

module.exports = {createAuthWindow, createMainWindow, loadFile};