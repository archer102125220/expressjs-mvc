import { userList } from './../models';
class Users {
    usersListing = (req, res, next) => {
        res.send('respond with a resource');
    }
}

export default new Users();