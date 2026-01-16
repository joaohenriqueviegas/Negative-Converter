import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
  processImage: (payload: any) =>
    ipcRenderer.invoke("process-image", payload),
  selectExportDir: () =>
    ipcRenderer.invoke("select-export-dir")
});
