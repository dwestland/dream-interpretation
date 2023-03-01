import { NextApiRequest, NextApiResponse } from 'next'
// import { stripe } from '../../lib/stripe'
import Stripe from 'stripe'
import { buffer } from 'micro'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2022-11-15',
})

// Stripe requires the raw body to construct the event.
export const config = {
  api: {
    bodyParser: false,
  },
}

const webhook = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }
  const buf = await buffer(req)
  const sig = req.headers['stripe-signature']!
  let event: Stripe.Event

  console.log('%c buf ', 'background: red; color: white', buf)
  console.log('%c sig ', 'background: red; color: white', sig)
  console.log(
    '%c process.env.STRIPE_WEBHOOK_SECRET ',
    'background: red; color: white',
    process.env.STRIPE_WEBHOOK_SECRET
  )

  try {
    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    // On error, log and return the error message
    console.log(`❌ Error message: ${err.message}`)
    res.status(400).send(`Webhook Error: ${err.message}`)
    return
  }

  switch (event.type) {
    case 'customer.created':
      const customerCreated = event.data.object

      console.log(
        '%c customerCreated ',
        'background: red; color: white',
        customerCreated
      )
      break
    default:
  }

  res.status(200).end()
}

export default webhook
