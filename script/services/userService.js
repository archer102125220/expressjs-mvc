import { userList, sequelize } from './../models';

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
}

export default new userService();;