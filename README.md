# RedBubble auto-upload Bot
## About

* This bot will allow you to send designs to the redbubble platform automatically and faster
* Project status: Prototype
* You can find some support on my discord : https://discord.gg/YHbUUz7sC6

## Table of contents

> * [RedBubble auto-upload Bot](#RedBubble-auto-upload-Bot)
>   * [About](#about)
>   * [Table of contents](#table-of-contents)
>   * [Installation](#installation)
>   * [Usage](#usage)
>     * [Screenshots](#screenshots)
>     * [Features](#features)
>   * [Code](#code)
>     * [Content](#content)
>     * [Requirements](#requirements)
>     * [Build](#build)
>     * [Deploy (how to install build product)](#deploy-how-to-install-build-product)
>   * [License](#license)
>   * [About Celerity](#about-celerity)

## Installation

* Download the bot via GitHub.
* Create a chrome shortcut.
* Left click on the shortcut, property tab and paste this to the end: `--remote-debugging-port=9222`
* Close all your chrome tabs.
* Open chrome from your shortcut, log in to redbubble and let the tab open.
* Run `npm install` at the root of the project to download modules.
* Run the bot with `npm start` at the root of the project.
* This is a free key for you `c3TvMXLsWTzs5Jan` (I might do a branch without authentication later)

## Usage

Use this bot to send your works quickly on Redbbuble. Be careful not to spam the platform or you will be banned. I advise you to do less than 20 uploads per day.
Leave a gap between uploads, I recommend 120 to 360 seconds.

### Screenshots
#### Config tab
![Settings screen shot](https://github.com/clementjuventin/Javascript-ElectronJS-Celerity/blob/main/Admin/Documentation/config.PNG)

#### Folder tab
![Folder tab screen shot](https://github.com/clementjuventin/Javascript-ElectronJS-Celerity/blob/main/Admin/Documentation/oeuvres.PNG)

#### Works details
![Works details screen shot](https://github.com/clementjuventin/Javascript-ElectronJS-Celerity/blob/main/Admin/Documentation/description.PNG)

#### Example of usage
![Example of usage screen shot](https://github.com/clementjuventin/Javascript-ElectronJS-Celerity/blob/main/Admin/Documentation/exempleDutilisation.PNG)

#### Upload session
![Upload session screen shot](https://github.com/clementjuventin/Javascript-ElectronJS-Celerity/blob/main/Admin/Documentation/sesEnd.PNG)


### Features
Here are the main options to be filled in the config tab. 
* The file path field allows you to paste the path to your directory containing the images you want to upload.
* The base URL represents the work configuration you wish to hang on. 
* The username field is unnecessary at this time.

Here are the main features in the folder tab. 
* Export: Copy a work configuration to all other
* Refresh: Refresh the directory
* Upload: Start an upload session
* Bin: Delete the directory

Here are the main features in the works details tab. 
* Retour: Back to folder tab
* Lang: Choose your language. This will not be applied if the base work does not reference the language.
* Export: Export a lang to all other

## Code

### Content

I had to slightly modify the puppeteer module to make it work.

### Requirements

[electron](https://www.electronjs.org/n)
[puppeteer](https://www.npmjs.com/package/puppeteer)
[bcrypt](https://www.npmjs.com/package/bcrypt)
[deepmerge](https://www.npmjs.com/package/deepmerge)
[jquery](https://www.npmjs.com/package/jquery)
[mysql](https://www.npmjs.com/package/mysql)

### Build

* Download electron-builder
* Run `electron-builder` at the root of the project
* I have never been able to get the build to work other than by moving all the .js files (excluding modules) into the new directory created

### Deploy (how to install build product)

Once you built the bot, you can just start it from the .exe file.

## License

I made it myself, if this bot allowed you to earn money and you are grateful here is my paypal: clementjuventinp@gmail.com  :)

## About Celerity

I did this project out of curiosity to learn and because I use it personally.
I don't know if I will continue to improve this tool, but if you are interested contact me by mail or on discord!
