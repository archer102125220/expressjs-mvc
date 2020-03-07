import { userList } from './../models';
class Users {
    usersList = async (req, res, next) => {
        const userData = await userList.findAll();
        res.status(200).json(userData);
    }
}

export default new Users();