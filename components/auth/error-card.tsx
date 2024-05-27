import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { CardWrapper } from './card-wrapper'

export const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel='오류가 발생했습니다.'
      backButtonLabel='로그인으로 돌아가기'
      backButtonHref='/auth/login'
    >
      <div className='w-full flex items-center justify-center'>
        <ExclamationTriangleIcon className='size-6 text-destructive' />
      </div>
    </CardWrapper>
  )
}
