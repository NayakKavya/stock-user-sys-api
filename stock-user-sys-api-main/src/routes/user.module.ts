import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDetail } from 'src/domain/entities/userdetail.entity';
import { UserRepository } from 'src/domain/adapters/user.repository';
import { UserDatabaseModule } from 'src/infrastructure/database/user-database.module';
import { UserController } from './user.controller';
import { ConfigService } from 'src/infrastructure/configuration/config.service';
import { WinstonLoggerModule } from 'src/infrastructure/logger/winston.logger.module';
import { UserLogoutInfo } from 'src/domain/entities/user.logout.entity';
import { UserLogoutRepository } from 'src/domain/adapters/userlogout.repository';

@Module({
    imports: [
        UserDatabaseModule,
        WinstonLoggerModule.forRoot({ level: ConfigService.create().getLogLevel() }),
        TypeOrmModule.forFeature([UserDetail,UserLogoutInfo])
    ],
    controllers: [UserController],
    providers: [UserRepository,UserLogoutRepository],
})
export class UserModule {
    constructor() {
        console.log('UserModule created')
    }
};