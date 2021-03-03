import styles from './Cell.module.css'

export const Cell = ({ num }) => {
  return <div className={styles.cell}>{num}</div>
}
