import { LoginButton } from '@/components/auth/login-button'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Noto_Sans_KR } from 'next/font/google'

const notoSansKr = Noto_Sans_KR({
  weight: ['500'],
  subsets: ['latin'],
})

export default function Home() {
  return (
    <main className='flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800'>
      <div className='space-y-6 text-center'>
        <h1
          className={cn(
            notoSansKr.className,
            'text-6xl font-semibold text-white drop-shadow-md'
          )}
        >
          🔐 로그인
        </h1>
        <p className='text-white text-lg'>(주)지브이코리아</p>
        <div>
          <LoginButton asChild>
            <Button variant='secondary' size='lg'>
              로그인
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  )
}
