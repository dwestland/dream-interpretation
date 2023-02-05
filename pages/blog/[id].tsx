import React, { useEffect } from 'react'
import { useQuery } from 'react-query'
import { useRouter } from 'next/router'
import Layout from '@/components/Layout'

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

const BlogDetailPage = () => {
  const router = useRouter()
  const { id } = router.query

  const fetchBlog = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/blog/${+id}`)
    return res.json()
  }

  const { data, error, isLoading, isError, refetch, isFetched } = useQuery<
    Blog,
    Error
  >('blog', fetchBlog)

  useEffect(() => {
    refetch()
  }, [isFetched])

  const pageResult = () => {
    if (isLoading) {
      return <h4>Loading...</h4>
    }

    if (isError) {
      console.log('Error loading blog detail: ', error?.message)
      return <h4>Error loading blog detail</h4>
    }

    if (data.blog) {
      return (
        <>
          <h2>{data.blog.title}</h2>
          <p>
            Author: <i>{data.blog.author.name}</i>
          </p>
          <p>{data.blog.body}</p>
        </>
      )
    }

    return null
  }

  return (
    <Layout title="Document" description="Document description">
      <main>
        <section>
          <h1>Blog Detail</h1>
          {pageResult()}
        </section>
      </main>
    </Layout>
  )
}

export default BlogDetailPage
