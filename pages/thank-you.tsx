import Head from 'next/head'
import Link from 'next/link'
import Stripe from 'stripe'

export default function ThankYou({ session }) {
  return (
    <div>
      <Head>
        <title>Thank You</title>
        <meta name="description" content="Thank you page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {session ? (
          <>
            <div>
              <Link href="/">Home</Link>
              <h1>Thank you!</h1>
              <pre>
                <code>{JSON.stringify(session, null, 2)}</code>
              </pre>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </main>
    </div>
  )
}

export async function getServerSideProps(context) {
  const apiKey = String(process.env.STRIPE_SECRET_KEY)
  const stripe = new Stripe(apiKey, {
    apiVersion: '2022-11-15',
  })
  const { id } = context.query
  const session = await stripe.checkout.sessions.retrieve(id as string)

  return {
    props: {
      session,
    },
  }
}
