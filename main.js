const {app, BrowserWindow} = require('electron');

let mainWindow

function createMainWindow(){
    mainWindow = new BrowserWindow({
        title: 'ImageShrinker',
        width: 600,
        height: 600,
        icon: './assets/Icon_256x256.png'
    });

    // File Path
    //mainWindow.loadURL(`file://${__dirname}/app/index.html`);
    mainWindow.loadFile('./app/index.html');
};


app.on('ready', createMainWindow);