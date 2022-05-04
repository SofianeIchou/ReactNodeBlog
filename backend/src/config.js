import "dotenv/config"

const config = {
  port: process.env.PORT,
  db: {
    client: process.env.DB_CLIENT,
    connection: {
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
    },
  },
  security: {
    password: {
      saltSize: 32,
      iterations: 100000,
      keylen: 256,
      digest: "sha512",
      expiresIn: "2 hours",
      secret: process.env.JWT_SESSION_SECRET,
    },
  },
}

export default config
