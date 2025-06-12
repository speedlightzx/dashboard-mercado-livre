import { contextBridge, ipcRenderer } from 'electron'

// Expor funções customizadas para o Renderer
contextBridge.exposeInMainWorld('electronAPI', {
})