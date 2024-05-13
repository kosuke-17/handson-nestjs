// https://github.com/TypeStrong/ts-node/issues/1062#issuecomment-1289772979
import { PrismaClient } from '@prisma/client'
import { prompt } from 'enquirer'
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient()

const questions = [
  { type: 'input', name: 'lastName', message: '姓を入力してください' },
  { type: 'input', name: 'firstName', message: '名を入力してください' },
  { type: 'input', name: 'email', message: 'メールアドレスを入力してください' },
  { type: 'input', name: 'password', message: 'パスワードを入力してください' },
]

type Answer = {
  lastName: string
  firstName: string
  email: string
  password: string
}

async function main() {
  const answer: Answer = await prompt(questions)
  const { lastName, firstName, email, password } = answer
  const hash = await bcrypt.hash(password, 10)

  await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      secret: { create: { password: hash } },
    },
  })
  console.log(`ユーザー作成🚀🚀`)
}

main()
  .catch((e) => {
    console.log(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
