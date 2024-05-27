import { cn } from '@/lib/utils'
import { Noto_Sans_KR } from 'next/font/google'

const notoSansKr = Noto_Sans_KR({
  weight: ['500'],
  subsets: ['latin'],
})

interface HeaderProps {
  label: string
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className='w-full flex flex-col gap-y-4 items-center justify-center'>
      <h1 className={cn(notoSansKr.className, 'text-3xl font-semibold')}>
        🔐 로그인
      </h1>
      <p className='text-muted-foreground text-sm'>{label}</p>
    </div>
  )
}
