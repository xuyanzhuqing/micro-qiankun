import { useState } from "react"

const User = () => {
  const [age, setAge] = useState(0)
  return <div>
    <span>user</span>
    {age} ccc
    <button type="button" onClick={() => setAge(age + 1)}>+</button>
  </div>
}

export default User