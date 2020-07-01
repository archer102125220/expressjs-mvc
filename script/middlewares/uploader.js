import multer from 'multer';
import path from 'path';

//https://github.com/expressjs/multer/blob/master/doc/README-zh-cn.md
//const dest = process.env.UPLOAD_DIR || 'script/public/images/upload';
const { diskStorage, memoryStorage } = multer;
const storage = process.env.BUFFER_IMAGE ? memoryStorage() : diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.env.UPLOAD_DIR || 'script/public/images/upload')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + path.basename(file.originalname, path.extname(file.originalname)) + '-' + Date.now() + path.extname(file.originalname))
    }
});

class uploader extends multer {
    constructor(props){
        super(props);
    }

    array =  () => {
        return this.array('images',10);
    }

    avater = () => {
        return this.single('avater');
    }

}

export default new uploader({ storage });
