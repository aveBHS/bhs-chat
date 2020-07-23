const {app, BrowserWindow} = require("electron");

function start(){
    let main = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    main.loadFile("./html/index.html");
    main.show();
}

app.whenReady().then(start);