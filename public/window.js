const { BrowserWindow } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

const currentWindows = new Map()

const createNewWindow = (windowId, options) => {
  options = options ? options : {};

  if (currentWindows.has(windowId)) return null

  const newWindow = new BrowserWindow({
    ...options
  })

  newWindow.on('closed', () => {
    currentWindows.delete(windowId)
  })

  const indexUrl = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`;
  if (windowId !== 'main') {
    newWindow.loadURL(`${indexUrl}/#/${windowId}`);
  } else {
    newWindow.loadURL(indexUrl);
  }

  currentWindows.set(windowId, newWindow);
  return newWindow;
}

const getWindow = (windowId) => {
  if (!currentWindows.has(windowId)) { return null }
  else { return currentWindows.get(windowId) }
}

module.exports = { createNewWindow, getWindow };
