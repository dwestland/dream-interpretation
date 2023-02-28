import React, { useState } from 'react'
import Image from 'next/image'
import Layout from '@/components/Layout'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import styles from '@/styles/Pricing.module.scss'

const PricingPage = () => {
  const { data: session, status } = useSession()
  const [error, setError] = useState(null)
  const router = useRouter()
  const dreamer = {
    name: 'Dreamer',
    price: 'price_1MQIktIxBGmFOs7KcjHgsJ8P',
  }
  const advanced = {
    name: 'Advanced',
    price: 'price_1MQIk1IxBGmFOs7KVdgrzF7b',
  }
  const userEmail = session?.user?.email
  // @ts-ignore
  const user = session.userId

  async function handleCheckout(product: Object) {
    setError(null)

    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user,
        userEmail,
        product,
      }),
    })

    const res = await response.json()

    if (res.url) {
      const url = res.url

      router.push(url)
    }
    if (res.error) {
      setError(res.error)
    }
  }

  const prettyObject = JSON.stringify(session, null, 2)
  return (
    <Layout title="Document" description="Document description">
      <main>
        <section>
          <pre>
            <code>{prettyObject}</code>
          </pre>
          <h2 className={styles.tagLine}>Start your journey today</h2>
          <h1 className={styles.heading}>Pricing for dream analysis</h1>
          <div
            className={`${styles.pricingCardContainer} pricingCard-container`}
          >
            <div className={styles.pricingCard}>
              <main className={styles.main}>
                <h3 className={styles.price}>FREE</h3>
                <h4>Starter</h4>
                <p>5 Free Dreams</p>
                <p>1 Free Dream each month for life*</p>
              </main>
              <footer className={styles.footer}>
                <button className={`${styles.button} primary-button`}>
                  Get Started
                </button>
              </footer>
            </div>
            <div className={styles.pricingCard}>
              <main className={styles.main}>
                <h3 className={styles.price}>$7.95</h3>
                <h4>Dreamer</h4>
                <p>15 Dreams</p>
              </main>
              <footer className={styles.footer}>
                <button
                  onClick={() => {
                    handleCheckout(dreamer)
                  }}
                  className={`${styles.button} primary-button`}
                >
                  Buy Now
                </button>
              </footer>
            </div>
            <div className={styles.pricingCard}>
              <main className={styles.main}>
                <h3 className={styles.price}>$19.95</h3>
                <h4>Advanced</h4>
                <p>60 Dreams</p>
                <p>35% Savings</p>
              </main>
              <footer className={styles.footer}>
                <button
                  onClick={() => {
                    handleCheckout(advanced)
                  }}
                  className={`${styles.button} primary-button`}
                >
                  Buy Now
                </button>
              </footer>
            </div>
          </div>

          <p className={styles.paragraph}>
            Looking to unlock the secrets hidden within your subconscious mind?
            Our dream analysis packages offer you the chance to explore your
            dreams like never before, revealing hidden insights and personal
            growth opportunities.
          </p>
          <p className={styles.paragraph}>
            <strong>Starter Package: 3 Free Dreams</strong>
            <br />
            Get started with a taste of what our dream analysis has to offer.
            Analyze up to 3 of your dreams for free, and see how our unique
            approach to dream analysis can help you uncover new insights and
            perspectives.
          </p>
          <p className={styles.paragraph}>
            <strong>Dreamer Package: 15 Dreams for $7.95</strong>
            <br />
            Take your dream analysis to the next level with the Dreamer package.
            Get in-depth analysis of up to 15 of your dreams, and discover
            hidden meaning, personal growth opportunities, and unlock your
            subconscious mind.
          </p>
          <p className={styles.paragraph}>
            <strong>Advanced Dreamer Package: 60 Dreams for $19.95</strong>
            <br />
            Ready to dive deep into your dreams and unlock your full potential?
            Our Advanced Dreamer package provides comprehensive analysis of up
            to 60 of your dreams, helping you to unlock the mysteries of your
            subconscious and achieve personal growth like never before.
          </p>
          <p className={styles.paragraph}>
            Invest in yourself and unlock the secrets of your dreams today!
          </p>
          <p className={styles.paragraph}></p>
          <p className={styles.paragraph}>
            * On the 1st of ever month, if you have no dreams, you will be given
            a free dream each month for life.
          </p>
        </section>
      </main>
    </Layout>
  )
}

export default PricingPage
