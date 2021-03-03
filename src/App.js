import cloneDeep from 'lodash.clonedeep'
import { useEffect, useState } from 'react'
import { Board } from './components/Board/Board'

function App() {
  const [data, setData] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ])

  const initialize = () => {
    let newGrid = cloneDeep(data)
    console.log('New greed: ', newGrid)

    addRandomTileNumber(newGrid)
    console.table(newGrid)
    addRandomTileNumber(newGrid)
    console.table(newGrid)
    setData(newGrid)
  }

  const addRandomTileNumber = (newGrid) => {
    let added = false
    let gridFull = false
    let attempts = 0
    while (!added) {
      if (gridFull) {
        break
      }

      let rand1 = Math.floor(Math.random() * 4)
      let rand2 = Math.floor(Math.random() * 4)
      attempts++
      if (newGrid[rand1][rand2] === 0) {
        newGrid[rand1][rand2] = Math.random() > 0.5 ? 2 : 4
        added = true
      }
    }
  }

  useEffect(() => {
    initialize()
  }, [])

  return <Board data={data} />
}

export default App
