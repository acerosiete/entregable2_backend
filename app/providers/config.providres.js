require('dotenv').config();

export const defaultConfig = {

    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USERNAME,
    url_digi: process.env.URL_DIGI
}

