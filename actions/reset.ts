'use server'
import * as z from 'zod'
import { ResetSchema } from '@/schemas'
import { getUserByEmail } from '@/data/user'
import { sendResetPasswordEmail } from '@/lib/mail'
import { generatePasswordResetToken } from '@/lib/tokens'

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: '입력이 잘못되었습니다.' }
  }

  const { email } = validatedFields.data

  const existingUser = await getUserByEmail(email)

  if (!existingUser) {
    return { error: '이메일이 존재하지 않습니다.' }
  }

  const passwordResetToken = await generatePasswordResetToken(
    existingUser.email
  )
  await sendResetPasswordEmail(
    passwordResetToken.email,
    passwordResetToken.token
  )

  return { success: '초기화 이메일을 보냈습니다.' }
}
