import 'module-alias/register'
import 'reflect-metadata'
import { createConnection } from 'typeorm'
import { User } from '@src/db'
import app from '@src/app'

const port = process.env.PORT || 9080

createConnection({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true,
  entities: [User]
})
  .then(() => {
    // Start the server if we connect to the DB
    app.listen({ port }, () =>
      console.log(`🚀 Server ready at http://localhost:${port}`)
    )
  })
  .catch((error: Error) => {
    // Log and error if can't connect
    console.log('ERROR ', error)
  })
