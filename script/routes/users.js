import Express from 'express';
import Users from './../controllers/users';
import uploader from './../middlewares/uploader';

class router extends Express.Router {
  constructor(props) {
    super(props);
    //this.use(uploader.avater());
    this.get('/', Users.usersList);
    this.post('/registered', Users.createUser);
    this.post('/img_upload_test',uploader.avater(), Users.imgUploadTest);
    this.post('/video_upload_test',uploader.video(), Users.imgUploadTest);
    this.get('/account/:name', Users.findUser);
    this.get('/login', Users.loginUser);
  }

}

export default new router();
