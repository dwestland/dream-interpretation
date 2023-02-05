import React, { useEffect } from 'react'
import { useQuery } from 'react-query'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '@/components/Layout'

interface Search {
  blogs: []
}

interface SearchResults {
  id: number
  body: string
  title: string
}

const searchResults = () => {
  const url = `${process.env.NEXT_PUBLIC_API}/blog/search`
  const router = useRouter()
  const searchTerm = router.query.term

  const fetchSearchResults = async () => {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        search: {
          term: searchTerm,
        },
      }),
    })
    return res.json()
  }

  const { data, error, isLoading, isError, refetch } = useQuery<Search, Error>(
    'searchResults',
    fetchSearchResults
  )

  useEffect(() => {
    refetch()
  }, [searchTerm])

  const result = () => {
    if (isLoading) {
      return <span>Loading...</span>
    }

    if (isError) {
      return <span>Error: {error?.message}</span>
    }

    if (data.blogs.length === 0) {
      return <span>No results found</span>
    }

    const results = data.blogs.map((blog: SearchResults) => (
      <p key={blog.id}>
        <strong>{blog.title}</strong>
        &nbsp;-&nbsp;
        <Link href={`/blog/${blog.id}`}>Blog details</Link>
      </p>
    ))
    return results
  }

  return (
    <Layout title="Search Results" description="Search results page.">
      <main>
        <section>
          <h1>
            <span style={{ fontSize: '46px' }}>Search Results for</span> <br />
            {router.query.term}
          </h1>
          <hr />
          <br />
          {result()}
        </section>
      </main>
    </Layout>
  )
}

export default searchResults
