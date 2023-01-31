const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');

let win;

function createWindow() {
  win = new BrowserWindow({ width: 800, height: 600 });

  // load the dist folder from Angular
  win.loadURL(
    url.format({
      pathname: path.resolve(__dirname, `../electron-angular-tut-test/index.html`),
      protocol: 'file:',
      slashes: true
    })
  );

  // The following is optional and will open the DevTools:
  // win.webContents.openDevTools()

  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', createWindow);

// on macOS, closing the window doesn't quit the app
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.handle('ping', (event, arg) => {
    return Promise.resolve("pong");
})

// initialize the app's main window
app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
