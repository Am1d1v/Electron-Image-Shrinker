const {app, BrowserWindow} = require('electron');


// Set environment
process.env.NODE_ENV = 'development';

// Development/Production environment check status 
const isDev = process.env.NODE_ENV !== 'production' ? true : false;

// Platform status
const isWin = process.platform === 'win32' ? true : false;

let mainWindow

function createMainWindow(){
    mainWindow = new BrowserWindow({
        title: 'ImageShrinker',
        width: 600,
        height: 600,
        icon: `${__dirname}/assets/Icon_256x256.png`
    });

    // File Path
    //mainWindow.loadURL(`file://${__dirname}/app/index.html`);
    mainWindow.loadFile('./app/index.html');
};


app.on('ready', createMainWindow);