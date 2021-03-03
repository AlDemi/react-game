import cloneDeep from 'lodash.clonedeep'
import { useEffect, useState } from 'react'
import { Board } from './components/Board/Board'
import { useEvent } from './utils/event'
import Swipe from 'react-easy-swipe'
import styles from './App.module.css'

function App() {
  const UP_ARROW_KEY_NUMBER = 38
  const DOWN_ARROW_KEY_NUMBER = 40
  const LEFT_ARROW_KEY_NUMBER = 37
  const RIGHT_ARROW_KEY_NUMBER = 39

  const [data, setData] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ])

  const [gameOver, setGameOver] = useState(false)

  const initialize = () => {
    let newGrid = cloneDeep(data)

    addRandomTileNumber(newGrid)
    addRandomTileNumber(newGrid)
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
      if (attempts > 50) {
        gridFull = true
      }
    }
  }

  const moveLeft = (dummy) => {
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
    if (dummy) {
      return newArray
    } else {
      setData(newArray)
    }
  }

  const moveRight = (dummy) => {
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
    if (dummy) {
      return newArray
    } else {
      setData(newArray)
    }
  }

  const moveDown = (dummy) => {
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
    if (dummy) {
      return b
    } else {
      setData(b)
    }
  }

  const moveUp = (dummy) => {
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
    if (dummy) {
      return b
    } else {
      setData(b)
    }
  }

  const checkIfGameOver = () => {
    let checker = moveLeft(true)

    if (JSON.stringify(data) !== JSON.stringify(checker)) {
      return false
    }

    let checker2 = moveDown(true)

    if (JSON.stringify(data) !== JSON.stringify(checker2)) {
      return false
    }

    let checker3 = moveRight(true)

    if (JSON.stringify(data) !== JSON.stringify(checker3)) {
      return false
    }

    let checker4 = moveUp(true)

    if (JSON.stringify(data) !== JSON.stringify(checker4)) {
      return false
    }

    return true
  }

  const resetGame = () => {
    setGameOver(false)
    const emptyGrid = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]

    addRandomTileNumber(emptyGrid)
    addRandomTileNumber(emptyGrid)
    setData(emptyGrid)
  }

  const handleKeyDown = (event) => {
    if (gameOver) {
      return
    }

    switch (event.keyCode) {
      case UP_ARROW_KEY_NUMBER:
        moveUp()
        break
      case DOWN_ARROW_KEY_NUMBER:
        moveDown()
        break
      case LEFT_ARROW_KEY_NUMBER:
        moveLeft()
        break
      case RIGHT_ARROW_KEY_NUMBER:
        moveRight()
        break
      default:
        break
    }

    let gameOver2 = checkIfGameOver()

    if (gameOver2) {
      setGameOver(true)
    }
  }

  useEffect(() => {
    initialize()
  }, [])

  useEvent('keydown', handleKeyDown)

  return (
    <>
      <div className={styles.heading}>
        <div className={styles.headingContainer}>
          <div className={styles.title}>2048</div>
          <div className={styles.newGameButtonContainer}>
            <div onClick={resetGame} className={styles.btn}>
              NEW GAME
            </div>
          </div>
        </div>
        <div className={styles.gameOverContainer}>
          {gameOver && (
            <div className={styles.gameOverOverlay}>
              <div>
                <div className={styles.gameOverBlock}>Game Over</div>
                <div>
                  <div className={styles.tryAgainButtonBlock}>
                    <div onClick={resetGame} className={styles.btn}>
                      TRY AGAIN
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <Swipe
            onMoveDown={() => {
              moveDown()
            }}
            onMoveLeft={() => moveLeft()}
            onMoveRight={() => moveRight()}
            onMoveUp={() => moveUp()}
            style={{ overflowY: 'hidden' }}>
            <Board data={data} />
          </Swipe>
        </div>

        <div
          className={styles.gameExplanationBlock}
          style={{ width: 'inherit' }}>
          <p class='game-explanation'>
            <strong class='important'>How to play:</strong> Use your{' '}
            <strong>arrow keys</strong> to move the tiles. Tiles with the same
            number <strong>merge into one</strong> when they touch.
          </p>
        </div>
      </div>
    </>
  )
}

export default App
