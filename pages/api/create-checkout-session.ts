import type { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const user: string = req.body.user
  const userEmail: string = req.body.userEmail
  const price: string = req.body.product.price

  try {
    const session = await stripe.checkout.sessions.create({
      // Add metadata to the session so we can use it in the webhook
      metadata: {
        user,
        userEmail,
        price,
      },
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: userEmail,
      line_items: [
        {
          price,
          quantity: 1,
        },
      ],
      success_url: `${req.headers.origin}/thank-you?id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/cancel`,
    })

    const url = session.url

    if (url) {
      return res.status(200).send({ url })
    }

    return res.status(500).json({ message: 'Something went wrong' })
  } catch (e) {
    console.error('Error creating session ' + e)
    return res.status(500).json({ message: 'Something went wrong' })
  }
}
