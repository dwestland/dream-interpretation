import React, { useState } from 'react'
import router from 'next/router'
import styles from '@/styles/Search.module.scss'

const Search = () => {
  const [term, setTerm] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    router.push(`/blog/search-results?term=${term}`)
    setTerm('')
  }

  return (
    <div className={styles.search}>
      <form onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="search"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Search Blogs"
        />
      </form>
    </div>
  )
}

export default Search
