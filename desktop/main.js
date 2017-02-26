const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win, splashScreen,
    windowParams = {
        width: 720,
        height: 670,
        show: false
    };

function createWindow () {
    // Create the browser window.
    win = new BrowserWindow(windowParams);

    // and load the index.html of the app.
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'resources/index.html'),
        protocol: 'file:',
        slashes: true
    }));

    win.webContents.on('did-finish-load', () => {
        win.show();

        if (splashScreen) {
            let splashScreenBounds = splashScreen.getBounds();
            win.setBounds(splashScreenBounds);
            splashScreen.close();
        }
    });

    // Open the DevTools.
    win.webContents.openDevTools()

    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null
    })
}

function createSplashScreen() {
    splashScreen = new BrowserWindow(Object.assign(windowParams, {parent: win}));
    splashScreen.loadURL(url.format({
        pathname: path.join(__dirname, 'resources/splash.html'),
        protocol: 'file:',
        slashes: true
    }));
    splashScreen.on('closed', () => splashScreen = null);
    splashScreen.webContents.on('did-finish-load', () => {
        splashScreen.show();
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
    createSplashScreen();
    setTimeout(function() {
        createWindow();
    }, 5000);

});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow()
    }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.