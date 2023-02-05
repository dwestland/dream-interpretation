import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import styles from '@/styles/SignInSignOut.module.scss'

const SignInSignOut = () => {
  const { data: session, status } = useSession()
  const loading = status === 'loading'

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className={styles.wrapper}>
      {session && (
        <div>
          Hello {session.user.name ?? session.user.email} &nbsp;
          <button
            type="button"
            className="button-as-link"
            onClick={() => signOut()}
          >
            Sign out
          </button>
        </div>
      )}
      {!session && (
        <div>
          <button
            type="button"
            className="button-as-link"
            onClick={() => signIn()}
          >
            Sign in / Sign up
          </button>
        </div>
      )}
    </div>
  )
}
export default SignInSignOut
