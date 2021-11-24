/* GetUserInfoModel is used to accept data from business-api*/
export class GetUserInfoModel {
    constructor(public userId: string, public shopId: number) {
        console.log('Get User Info Model Created')
    }
}