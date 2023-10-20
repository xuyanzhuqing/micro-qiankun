const { series, parallel } = require('gulp');
const spawn = require('cross-spawn');
const shell = require('shelljs');

const config = {
  apps: [
    'main',
    'rhino'
  ],
  pkgs: [
    '@dnt/utils',
    '@dnt/locale',
    '@dnt/axios',
    '@dnt/theme',
    '@dnt/components'
  ]
}

const command = function (pkgName, cmd = 'build') {
  return () => spawn('pnpm', ['--filter', pkgName, cmd], { stdio: 'inherit' })
}

function runPkg(cmd) {
  return config.pkgs.map(pkg => command(pkg, cmd))
}

function runApp(cmd) {
  return config.apps.map(pkg => command(pkg, cmd))
}

exports.devApp = parallel(...runApp('start'))

exports.devPkg = parallel(...runPkg('dev'))

exports.dev = series(...runPkg('build'), parallel(...runPkg('dev'), ...runApp('start')))

exports.buildPkg = series(...runPkg('build'))

exports.buildApp = parallel(...runApp('build'))

// 打包之后制作安装包
exports.postBuild = series(
  cb => { shell.rm('-rf', './build'); cb() },
  cb => { shell.cp('-r', './apps/main/build', './build'); cb() },
  cb => { shell.mkdir('-p', './build/child'); cb() },
  cb => { shell.cp('-r', './apps/rhino/build', './build/child/rhino/'); cb() },
)