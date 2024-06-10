import 'dotenv/config'
import * as config from 'env-var';

export const envs = {
    PORT: config.get('PORT').required().asPortNumber(),
    USER_DB: config.get('USER_DB').required().asString(),
    PASSWORD_DB: config.get('PASSWORD_DB').required().asString(),
    PORT_DB: config.get('PORT_DB').required().asPortNumber(),
    NAME_DB: config.get('NAME_DB').required().asString(),
    HOST_DB: config.get('HOST_DB').required().asString(),
    SECRET_KEY_TOKEN : config.get('SECRET_KEY_TOKEN').required().asString()
}