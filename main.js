const { app, BrowserWindow, Menu, ipcMain } = require("electron");

let window_open = false;
let popup, win;

const menu = [
  {
    label: "File",
    submenu: [
      {
        label: "Hello",
        accelerator: "Ctrl+H",
        click() {
          console.log("Hello");
        },
      },
      {
        label: "New Window",
        accelerator: "Ctrl+N",
        click() {
          createPopupWindow();
        },
      },
      {
        label: "Quit",
        accelerator: "ESC",
        click() {
          app.quit();
        },
      },
    ],
  },
  {
    label: "DevTools",
    accelerator: "F12",
    click(_item, focusedWindow) {
      focusedWindow.toggleDevTools();
    },
  },
];

const createWindow = () => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  win.loadFile("index.html");
};

const createPopupWindow = () => {
  if (window_open) return;
  popup = new BrowserWindow({
    width: 300,
    height: 200,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  window_open = true;

  popup.on("close", () => {
    window_open = false;
    popup = null;
  });

  popup.loadFile("popup.html");
  popup.setMenu(null);
};

app.on("window-all-closed", () => app.quit());

app.whenReady().then(() => {
  createWindow();

  const template = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(template);
});

ipcMain.on("data-from-popup", (_e, payload) => {
  popup.close();
  win.webContents.send("update", payload);
});
