import { app, BrowserWindow, ipcMain, dialog } from "electron";
import path from "path";
import { processImage16 } from "../src/utils/processImage16.js";

function createWindow() {
  const win = new BrowserWindow({
    width: 1500,
    height: 900,
    backgroundColor: "#020617",
    webPreferences: {
      preload: path.join(__dirname, "preload.ts")
    }
  });

  win.loadURL("http://localhost:5173");
}

ipcMain.handle("process-image", async (_, payload) => {
  const { input, output, settings } = payload;
  await processImage16(input, output, settings);
  return output;
});

ipcMain.handle("select-export-dir", async () => {
  const result = await dialog.showOpenDialog({ properties: ["openDirectory"] });
  return result.filePaths[0];
});

app.whenReady().then(createWindow);
