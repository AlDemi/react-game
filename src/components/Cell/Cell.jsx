import { getColors } from '../../utils/colors-manager'
import styles from './Cell.module.css'

export const Cell = ({ num }) => {
  return (
    <div
      className={styles.cell}
      style={{
        background: getColors(num),
        // color: num === 2 || num === 4 ? '#645B52' : '#F7F4EF',
      }}>
      {num !== 0 ? num : ''}
    </div>
  )
}
