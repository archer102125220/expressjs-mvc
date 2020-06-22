import crypto from 'crypto';
import { userList, sequelize } from './../models';
const { Op } = sequelize;

class userService {
    AllUsers = async (payload = -1) => {
        return await userList.findAll({
            where: {
                [Op.not]:[
                    { id:{ [Op.eq]:payload } },
                ]
            },
            attributes: {
                // include: [],  //外來鍵欄位
                exclude: ['password']  //不顯示欄位
            }
        });
        // const userData = await userList.findOne({
        //     where: { id: 1 },  // where 條件
        //     attributes: ['id']  //指定回傳欄位
        // });
    }
    findUser = async (payload = {}) => {
        return await userList.findAll({
            where: payload, // where 條件
            attributes: {
                // include: [],  //外來鍵欄位
                exclude: ['password']  //不顯示欄位
            }
        });
    }
    createUser = async (payload = {}) => {
        const { account, password, email, avater } = payload;
        return await userList.findOrCreate({
            where: { 
                [Op.or]:[
                    { account:{ [Op.eq]:account } },
                    { email:{ [Op.eq]:email } }
                ]
            }, 
            defaults:{ 
                account,
                email,
                avater: avater ? (process.env.AVATER_DIR || '/images/upload/') + avater : '/images/damage.png',
                password: crypto.createHash('sha1').update(password).digest('hex')
            }
        }).spread((data,created) => created);
    }
}

export default new userService();;