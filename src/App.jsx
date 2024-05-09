import { useState } from 'react'
import './App.css'
import Qzapp from './Components/Qzapp'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Qzapp/>
    </>
  )
}

export default App
