import React, { FC } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import queryKeys from '@/common/constants/queryKeys'
import styles from '@/styles/ModalForm.module.scss'

interface ModalProps {
  id: number
  title: string
  onClose: Function
}

const DeleteModal: FC<ModalProps> = ({ id, title, onClose }): JSX.Element => {
  const queryClient = useQueryClient()
  const url = `${process.env.NEXT_PUBLIC_API}/blogs`

  const deleteBlog = async () => {
    await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          id,
        },
      }),
    })
  }

  const mutation = useMutation(deleteBlog, {
    onSuccess: () => {
      onClose()
    },
    onError: (err) => {
      console.log(err)
    },
    onSettled: () => {
      queryClient.invalidateQueries(queryKeys.allBlogs)
    },
  })

  return (
    <div>
      <br />
      <p style={{ fontSize: '20px' }}>Are you sure you want to delete:</p>
      <p style={{ fontSize: '24px' }}>&quot;{title}&quot;?</p>
      <br />
      <div className={styles.buttonContainer}>
        <button
          className="primary-button"
          type="button"
          onClick={() => {
            mutation.mutate()
          }}
        >
          Delete
        </button>
        <button
          className="ghost-button"
          type="button"
          onClick={() => onClose()}
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export default DeleteModal
