import React from 'react'
import styles from '@/styles/Footer.module.scss'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <p>Copyright &copy; {year}</p>
    </footer>
  )
}

export default Footer
