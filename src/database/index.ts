import { Pool } from 'pg';
import config from 'config';
import console from 'console';
console.log(config.get('user_db'))
const pool = new Pool({
    user: config.get('user_db'),
    host: config.get('host'),
    database: config.get('database'),
    password: config.get('password'),
    port: 5432,
});
export default {
    async query(text: any, params: any) {
        // invocation timestamp for the query method
        const start = Date.now();
        try {
            const res = await pool.query(text, params);
            // time elapsed since invocation to execution
            const duration = Date.now() - start;
            return res;
        } catch (error) {
            console.log('error in query', {text});
            throw error;
        }
    },
};