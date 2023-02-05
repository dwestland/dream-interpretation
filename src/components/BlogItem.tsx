import React, { FC, useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import toast, { Toaster } from 'react-hot-toast'
import Link from 'next/link'
import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa'
import Tooltip from 'rc-tooltip'
import styles from '@/styles/BlogItem.module.scss'
import 'rc-tooltip/assets/bootstrap.css'
import Modal from '@/components/Modal'
import DeleteModal from '@/components/DeleteModal'
import EditModal from '@/components/EditModal'

interface Blog {
  blog: {
    id: number
    body: string
    title: string
    author: {
      name: string
      email: string
      id: number
    }
  }
}

const BlogItem: FC<Blog> = ({ blog }): JSX.Element => {
  const { data: session } = useSession()
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const [showEditModal, setShowEditModal] = useState<boolean>(false)
  const { id, title, body, author } = blog
  const bestName = author.name ?? author.email

  // Lock scroll when Edit Modal is visible
  useEffect(() => {
    const documentBody = document.querySelector('body')
    documentBody.style.overflow = showEditModal ? 'hidden' : 'auto'
  }, [showEditModal])

  // Lock scroll when Delete Modal is visible
  useEffect(() => {
    const documentBody = document.querySelector('body')
    documentBody.style.overflow = showDeleteModal ? 'hidden' : 'auto'
  }, [showDeleteModal])

  const notifyEdit = () => {
    toast('You must be logged in to edit a blog', {
      style: {
        borderBottom: '1px solid crimson',
        borderLeft: '10px solid crimson',
        borderRight: '10px solid crimson',
        borderTop: '1px solid crimson',
      },
    })
  }

  const notifyDelete = () => {
    toast('You must be logged in to delete a blog', {
      style: {
        borderBottom: '1px solid crimson',
        borderLeft: '10px solid crimson',
        borderRight: '10px solid crimson',
        borderTop: '1px solid crimson',
      },
    })
  }

  const openEditModal = () => {
    if (!session) {
      notifyEdit()
      return null
    }
    setShowEditModal(true)
    return null
  }

  const openDeleteModal = () => {
    if (!session) {
      notifyDelete()
      return null
    }
    setShowDeleteModal(true)
    return null
  }

  return (
    <div className={styles.blogItem}>
      <div className={styles.row}>
        <Toaster />
        <span>
          <strong>{title}</strong>
        </span>
        <div className={styles.icons}>
          Blog ID {id} &nbsp;&nbsp;
          <Tooltip
            placement="top"
            trigger={['hover']}
            overlay={<span>Edit</span>}
          >
            <button
              type="button"
              className={styles.iconButton}
              onClick={openEditModal}
            >
              <FaPencilAlt className={styles.icon} />
            </button>
          </Tooltip>
          &nbsp;&nbsp;
          <Tooltip
            placement="top"
            trigger={['hover']}
            overlay={<span>Delete</span>}
          >
            <button
              type="button"
              className={styles.iconButton}
              onClick={openDeleteModal}
            >
              <FaTrashAlt className={styles.icon} />
            </button>
          </Tooltip>
          &nbsp;&nbsp;
        </div>
      </div>
      <div className={`${styles.row} ${styles.small}`}>
        <span>By {bestName}</span>
        <Link href={`/blog/${id}`}>Blog detail</Link>
      </div>
      <div className={styles.body}>
        <p>{body}</p>
      </div>
      {showDeleteModal && (
        <Modal
          modalTitle="Delete blog"
          show={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
        >
          <DeleteModal
            id={id}
            title={title}
            // body={body}
            onClose={() => setShowDeleteModal(false)}
            // closeEditModal={closeEditModal}
          />
        </Modal>
      )}
      {showEditModal && (
        <Modal
          modalTitle="Edit blog"
          show={showEditModal}
          onClose={() => setShowEditModal(false)}
        >
          <EditModal
            id={id}
            title={title}
            body={body}
            onClose={() => setShowEditModal(false)}
            // closeEditModal={closeEditModal}
          />
        </Modal>
      )}
    </div>
  )
}

export default BlogItem
