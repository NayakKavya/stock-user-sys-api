/* UserModel is the format of data accepted from route /add  */
export class UserDetailModel {
    constructor(public userId: string, public browser: string, public machineId: string, public shopId: number,
        public userLogin: string, public loginDate: Date) {
        console.log('user Detailmodel created')
    }
}

/* LoginStatus is the format of data */
export class LoginStatus {
    constructor(public status: string, public response: UserDetailModel) { }
}

