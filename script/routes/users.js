import Express from 'express';
import Users from './../controllers/users';

class router extends Express.Router {
  constructor(props) {
    super(props);
    this.get('/', Users.usersList);
    this.post('/registered', Users.createUser);
    this.post('/img_upload_test', Users.imgUploadTest);
    this.get('/account/:name', Users.findUser);
    this.get('/login', Users.loginUser);
  }

}

export default new router();
