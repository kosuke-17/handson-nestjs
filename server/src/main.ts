import { INestApplication } from '@nestjs/common'
import { writeFile } from 'fs/promises'
import { createApp, createSwagger } from './createApp'

async function bootstrap() {
  const app: INestApplication = await createApp()
  const document = createSwagger(app)

  await writeFile('./swagger.json', JSON.stringify(document, null, '  '))

  await app.listen(3031)
}
bootstrap()
