import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

/*UserInfo Entity creates user_info table in database*/
@Entity({
    name: 'user_details'
})
export class UserDetail {
    constructor() {
        console.log('User Login entity created')
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
        type: 'integer',
    })
    shopId: number;

    @Column({
        name: 'user_login',
        type: 'character varying',
    })
    userLogin: string;

    @Column({
        name: 'login_date',
        type: 'timestamp without time zone',
    })
    loginDate: Date;

}