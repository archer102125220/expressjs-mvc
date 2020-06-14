import crypto from 'crypto';
import { userList, sequelize } from './../models';
const { Op } = sequelize;
const sha = crypto.createHash('sha1');

class userService {
    AllUsers = async () => {
        return await userList.findAll({
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
        const { account, password, email } = payload;
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
                password:sha.update(password).digest('hex')
            }
        }).spread((data,created) => created);
    }
}

export default new userService();;