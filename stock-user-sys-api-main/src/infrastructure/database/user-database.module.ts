import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from 'src/infrastructure/configuration/config.service';
import { UserSettingConstants } from 'src/infrastructure/constants/user-setting';

@Module({
    imports: [
        TypeOrmModule.forRoot(
            ConfigService
                .create()
                .ensureValues(
                    [
                        UserSettingConstants.PRODUCTS_POSTGRES_HOST,
                        UserSettingConstants.PRODUCTS_POSTGRES_PORT,
                        UserSettingConstants.PRODUCTS_POSTGRES_USERNAME,
                        UserSettingConstants.PRODUCTS_POSTGRES_PASSWORD,
                        UserSettingConstants.PRODUCTS_POSTGRES_DATABASE,
                        UserSettingConstants.PRODUCTS_ENTITIES_PATH,
                        UserSettingConstants.PRODUCTS_MIGRATION_TABLE_NAME,
                        UserSettingConstants.PRODUCTS_MIGRATIONS_FILE_PATH,
                        UserSettingConstants.PRODUCTS_MIGRATIONS_DIRECTORY
                    ]
                )
                .getTypeOrmConfig(),

        )]
})
export class UserDatabaseModule { };