export class UserLogoutModel {
    constructor(public userId: string, public browser: string, public machineId: string, public shopId: number,
        public loginDate: Date, public logoutDate: Date) {
        console.log('user logout model created')
    }
}