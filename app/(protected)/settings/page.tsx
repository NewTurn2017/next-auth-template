import { auth, signOut } from '@/auth'
import { redirect } from 'next/navigation'

const SettingsPage = async () => {
  const session = await auth()

  return (
    <div>
      {JSON.stringify(session)}
      <form
        action={async () => {
          'use server'
          await signOut()
        }}
      >
        <button type='submit'>로그아웃</button>
      </form>
    </div>
  )
}

export default SettingsPage
