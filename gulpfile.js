const { series, parallel } = require('gulp');
const spawn = require('cross-spawn');
const shell = require('shelljs');
const process = require('process');
const path = require('path');
const config = {
  apps: [
    'main',
    'rhino',
    'auth'
  ],
  pkgs: [
    '@dnt/config',
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
  ...config.apps
    .filter(app => app !== 'main')
    .map(app => {
      return cb => { shell.cp('-r', `./apps/${app}/build`, `./build/child/${app}/`); cb() }
    })
)


/**
 * 更新 iconfont
 */
const rcMap = new Map(
  shell
    .cat('./.iconfontrc')
    .replace(/\s?=\s?/g, '=')
    .replace(/\"/g, "")
    .split('\n')
    .map(v => v.split('=')))
const iconfontShells = shell.ls("./apps/**/*/iconfont/iconfont.json")
  .map(iconfont => {
    const { id, name } = JSON.parse(shell.cat(iconfont).toString())
    const filePath = path.join(process.cwd(), path.dirname(iconfont), '..')
    const user = rcMap.get('user')
    const password = rcMap.get('password')

    if (!user || !password) {
      console.info(
        `
        please run the flowing command and fix the iconfont configuration

        touch .iconfontrc
        echo user=YOUR_USERNAME\\\\npassword=YOUR_PASSWORD > .iconfontrc

        `)
      throw new Error('login iconfont  missing username or password')
    }

    return () => spawn('iconfont-manager', ['updateOne', id, name, user, password, filePath])
  })

exports.iconfont = parallel(...iconfontShells)