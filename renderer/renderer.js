const { ipcRenderer } = require('electron');
const chibi = document.getElementById('chibi');

ipcRenderer.on('update-animation', (_, state) => {
  chibi.src = `../assets/${state}.gif?${Date.now()}`;
});

window.addEventListener('wheel', () => {
  window.dispatchEvent(new CustomEvent('user-scroll'));
});

let scrollTimeout;

window.addEventListener('user-scroll', () => {
  chibi.src = `../assets/scrolling.gif?${Date.now()}`;

  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    chibi.src = `../assets/idle.gif?${Date.now()}`;
  }, 300);
});