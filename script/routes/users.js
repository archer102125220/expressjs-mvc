import Express from 'express';
import Users from './../controllers/users';

class router extends Express.Router {
  constructor(props) {
    super(props);
    this.get('/', Users.usersList);
    this.post('/registered', Users.createUser);
  }

}

export default new router();
