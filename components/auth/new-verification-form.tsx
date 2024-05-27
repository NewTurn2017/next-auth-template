'use client'

import { BeatLoader } from 'react-spinners'
import { useSearchParams } from 'next/navigation'
import { CardWrapper } from './card-wrapper'
import { useCallback, useEffect, useState } from 'react'
import { newVerification } from '@/actions/new-verification'
import { FormSuccess } from '../form-success'
import { FormError } from '../form-error'

export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>(undefined)
  const [success, setSuccess] = useState<string | undefined>(undefined)
  const searchParams = useSearchParams()

  const token = searchParams.get('token')

  const onSubmit = useCallback(() => {
    if (success || error) return

    if (!token) {
      setError('유효하지 않은 토큰입니다.')
      return
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data.success)
        setError(data.error)
      })
      .catch(() => {
        setError('알 수 없는 에러가 발생했습니다.')
      })
  }, [token, success, error])

  useEffect(() => {
    onSubmit()
  }, [onSubmit])
  return (
    <CardWrapper
      headerLabel='인증을 확인중입니다.'
      backButtonLabel='로그인으로 돌아가기'
      backButtonHref='/auth/login'
    >
      <div className='flex items-center w-full justify-center'>
        {!success && !error && <BeatLoader />}
        <FormSuccess message={success} />
        {!success && <FormError message={error} />}
      </div>
    </CardWrapper>
  )
}
