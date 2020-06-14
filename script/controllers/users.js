import crypto from 'crypto';
import UserService from './../services/userService';
const sha = crypto.createHash('sha1');

class Users {
    usersList = async (req, res, next) => {
        //const { id, start, end } = req.body; //→接受前端來的資料
        const userData = await UserService.AllUsers();
        if ((userData || []).length === 0) {
            res.status(200).json('查無資料');
        }
        res.status(200).json(userData);
    }

    findUser = async (req, res, next) => {
        const { name:account } = req.params; //→接受URL上的資料(ex:/api/users/account/:name)
        const userData = await UserService.findUser({ account });
        if ((userData || []).length === 0) {
            res.status(200).json('查無資料');
        }
        res.status(200).json(userData);
    }
    
    loginUser = async (req, res, next) => {
        const { account, password } = req.query; //→接受URL上的資料(ex:/api/users/account/:name)
        const userData = await UserService.findUser({
            account,
            password:sha.update(password).digest('hex')
        });
        if ((userData || []).length === 0) {
            res.status(200).json('查無資料');
        }else{
            res.status(200).json(userData);
        }
    }

    createUser = async (req, res, next) => {
        const { body } = req; 
        const clear = await UserService.createUser(body);

        if(clear){
            res.status(200).json('註冊成功！');
        }else{
            res.status(200).json('帳號或信箱已存在！');
        }
    }

    // usersListSocket = async (packet, next) => {
    //     const userData = await userList.findAll();
    //     if (packet.doge === true) return next();
    //     next(new Error('Not a doge error'));
    //     return await UserService.AllUsers();
    // }
}

export default new Users();