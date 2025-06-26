require('child_process').spawn('pnpm', ['start'], {
  shell: true,
  detached: true,
  stdio: 'ignore',
  env: {
    ...process.env,
    CHIBI_LAUNCHED: 'true'
  }
}).unref();