import React from 'react'
import { useQuery } from 'react-query'
import { useRouter } from 'next/router'
import Navbar from '@/components/Navbar'

interface Blog {
  blog: {
    id: number
    body: string
    title: string
    author: {
      name: string
      email: string
    }
  }
}

const Details = () => {
  const router = useRouter()
  const { id } = router.query

  const fetchBlog = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/blog/${+id}`)
    return res.json()
  }

  const { data, error, isLoading, isError } = useQuery<Blog, Error>(
    'blogDetail',
    fetchBlog
  )

  if (isLoading) {
    return (
      <div className="container">
        <Navbar />
        <span>Loading...</span>
      </div>
    )
  }

  if (isError) {
    return <span>Error: {error?.message}</span>
  }
  const { title, body, author } = data.blog
  const bestName = author.name ?? author.email

  return (
    <div className="container">
      <Navbar />
      <h1>Blog details</h1>
      <h2>{title}</h2>
      <p>
        By <i>{bestName}</i>
      </p>
      <p>{body}</p>
    </div>
  )
}
export default Details
