import bcrypt from 'bcrypt';
import { userList, sequelize } from './../models';
const { Op } = sequelize;

class userService {
    AllUsers = async (payload) => {
        const userData = await userList.findAll({
            attributes: {
                // include: [],  //外來鍵欄位
                exclude: ['password']  //不顯示欄位
            }
        });
        // const userData = await userList.findOne({
        //     where: { id: 1 },  // where 條件
        //     attributes: ['id']  //指定回傳欄位
        // });

        if (userData === null) {
            return '查無資料';
        }

        return userData;
    }
    findUser = async (payload = {}) => {
        const userData = await userList.findAll({
            where: payload, // where 條件
            attributes: {
                // include: [],  //外來鍵欄位
                exclude: ['password']  //不顯示欄位
            }
        });

        if ((userData || []).length === 0) {
            return '查無資料';
        }

        return userData;
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
                password:await bcrypt.hash( password, bcrypt.genSaltSync(8))
            }
        }).spread((data,created) => created);
    }
}

export default new userService();;