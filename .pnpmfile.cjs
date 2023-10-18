function afterAllResolved(lockfile, context) {
  console.info('---'.repeat(100), '9999')
  // console.info(lockfile)
  console.info('---'.repeat(100))
  return lockfile
}

module.exports = {
  hooks: {
    afterAllResolved
  }
}