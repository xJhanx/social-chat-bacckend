import 'dotenv/config'
import * as config from 'env-var';

export const envs = {
    PORT: config.get('PORT').required().asPortNumber(),
}