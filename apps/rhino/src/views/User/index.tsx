import { useState } from "react"

const User = function () {
  const [age, setAge] = useState(0)
  return <div>
    <span>user</span>
    {age} 测试
    <button type="button" onClick={() => setAge(age + 1)}>+</button>
  </div>
}
export default User