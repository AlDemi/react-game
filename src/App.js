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

  const moveLeft = (isArrNew) => {
    console.log('move left')
    let oldGrid = data
    let newArray = cloneDeep(data)

    for (let i = 0; i < 4; i++) {
      let b = newArray[i]
      let slow = 0
      let fast = 1
      while (slow < 4) {
        if (fast === 4) {
          fast = slow + 1
          slow++
          continue
        }
        if (b[slow] === 0 && b[fast] === 0) {
          fast++
        } else if (b[slow] === 0 && b[fast] !== 0) {
          b[slow] = b[fast]
          b[fast] = 0
          fast++
        } else if (b[slow] !== 0 && b[fast] === 0) {
          fast++
        } else if (b[slow] !== 0 && b[fast] !== 0) {
          if (b[slow] === b[fast]) {
            b[slow] = b[slow] + b[fast]
            b[fast] = 0
            fast = slow + 1
            slow++
          } else {
            slow++
            fast = slow + 1
          }
        }
      }
    }
    if (JSON.stringify(oldGrid) !== JSON.stringify(newArray)) {
      addRandomTileNumber(newArray)
    }
    if (isArrNew) {
      return newArray
    } else {
      setData(newArray)
    }
  }

  const moveRight = (isArrNew) => {
    console.log('move right')
    let oldData = data
    let newArray = cloneDeep(data)

    for (let i = 3; i >= 0; i--) {
      let b = newArray[i]
      let slow = b.length - 1
      let fast = slow - 1
      while (slow > 0) {
        if (fast === -1) {
          fast = slow - 1
          slow--
          continue
        }
        if (b[slow] === 0 && b[fast] === 0) {
          fast--
        } else if (b[slow] === 0 && b[fast] !== 0) {
          b[slow] = b[fast]
          b[fast] = 0
          fast--
        } else if (b[slow] !== 0 && b[fast] === 0) {
          fast--
        } else if (b[slow] !== 0 && b[fast] !== 0) {
          if (b[slow] === b[fast]) {
            b[slow] = b[slow] + b[fast]
            b[fast] = 0
            fast = slow - 1
            slow--
          } else {
            slow--
            fast = slow - 1
          }
        }
      }
    }
    if (JSON.stringify(newArray) !== JSON.stringify(oldData)) {
      addRandomTileNumber(newArray)
    }
    if (isArrNew) {
      return newArray
    } else {
      setData(newArray)
    }
  }

  const moveDown = (isArrNew) => {
    console.log('move down')
    console.log(data)
    let b = cloneDeep(data)
    let oldData = JSON.parse(JSON.stringify(data))
    for (let i = 3; i >= 0; i--) {
      let slow = b.length - 1
      let fast = slow - 1
      while (slow > 0) {
        if (fast === -1) {
          fast = slow - 1
          slow--
          continue
        }
        if (b[slow][i] === 0 && b[fast][i] === 0) {
          fast--
        } else if (b[slow][i] === 0 && b[fast][i] !== 0) {
          b[slow][i] = b[fast][i]
          b[fast][i] = 0
          fast--
        } else if (b[slow][i] !== 0 && b[fast][i] === 0) {
          fast--
        } else if (b[slow][i] !== 0 && b[fast][i] !== 0) {
          if (b[slow][i] === b[fast][i]) {
            b[slow][i] = b[slow][i] + b[fast][i]
            b[fast][i] = 0
            fast = slow - 1
            slow--
          } else {
            slow--
            fast = slow - 1
          }
        }
      }
    }
    if (JSON.stringify(b) !== JSON.stringify(oldData)) {
      addRandomTileNumber(b)
    }
    if (isArrNew) {
      return b
    } else {
      setData(b)
    }
  }

  const moveUp = (isArrNew) => {
    console.log('move up')
    let b = cloneDeep(data)
    let oldData = JSON.parse(JSON.stringify(data))
    for (let i = 0; i < 4; i++) {
      let slow = 0
      let fast = 1
      while (slow < 4) {
        if (fast === 4) {
          fast = slow + 1
          slow++
          continue
        }
        if (b[slow][i] === 0 && b[fast][i] === 0) {
          fast++
        } else if (b[slow][i] === 0 && b[fast][i] !== 0) {
          b[slow][i] = b[fast][i]
          b[fast][i] = 0
          fast++
        } else if (b[slow][i] !== 0 && b[fast][i] === 0) {
          fast++
        } else if (b[slow][i] !== 0 && b[fast][i] !== 0) {
          if (b[slow][i] === b[fast][i]) {
            b[slow][i] = b[slow][i] + b[fast][i]
            b[fast][i] = 0
            fast = slow + 1
            slow++
          } else {
            slow++
            fast = slow + 1
          }
        }
      }
    }
    if (JSON.stringify(oldData) !== JSON.stringify(b)) {
      addRandomTileNumber(b)
    }
    if (isArrNew) {
      return b
    } else {
      setData(b)
    }
  }

  useEffect(() => {
    initialize()
  }, [])

  return <Board data={data} />
}

export default App
