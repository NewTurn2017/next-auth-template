import * as z from 'zod'

export const NewPasswordSchema = z.object({
  password: z.string().min(6, { message: '6자 이상 입력해주세요' }),
})

export const LoginSchema = z.object({
  email: z.string().email({ message: '이메일을 입력해주세요' }),
  password: z.string().min(1, { message: '비밀번호를 입력해주세요' }),
})
export const ResetSchema = z.object({
  email: z.string().email({ message: '이메일을 입력해주세요' }),
})

export const RegisterSchema = z.object({
  email: z.string().email({ message: '이메일을 입력해주세요' }),
  password: z.string().min(6, { message: '6자 이상 입력해주세요' }),
  name: z.string().min(1, { message: '이름을 입력해주세요' }),
})
