const { ipcRenderer } = require('electron');
const chibi = document.getElementById('chibi');

ipcRenderer.on('update-animation', (_, state) => {
  switch (state) {
    case 'typing':
      chibi.src = '../assets/typing.gif';
      break;
    case 'sleeping':
      chibi.src = '../assets/sleeping.gif';
      break;
    default:
      chibi.src = '../assets/idle.gif';
  }
});