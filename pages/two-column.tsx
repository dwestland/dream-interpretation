import React from 'react'

import Image from 'next/image'
import Layout from '@/components/Layout'

const TwoColumnPage = () => (
  <Layout title="Document" description="Document description">
    <main className="two-column">
      <section>
        <h1>Two Column Page</h1>
        <h3>Section</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
          obcaecati quam commodi perspiciatis aut sequi, corporis numquam
          reiciendis necessitatibus eligendi deserunt voluptatem iste ea
          delectus magnam. Excepturi, esse suscipit facere dolore deleniti
          temporibus odit inventore, beatae possimus quae placeat quasi
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
          obcaecati quam commodi perspiciatis aut sequi, corporis numquam
          reiciendis necessitatibus eligendi deserunt voluptatem iste ea
          delectus magnam. Excepturi, esse suscipit facere dolore deleniti
          temporibus odit inventore, beatae possimus quae placeat quasi
        </p>
      </section>
      <aside>
        <h3>Aside</h3>
        <Image
          src="/images/grace-hopper.jpg"
          width={600}
          height={400}
          alt="Grace Hopper"
        />
        <br />
        <br />
        <Image src="/images/eniac.jpg" width={600} height={400} alt="ENIAC" />
        <br />
        <br />
        <Image src="/images/ibm.jpg" width={600} height={400} alt="IBM" />
      </aside>
    </main>
  </Layout>
)

export default TwoColumnPage
