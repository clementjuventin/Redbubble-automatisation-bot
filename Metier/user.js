//const {readDataFiles, writeDataFiles, isDirectory} = require(__dirname+'/../Data/dataManager.js')

const userPath = __dirname+'/..'+require(__dirname+'/../config/path.json').config.userData
const {readDataFiles, writeDataFiles, isDirectory, sendLogs} = require(__dirname+'/../Data/dataManager.js')

class User{
    constructor() {
        this.folders = []
        this.username = ""
        this.baseUrl = ""
        this.update = 0
        this.session = 0
        this.timeToWait = 360

        this.currentLang = "FR"
        this.currentFolder =""
        this.currentOeuvre = null
        this.currentOeuvrePath = ""
        try {
            this.loadUserFromFile()
        } catch (error) {
            sendLogs(error, "dev")
        }
    }

    loadUserFromFile(){
        let config = readDataFiles(userPath)
            config.folders.forEach(element => {
                if(isDirectory(element)){
                    this.folders.push(element)
                }
            });
            this.username = config.username
            this.baseUrl = config.baseUrl
            this.update = config.update
            this.session = config.session
            this.timeToWait = config.time
    }

    saveUserInFile(){
        try {
            writeDataFiles(this.getUserJson(),userPath)
        } catch (error) {
            sendLogs(error, "dev")
        }
    }

    getUserJson(){
        return {
            "folders": this.folders,
            "username": this.username,
            "baseUrl": this.baseUrl,
            "update": this.update,
            "session": this.session,
            "time": this.timeToWait
            }
    }
}

module.exports = User