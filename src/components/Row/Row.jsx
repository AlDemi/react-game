import { Cell } from '../Cell/Cell'
import styles from './Row.module.css'

export const Row = ({ row }) => {
  return (
    <div className={styles.row}>
      {row.map((digit, idx) => (
        <Cell num={digit} key={idx} />
      ))}
    </div>
  )
}
