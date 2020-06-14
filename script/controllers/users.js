import UserService from './../services/userService';

class Users {
    usersList = async (req, res, next) => {
        //const { id, start, end } = req.body; //→接受前端來的資料
        const userData = await UserService.AllUsers();

        res.status(200).json(userData);
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