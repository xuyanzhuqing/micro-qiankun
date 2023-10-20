const { series, parallel } = require('gulp');
const spawn = require('cross-spawn');
var shell = require('shelljs');

function buildPkg(cb) {
  return spawn('pnpm', ['build:pkg'], { stdio: 'inherit' })
}

function startPkg(cb) {
  return spawn('pnpm', ['start:pkg'], { stdio: 'inherit' })
}

function startApp(cb) {
  return spawn('pnpm', ['start:app'], { stdio: 'inherit' })
}

exports.start = series(buildPkg, parallel(startPkg, startApp))