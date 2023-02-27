import Stripe from 'stripe'

const apiKey = String(process.env.STRIPE_API_KEY)

export const stripe = new Stripe(apiKey, {
  apiVersion: '2022-11-15',
})
