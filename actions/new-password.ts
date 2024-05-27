'use server'

import * as z from 'zod'
import { NewPasswordSchema } from '@/schemas'
import { getPasswordResetTokenByToken } from '@/data/password-reset-token'
import { getUserByEmail } from '@/data/user'
import bycrypt from 'bcryptjs'
import { db } from '@/lib/db'

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null
) => {
  if (!token) {
    return { error: '토큰이 필요합니다.' }
  }

  const validatedFields = NewPasswordSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: '입력이 잘못되었습니다.' }
  }

  const { password } = validatedFields.data

  const existingToken = await getPasswordResetTokenByToken(token)

  if (!existingToken) {
    return { error: '토큰이 잘못되었습니다.' }
  }

  const hasExpired = new Date(existingToken.expires) < new Date()

  if (hasExpired) {
    return { error: '토큰이 만료되었습니다.' }
  }

  const existingUser = await getUserByEmail(existingToken.email)

  if (!existingUser) {
    return { error: '사용자를 찾을 수 없습니다.' }
  }

  const hashedPassword = await bycrypt.hash(password, 10)

  await db.user.update({
    where: { id: existingUser.id },
    data: {
      password: hashedPassword,
    },
  })

  await db.passwordResetToken.delete({
    where: {
      id: existingToken.id,
    },
  })

  return { success: '비밀번호가 변경되었습니다.' }
}
