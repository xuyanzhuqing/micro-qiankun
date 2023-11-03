import { useState } from "react"
import store from "store"

const User = function () {
  const [age, setAge] = useState(0)
  const { share } = store.getState()
  return <div>
    <span>user</span>
    {age} 测试
    <p>接收到 main 广播信息: {share.auth.join()}</p>
    <button type="button" onClick={() => setAge(age + 1)}>+</button>
  </div>
}
export default User