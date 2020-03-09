import UserService from './../services/userService';

class Users {
    usersList = async (req, res, next) => {
        const userData = await UserService.AllUsers();
        res.status(200).json(userData);
    }
    // usersListSocket = async (packet, next) => {
    //     const userData = await userList.findAll();
    //     if (packet.doge === true) return next();
    //     next(new Error('Not a doge error'));
    //     return await UserService.AllUsers();
    // }
}

export default new Users();