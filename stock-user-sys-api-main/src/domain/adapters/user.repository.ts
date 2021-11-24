import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IUserPort } from "src/domain/adapters/user.port";
import { Repository } from "typeorm";
import { UserDetail } from "../entities/userdetail.entity";
import { UserLogoutInfo } from "../entities/user.logout.entity";
import { GetUserInfoModel } from "../models/getuserinfo.model";
import { LoginStatus, UserDetailModel } from "../models/user.model";
import { UserMapper } from "src/infrastructure/mapper/user.mapper";
import { lastValueFrom } from "rxjs";
import { WinstonLoggerService } from "src/infrastructure/logger/winston-logger.service";

/* UserRepository class implements interface IUserPost and this repository interacts with the database */
@Injectable()
export class UserRepository implements IUserPort {
    constructor(@InjectRepository(UserDetail) private UserRepository: Repository<UserDetail>,
    // @InjectRepository(UserLogoutInfo) private UserLogoutRepository: Repository<UserLogoutInfo>,
) {
        console.log('UserRepository created')
    }

     /** This method receives userModel from UserController and save the userModel in database 
     * An object of UserDetailModel is created and returned as response
     */
    async createUserInfo(userModel: UserDetailModel): Promise<UserDetailModel> {
        const users = await this.UserRepository.save(userModel);
        console.log("user inserted",users)
            const um = new UserDetailModel(users.userId, users.browser, users.machineId, users.shopId, users.userLogin, users.loginDate)
           return um;
         
    }

    /** This method in repository receives userID and shopId through getUserInfoModel and checks for user 
     * if user is found returns userModel as response
     */
    async getUserInfo(getUserInfoModel: UserDetailModel):  Promise<UserDetailModel[]>  {
        const users = await this.UserRepository.find({
            where: { userId: getUserInfoModel.userId, shopId: getUserInfoModel.shopId }
        })
        return UserMapper.toDomains(users);
    }


    /** This method in repository receives userId and shopId from UserController
     * and deletes user with same userId and shopId fron user_details table in database
     */
    async delUserInfo(userId,shopId):  Promise<any>  {
         console.log("userId", userId,"shopid",shopId,)
        const users = this.UserRepository.delete({userId: userId, shopId: shopId})
        users.then(value => {console.log(value)})
        return users;
    }

}