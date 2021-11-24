
import { LoginStatus, UserDetailModel } from "src/domain/models/user.model";
import { GetUserInfoModel } from "../models/getuserinfo.model";
import { UserLogoutModel } from "../models/user.logout.model";

/* IUserPort interface method declaration */
export interface IUserPort {

    createUserInfo(userModel: UserDetailModel):Promise<UserDetailModel>;
    getUserInfo(getUserInfo: GetUserInfoModel): Promise<UserDetailModel[]>;
    delUserInfo(userId,shopId):  Promise<UserDetailModel> 
  
}