import { userList, sequelize } from './../models';

class userService {
    AllUsers = async (req, res, next) => {
        const userData = await userList.findAll({
            attributes: {
                // include: [],
                exclude: ['password']//不顯示欄位
            }
        });
        // const userData = await userList.findOne({
        //     where: { id: 1 }, // where 條件
        //     attributes: ['id']  //指定回傳欄位
        // });x

        if (userData === null) {
            console.log('1');
            return '查無資料';
        }

        return userData;
    }
}

export default new userService();;