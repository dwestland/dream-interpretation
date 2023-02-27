import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Stripe from 'stripe'
import queryKeys from '@/common/constants/queryKeys'
import { stripe } from '@/common/stripe'

export default function ThankYou() {
  const router = useRouter()
  const [session, setSession] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const { id } = router.query as { id: string }
      console.log('%c id ', 'background: red; color: white', id)
      const sessionData = await stripe.checkout.sessions.retrieve(id)
      setSession(sessionData)
    }
    fetchData()
  }, [router.query])

  return (
    <div>
      <Head>
        <title>Thank You</title>
        <meta name="description" content="TomDoesTech" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-2xl p-4 m-auto flex">
        {session ? (
          <>
            <div className="flex-1 p-4">
              <pre>
                <code>{JSON.stringify(session, null, 2)}</code>
              </pre>
              <h1 className="text-3xl font-bold">Thank you!</h1>
              <p>Your donation has been received.</p>
            </div>
            <Link href="/">Home</Link>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </main>
    </div>
  )
}

// import { useEffect, useState } from 'react'
// import Head from 'next/head'
// import { useRouter } from 'next/router'
// import Link from 'next/link'
// import Stripe from 'stripe'

// export default async function ThankYou() {
//   const router = useRouter()

//   const { id } = router.query as { id: string }

//   const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
//     apiVersion: '2022-11-15',
//   })

//   const session = await stripe.checkout.sessions.retrieve(id)
//   // const session = await stripe.checkout.session.retrieve(id)

//   const prettyObject = JSON.stringify(session, null, 2)

//   console.log('%c id ', 'background: red; color: white', id)

//   return (
//     <div>
//       <Head>
//         <title>Thank You</title>
//         <meta name="description" content="TomDoesTech" />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       <main className="max-w-2xl p-4 m-auto flex">
//         <div className="flex-1 p-4">
//           <pre>
//             <code>{prettyObject}</code>
//           </pre>
//           <h1 className="text-3xl font-bold">Thank you!</h1>
//           <p>Your donation has been received.</p>
//         </div>
//         <Link href="/">Home</Link>
//       </main>
//     </div>
//   )
// }
