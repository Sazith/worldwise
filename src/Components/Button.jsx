/* eslint-disable no-unused-vars */
import styles from './Button.module.css'

// eslint-disable-next-line react/prop-types
const Button = ({children, onClick, type}) => {
  return (
    <button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>
      {children}
    </button>
  )
}

export default Button
