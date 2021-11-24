import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from "@nestjs/common";
import { UserRepository } from "src/domain/adapters/user.repository";
import { UserLogoutRepository } from "src/domain/adapters/userlogout.repository";

import { UserLogoutModel } from "src/domain/models/user.logout.model";
import { UserDetailModel } from "src/domain/models/user.model";
import { WinstonLoggerService } from "src/infrastructure/logger/winston-logger.service";

/* UserController accepts request from user-bus-api and then returns response */
@Controller()
export class UserController {
    constructor(
        private userRepository: UserRepository,
        private userLogoutRepository: UserLogoutRepository,
        private logger: WinstonLoggerService,) {
        this.logger.setContext(UserController.name);
        console.log('users service controller created')
    }

       /* createUserInfo method accepts usermodel and pass it to user repository */
    
    @Post('/save')
    createUserInfo(@Body() userModel: UserDetailModel) {
        this.logger.info('in createUserInfo info #UserModel  ${userModel}');
        this.logger.error('in createUserInfo error', { key: 'value' });
        this.logger.debug('in createUserInfo debug', { key: 'value' });
        this.logger.warn('in createUserInfo warn');
        console.log('user service controller createUserInfo method')
        const res = this.userRepository.createUserInfo(userModel)
        console.log('res', res)
        return res;
    }

    @Delete('/delUserInfo/:userId/:shopNo')
    detUserInfoModel(@Param('userId') userId : string,@Param('shopNo') shopNo: number) {
        this.logger.info('in deleteUserInfoModel info #UserId #ShopNo ${getUserModel}');
        this.logger.error('in deleteUserInfoModel error', { key: 'value' });
        this.logger.debug('in deleteUserInfoModel debug', { key: 'value' });
        this.logger.warn('in deleteUserInfoModel warn');
        console.log('user service controller detUserInfoModel method')
        return this.userRepository.delUserInfo(userId,shopNo)
    }

   
    @Post('/getUserInfo')
    GetUserInfoModel(@Body() userModel: UserDetailModel) {
        this.logger.info('in getUserByUserId info #UserId #ShopId ${getUserModel}');
        this.logger.error('in getUserByUserId error', { key: 'value' });
        this.logger.debug('in getUserByUserId debug', { key: 'value' });
        this.logger.warn('in getUserByUserId warn');
        console.log('user service controller updateUserInfo method')
        return this.userRepository.getUserInfo(userModel)
    }

    @Post('/logout')
    createUserLogoutInfo(@Body() userLogoutModel: UserLogoutModel){
        this.logger.info('in createUserLogoutInfo info #UserModel  ${userModel}');
        this.logger.error('in createUserLogoutInfo error', { key: 'value' });
        this.logger.debug('in createUserLogoutInfo debug', { key: 'value' });
        this.logger.warn('in createUserLogoutInfo warn');
        console.log('#####', userLogoutModel)
        const ret= this.userLogoutRepository.createUserLogoutInfo(userLogoutModel)
        console.log('RET;;;;;;;', ret)
        return ret
    }

    
}