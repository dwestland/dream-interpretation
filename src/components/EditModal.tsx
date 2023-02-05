import React, { FC, useState, useEffect, useRef } from 'react'
import styles from '@/styles/ModalForm.module.scss'
import { useMutation, useQueryClient } from 'react-query'
import queryKeys from '@/common/constants/queryKeys'

interface ModalProps {
  id: number
  title: string
  body: string
  onClose: Function
}

const EditModal: FC<ModalProps> = ({
  id,
  title,
  body,
  onClose,
}): JSX.Element => {
  const queryClient = useQueryClient()
  const inputReference = useRef(null)
  const url = `${process.env.NEXT_PUBLIC_API}/blogs`

  const [errorMessage, setErrorMessage] = useState('')
  const [values, setValues] = useState({
    title: '',
    body: '',
  })

  useEffect(() => {
    inputReference.current.focus()
  }, [])

  useEffect(() => {
    setValues({ title, body })
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  const editBlog = async () => {
    await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          id,
          title: values.title,
          body: values.body,
        },
      }),
    })
  }

  const mutation = useMutation(editBlog, {
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    const hasEmptyFields = Object.values(values).some(
      (element) => element === ''
    )
    if (hasEmptyFields) {
      setErrorMessage('Please fill in all fields')
      return null
    }
    mutation.mutate()

    return null
  }

  return (
    <div>
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <div className={styles.section}>
            <label htmlFor="title">
              Title
              <input
                spellCheck="true"
                type="text"
                id="title"
                name="title"
                value={values.title}
                onChange={handleInputChange}
                ref={inputReference}
              />
            </label>
          </div>
          <div className={styles.section}>
            <label htmlFor="body">
              Body
              <textarea
                spellCheck="true"
                name="body"
                id="body"
                value={values.body}
                onChange={handleInputChange}
              />
            </label>
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <button type="submit" className="primary-button">
            Update
          </button>
          <button
            className="ghost-button"
            type="button"
            onClick={() => onClose()}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditModal
