import { Test } from "@nestjs/testing";
import { getRepositoryToken, TypeOrmModule } from "@nestjs/typeorm";
import { UserDatabaseModule } from "../../infrastructure/database/user-database.module";
import { UserController } from "../../routes/user.controller";
import { Repository } from "typeorm";
import { UserLogoutInfo } from "../entities/user.logout.entity";
import { UserDetail } from "../entities/userdetail.entity";
import { UserRepository } from "../adapters/user.repository";
import { UserLogoutRepository } from "../adapters/userlogout.repository";
import { WinstonLoggerModule } from "../../infrastructure/logger/winston.logger.module";
import { ConfigService } from "../../infrastructure/configuration/config.service";
jest.mock('../adapters/userlogout.repository')

const logoutUserService={
    userId: "User17",
    browser: "chrome",
    machineId: "10.102.20.45",
    shopId: 123,
    loginDate: "2021-11-23 10:02:25.183",
    logoutDate: '2021-11-23 10:30:46.589',
};

describe('User Logout Repository', ()=> {
    let userLogoutRepository;
    let repo: Repository<UserLogoutInfo>;

    beforeEach(async () => {
        const module= await Test.createTestingModule({
            imports: [
                //  UserDatabaseModule,
            //     WinstonLoggerModule.forRoot({ level: ConfigService.create().getLogLevel() }),
            //     // TypeOrmModule.forFeature([UserDetail,UserLogoutInfo])],
            ],
            controllers: [UserController],
            providers: [  UserLogoutRepository, UserRepository, 
            {
                provide: getRepositoryToken(UserLogoutInfo),
                useValue: {
                    save: jest.fn().mockResolvedValue(logoutUserService),
    
                },
            },
        ],
        }).compile();

        userLogoutRepository = module.get<UserLogoutRepository>(UserLogoutRepository);
        repo = module.get<Repository<UserLogoutInfo>>(getRepositoryToken(UserLogoutInfo));
    });

    describe('createUserLogoutInfo', () => {
        it('create user logout info ', async () => {

            jest.spyOn(repo, 'save');
            userLogoutRepository.createUserLogoutInfo.mockResolvedValue(logoutUserService)
            const user = await userLogoutRepository.createUserLogoutInfo(logoutUserService)
            expect(user).toEqual(logoutUserService);

        });
    });


});