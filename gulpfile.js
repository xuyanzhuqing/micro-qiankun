const { series, parallel } = require('gulp');
const spawn = require('cross-spawn');
var shell = require('shelljs');

const command = function (pkgName, cmd = 'build') {
  return () => spawn('pnpm', ['--filter', pkgName, cmd], { stdio: 'inherit' })
}

function runPkg(cmd = 'build') {
  return [
    command('@dnt/utils', cmd),
    command('@dnt/locale', cmd),
    command('@dnt/axios', cmd),
    command('@dnt/theme', cmd),
    command('@dnt/components', cmd),
  ]
}

function startApp(cb) {
  return spawn('pnpm', ['start:app'], { stdio: 'inherit' })
}

exports.buildPkg = series(...runPkg())

exports.dev = series(...runPkg(), parallel(...runPkg('dev'), startApp))