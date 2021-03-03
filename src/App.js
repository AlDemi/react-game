import { useState } from 'react'
import { Board } from './components/Board/Board'

function App() {
  const [data, setData] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ])
  return <Board data={data} />
}

export default App
