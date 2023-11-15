import { Pagination } from "antd"
import { useState } from "react"

const User = () => {
  const [age, setAge] = useState(0)
  return <div>
    <span>user</span>
    {age} ccc
    <button type="button" onClick={() => setAge(age + 1)}>+</button>
    <Pagination defaultCurrent={6} total={500} />
  </div>
}

export default User