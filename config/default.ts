import dotenv from 'dotenv';
dotenv.config();

export default {
    port: process.env.port,
    saltWorkFactor: process.env.saltWorkFactor,
    host: process.env.host,
    user_db: process.env.user_db,
    password: process.env.password,
    database: process.env.database,
}