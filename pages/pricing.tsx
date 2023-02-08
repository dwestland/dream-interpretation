import React from 'react'
import Image from 'next/image'
import Layout from '@/components/Layout'
import styles from '@/styles/Pricing.module.scss'
import { checkout } from '../src/common/checkout'

const PricingPage = () => (
  <Layout title="Document" description="Document description">
    <main>
      <section>
        <h1>Start your journey today</h1>
        <h3>Pricing for dream analysis</h3>
        <div className={`${styles.pricingCardContainer} pricingCard-container`}>
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
                  checkout({
                    lineItems: [
                      {
                        price: process.env.NEXT_PUBLIC_DREAMER_PRODUCT_PRICE,
                        quantity: 1,
                      },
                    ],
                  })
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
                  checkout({
                    lineItems: [
                      {
                        price: process.env.NEXT_PUBLIC_ADVANCED_PRODUCT_PRICE,
                        quantity: 1,
                      },
                    ],
                  })
                }}
                className={`${styles.button} primary-button`}
              >
                Buy Now
              </button>
            </footer>
          </div>
        </div>

        <p>
          Looking to unlock the secrets hidden within your subconscious mind?
          Our dream analysis packages offer you the chance to explore your
          dreams like never before, revealing hidden insights and personal
          growth opportunities.
        </p>
        <p>
          <strong>Starter Package: 3 Free Dreams</strong>
          <br />
          Get started with a taste of what our dream analysis has to offer.
          Analyze up to 3 of your dreams for free, and see how our unique
          approach to dream analysis can help you uncover new insights and
          perspectives.
        </p>
        <p>
          <strong>Dreamer Package: 15 Dreams for $7.95</strong>
          <br />
          Take your dream analysis to the next level with the Dreamer package.
          Get in-depth analysis of up to 15 of your dreams, and discover hidden
          meaning, personal growth opportunities, and unlock your subconscious
          mind.
        </p>
        <p>
          <strong>Advanced Dreamer Package: 60 Dreams for $19.95</strong>
          <br />
          Ready to dive deep into your dreams and unlock your full potential?
          Our Advanced Dreamer package provides comprehensive analysis of up to
          60 of your dreams, helping you to unlock the mysteries of your
          subconscious and achieve personal growth like never before.
        </p>
        <p> Invest in yourself and unlock the secrets of your dreams today!</p>
        <p></p>
        <p>
          * On the 1st of ever month, if you have no dreams, you will be given a
          free dream each month for life.
        </p>
      </section>
    </main>
  </Layout>
)

export default PricingPage
