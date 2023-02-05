import React, { FC, ReactNode, useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { FaTimes } from 'react-icons/fa'
import styles from '@/styles/Modal.module.scss'

interface ModalProps {
  show: boolean
  onClose: Function
  children: ReactNode
  modalTitle: string
}

const Modal: FC<ModalProps> = ({ show, onClose, children, modalTitle }) => {
  const [isBrowser, setIsBrowser] = useState(false)

  useEffect(() => setIsBrowser(true))

  const handleClose = (e) => {
    e.preventDefault()
    onClose()
  }

  const modalContent = show ? (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <button
            className={styles.xButton}
            type="button"
            onClick={handleClose}
          >
            <FaTimes />
          </button>
          {modalTitle && <h2>{modalTitle}</h2>}
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  ) : null

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById('modal-root')
    )
  }
  return null
}

export default Modal

// https://devrecipes.net/modal-component-with-next-js/
