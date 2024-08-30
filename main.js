const {app, BrowserWindow} = require('electron');

function createMainWindow(){
    const mainWindow = new BrowserWindow({
        title: 'ImageShrinker',
        width: 600,
        height: 600
    })
};

app.on('ready', createMainWindow);