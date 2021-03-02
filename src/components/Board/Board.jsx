import { useState } from 'react'
import { Cell } from '../Cell/Cell'
import { Row } from '../Row/Row'
import styles from './Board.module.css'

export const Board = () => {
  const [data, setData] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ])

  return (
    <div className={styles.board}>
      {data.map((row, idx) => {
        return <Row row={row} key={idx} />
      })}
    </div>
  )
}
