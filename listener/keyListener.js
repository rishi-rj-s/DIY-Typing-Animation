const keyboard = require('nkbhook');

function startKeyListener(mainWindow) {
  let idleTimeout;
  let sleepTimeout;

  function sendAnimation(state) {
    console.log('Sending state to renderer:', state);
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send('update-animation', state);
    }
  }

  function resetTimers() {
    console.log('🔑 Key pressed, updating animation...');
    clearTimeout(idleTimeout);
    clearTimeout(sleepTimeout);

    sendAnimation('typing');

    idleTimeout = setTimeout(() => {
      sendAnimation('idle');

      sleepTimeout = setTimeout(() => {
        sendAnimation('sleeping');
      }, 3700);
    }, 300);
  }

  keyboard.start().onPressed(resetTimers);
}

module.exports = { startKeyListener };