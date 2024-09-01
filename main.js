const {app, BrowserWindow, Menu, globalShortcut} = require('electron');


// Set environment
process.env.NODE_ENV = 'production';

// Development/Production environment check status 
const isDev = process.env.NODE_ENV !== 'production' ? true : false;

// Platform status
const isWin = process.platform === 'win32' ? true : false;

let mainWindow;
let aboutWindow;

function createMainWindow(){
    mainWindow = new BrowserWindow({
        title: 'ImageShrinker',
        width: 900,
        height: 600,
        icon: `${__dirname}/assets/Icon_256x256.png`,
        resizable: !isDev,
        backgroundColor: 'white'
    });

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