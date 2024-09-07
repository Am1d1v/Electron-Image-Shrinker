const {app, BrowserWindow, Menu, globalShortcut, ipcMain, shell} = require('electron');
const path = require('path');
const os = require('os');
const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const slash = require('slash');


// Set environment
process.env.NODE_ENV = 'development';

// Development/Production environment check status 
const isDev = process.env.NODE_ENV !== 'production' ? true : false;

// Platform status
const isWin = process.platform === 'win32' ? true : false;

let mainWindow;
let aboutWindow;

function createMainWindow(){
    mainWindow = new BrowserWindow({
        title: 'ImageShrinker',
        width: isDev ? 1800 : 900,
        height: 600,
        icon: `${__dirname}/assets/Icon_256x256.png`,
        resizable: !isDev,
        backgroundColor: 'white',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    if(isDev){
        mainWindow.webContents.openDevTools();
    }

    // File Path
    //mainWindow.loadURL(`file://${__dirname}/app/index.html`);
    mainWindow.loadFile('./app/index.html');
};

// About Window. Contains info about app
function createAboutWindow(){
    aboutWindow = new BrowserWindow({
        title: 'About ImageShrinker',
        width: 300,
        height: 300,
        icon: `${__dirname}/assets/Icon_256x256.png`,
        resizable: false,
        backgroundColor: 'white'
    });

    // File Path
    aboutWindow.loadFile('./app/about.html');
};

app.on('ready', () => {
    createMainWindow();

    // Create Menu
    const mainMenu = Menu.buildFromTemplate(menu);
    Menu.setApplicationMenu(mainMenu);

    // Reload window
    globalShortcut.register('Ctrl+R', () => mainWindow.reload());

    // Show dev tools
    globalShortcut.register('Ctrl+Alt+I', () => mainWindow.toggleDevTools());

    mainWindow.on('close', () => mainWindow = null);
});


// Menu Items 
const menu = [
    ...(isWin ?[{
        label: app.name,
        submenu: [
            {
                label: 'About',
                click: createAboutWindow
            }
        ]
    }] : []),
    {
        label: 'Developer',
        submenu: [
            {role: 'reload'},
            {role: 'forcereload'},
            {type: 'separator'},
            {role: 'toggledevtools'},
        ]
    }
];

// Image catch
ipcMain.on('image:minimize', (e, options) => {
    options.dest = path.join(os.homedir(), 'imageshrink');
    shrinkImage(options);
});

async function shrinkImage({imgPath, quality, dest}){
    try {
        const pngQuality = quality/100;

        const files = await imagemin([slash(imgPath)], {
            destination: 'imageshrink',
            plugins: [
                imageminMozjpeg({quality}),
                imageminPngquant({
                    quality: [pngQuality, pngQuality]
                })
            ]
        })

        console.log(files);
        console.log(dest);
        console.log(imgPath);

        shell.openPath(dest);
    } catch (error) {
        console.log(error);
    }
}

// Quit when all windows are closed
app.on('window-all-closed', () => {
    if(!isWin){
        app.quit();
    }
});

app.on('activate', () => {
    if(BrowserWindow.getAllWindows().length === 0){
        createMainWindow();
    }
});