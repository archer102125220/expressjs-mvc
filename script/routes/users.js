import Express from 'express';
import Users from './../controllers/users';

class router extends Express.Router {
  constructor(props) {
    super(props);
    this.get('/', Users.usersListing);
  }

}

export default new router();
