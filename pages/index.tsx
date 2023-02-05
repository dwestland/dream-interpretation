import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Layout from '@/components/Layout'
import styles from '@/styles/Home.module.scss'

const HomePage = () => (
  <Layout title="Document" description="Document description">
    <main className={styles.homePage}>
      <section>
        <h1>Interpret Your Dreams for FREE</h1>
        <p className={styles.openingParagraph}>
          Discover the untold stories of your mind with our GPT-3 powered dream
          analyzer. No more asking, "What did my dream mean?" Unveil the secrets
          of your subconscious. Ready for some self-discovery? Unlock Your
          Dreams Now.
        </p>
        <h3>Analyze Your Dreams</h3>
        <div className={styles.buttonWrapper}>
          <Link href="/pricing" className="link-as-button big-button">
            Get Started
          </Link>
        </div>
        <div className={styles.imageWrapper}>
          <Image
            src="/images/sleeping-couple.jpg"
            style={{
              maxWidth: '660px',
              maxHeight: '440px',
            }}
            width={660}
            height={440}
            alt="Sleeping Couple"
          />
        </div>
      </section>
    </main>
  </Layout>
)

export default HomePage
