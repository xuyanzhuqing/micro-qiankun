const { name } = require('../../../package.json')

export default () => {
  return (
    <div>
      {name}
      <p>user</p>
    </div>
  )
}