const keyboard = require('nkbhook');

function startKeyListener(mainWindow) {
  let idleTimeout;
  let sleepTimeout;

  function sendAnimation(state) {
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send('update-animation', state);
    }
  }

  function resetTimers() {
    clearTimeout(idleTimeout);
    clearTimeout(sleepTimeout);

    sendAnimation('typing');

    idleTimeout = setTimeout(() => {
      sendAnimation('idle');

      sleepTimeout = setTimeout(() => {
        sendAnimation('sleeping');
      }, 3700);
    }, 500);
  }

  keyboard.start().onPressed(resetTimers);
}

module.exports = { startKeyListener };