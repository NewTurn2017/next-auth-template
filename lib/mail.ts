import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`

  await resend.emails.send({
    from: 'GV MAS <no-reply@gv-korea.com>',
    to: email,
    subject: '이메일 인증',
    html: `<p>이메일 인증을 완료하려면 <a href="${confirmLink}">여기</a>를 클릭하세요.</p>`,
  })
}

export const sendResetPasswordEmail = async (email: string, token: string) => {
  const resetLink = `http://localhost:3000/auth/new-password?token=${token}`

  await resend.emails.send({
    from: 'GV MAS <no-reply@gv-korea.com>',
    to: email,
    subject: '비밀번호 재설정',
    html: `<p>비밀번호 재설정을 완료하려면 <a href="${resetLink}">여기</a>를 클릭하세요.</p>`,
  })
}
