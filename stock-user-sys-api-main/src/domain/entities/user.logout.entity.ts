import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

/*UserInfo Entity creates user_info table in database*/
@Entity({
    name: 'user_track'
})
export class UserLogoutInfo {
    constructor() {
        console.log('User Logout entity created')
    }
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: 'user_id',
        type: 'character varying',
    })
    userId: string;

    @Column({
        name: 'browser',
        type: 'character varying',
    })
    browser: string;

    @Column({
        name: 'machine_id',
        type: 'character varying',
    })
    machineId: string;

    @Column({
        name: 'shop_id',
        type: 'numeric',
    })
    shopId: number;

    @Column({
        name: 'login_date',
        type: 'timestamp without time zone',
    })
    loginDate: Date;

    @Column({
        name: 'logout_date',
        type: 'timestamp without time zone',
    })
    logoutDate: Date;

}