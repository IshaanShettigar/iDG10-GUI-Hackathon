const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow() {
    const win = new BrowserWindow({
        width: 1920,
        height: 1080,
        icon: './public/icons/icon.ico'
    })

    win.setMenu(null)
    win.loadFile('./dist/index.html')

    // in dev mode, open dev tools
    // win.webContents.openDevTools()
}
app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})