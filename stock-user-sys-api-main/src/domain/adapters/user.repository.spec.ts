import { TestScheduler } from 'rxjs/testing';
import { Repository } from 'typeorm';
import {UserRepository} from '../adapters/user.repository'
import { UserDetail } from '../entities/userdetail.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import {UserDetailModel} from '../models/user.model'
jest.mock('../adapters/user.repository')

const userArray = [
    new UserDetailModel('User17', 'chrome', '10.102.20.45', 123, 'login', new Date()),
    new UserDetailModel('User18', 'edge', '10.102.20.33', 122, 'login', new Date())
]

const loginUserService={
    userId: "User17",
    browser: "chrome",
    machineId: "10.102.20.45",
    shopId: 123,
    userLogin: "login",
    loginDate: new Date(),
};

describe('User Repository', ()=> {
    let repository;
    let repo: Repository<UserDetail>;

    beforeEach(async () => {
        const module= await Test.createTestingModule({
            providers: [ UserRepository,
            {
                provide: getRepositoryToken(UserDetail),
                useValue: {
                    save: jest.fn().mockResolvedValue(loginUserService),
                    find: jest.fn().mockResolvedValue(userArray),
                    delete: jest.fn().mockResolvedValue(loginUserService)
                },
            },
        ],
        }).compile();

        repository = module.get<UserRepository>(UserRepository);
        repo = module.get<Repository<UserDetail>>(getRepositoryToken(UserDetail));
    });

    it('should be defined', () => {
        expect(repository).toBeDefined();
    });
    describe('createUserInfo', () => {
        it('create user info ', async () => {

            jest.spyOn(repo, 'save');
            repository.createUserInfo.mockResolvedValue(loginUserService)
            const user = await repository.createUserInfo(loginUserService)
            expect(user).toEqual(loginUserService);

        });
    });

    describe('getUserInfo', () => {
        it('get user info ', async () => {

            jest.spyOn(repo, 'find');
            repository.getUserInfo.mockResolvedValue(userArray)
            const user = await repository.getUserInfo()
            expect(user).toEqual(userArray);

        });
    });

    describe('delUserInfo', () => {
        it('del user info ', async () => {

            jest.spyOn(repo, 'delete');
            repository.delUserInfo.mockResolvedValue(loginUserService)
            const user = await repository.delUserInfo(loginUserService)
            expect(user).toEqual(loginUserService);

        });
    });
});

