import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DatabaseType } from 'typeorm'
import * as dotenv from 'dotenv'
import { UserSettingConstants } from '../constants/user-setting';


dotenv.config()
type envConfigType = {
    [key: string]: string | undefined
}

export class ConfigService {
    private static svc: ConfigService;
    static create() {
        if (!this.svc) {
            this.svc = new ConfigService(process.env)
        }
        return this.svc
    }
    private constructor(private env: envConfigType) {
        console.log('svc created')
    }
    private getValue(key: string, throwOnMissing = true): string {
        // console.log('+++++this.env',this.env)
        const value = process.env[key]
        if (!value && throwOnMissing) {
            throw new Error(`config error - missing env.${key}`)
        }

        return value
    }
    public getTypeOrmConfig(): TypeOrmModuleOptions {
        const dbType = this.getValue(UserSettingConstants.PRODUCTS_DATABASE_TYPE)
        let type1: DatabaseType = 'sqlite';
        switch (dbType) {
            case 'postgres':
                type1 = 'postgres'
                break;
            case 'mysql':
                type1 = 'mysql'
                break;
            //...other possibilities
            default:
                break;
        }

        const options: TypeOrmModuleOptions = {
            type: type1,
            host: this.getValue(UserSettingConstants.PRODUCTS_POSTGRES_HOST),
            port: parseInt(this.getValue(UserSettingConstants.PRODUCTS_POSTGRES_PORT)),
            username: this.getValue(UserSettingConstants.PRODUCTS_POSTGRES_USERNAME),
            password: this.getValue(UserSettingConstants.PRODUCTS_POSTGRES_PASSWORD),
            database: this.getValue(UserSettingConstants.PRODUCTS_POSTGRES_DATABASE),
            entities: [this.getValue(UserSettingConstants.PRODUCTS_ENTITIES_PATH)],
            migrationsTableName: this.getValue(UserSettingConstants.PRODUCTS_MIGRATION_TABLE_NAME),
            migrations: [this.getValue(UserSettingConstants.PRODUCTS_MIGRATIONS_FILE_PATH)],
            schema :"user",
            // synchronize: true,
            cli: {
                migrationsDir: this.getValue(UserSettingConstants.PRODUCTS_MIGRATIONS_DIRECTORY)
            }
        }
        console.log(options)
        return options
    }
    public getPort() {
        return this.getValue('API_GATEWAY_PORT', true)
    }
    public isProduction() {
        const mode = this.getValue('MODE', false)
        return mode != 'DEV'
    }
    public ensureValues(keys: string[]) {
        keys.forEach(k => this.getValue(k, true))
        return this
    }

    public getBaseURl(key: string) {
        return this.getValue(key, true)
    }

    public getLogLevel(): string {
        const level = this.getValue('PRODUCT_LOG_LEVEL', false)
        return level
    }

}
