/* eslint-disable arrow-body-style */
import React from 'react'
import styles from '@/styles/Header.module.scss'

const Header = () => {
  return (
    <header className={styles.header}>
      <h2 className={styles.title}>Dream Interpretation AI</h2>
      <h4 className={styles.tagline}>
        Reveal the hidden messages{' '}
        <span style={{ letterSpacing: '.07em' }}>...</span>
      </h4>
    </header>
  )
}

export default Header
