import dotenv from 'dotenv'

dotenv.config()

const { YANDEX_CLIENT_ID: clientID, YANDEX_CLIENT_SECRET: clientSecret } = process.env

export {
    clientID,
    clientSecret,
}

