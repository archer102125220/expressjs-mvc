import Express from 'express';
import Users from './../controllers/users';
import uploader from './../middlewares/uploader';

class usersRouter extends Express.Router {
  constructor(props) {
    super(props);
    this.get('/', Users.usersList);
    this.post('/registered',uploader.avater(), Users.createUser);
    this.post('/img_upload_test',uploader.avater(), Users.imgUploadTest);
    this.post('/video_upload_test',uploader.video(), Users.imgUploadTest);
    this.get('/account/:name', Users.findUser);
    this.get('/login', Users.loginUser);
  }

}

export default new usersRouter();
