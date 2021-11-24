import { UserDetail } from "src/domain/entities/userdetail.entity"
import { UserDetailModel } from "src/domain/models/user.model"
import { Optional } from "typescript-optional"

export class UserMapper {
    static toDomain(repoEntity: UserDetail): Optional<UserDetailModel> {
        if (!repoEntity) {
            return Optional.empty<UserDetailModel>()
        }

        console.log("shopid", repoEntity)

        const userModel: UserDetailModel = new UserDetailModel(
            repoEntity.userId,
            repoEntity.browser,
            repoEntity.machineId,
            repoEntity.shopId,
            repoEntity.userLogin,
            repoEntity.loginDate
        )
    console.log("shopid", userModel)
        return Optional.of(userModel)
    }
    static toDomains(repoEntities: UserDetail[]): UserDetailModel[] {
        const userModels = new Array<UserDetailModel>()
        repoEntities.forEach(
            re => {
                const userModel = this.toDomain(re)
                userModels.push(userModel.get())
            }
        )
        return userModels;
    }
}