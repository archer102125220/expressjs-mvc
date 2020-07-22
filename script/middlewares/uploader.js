import multer from 'multer';
import path from 'path';

//https://github.com/expressjs/multer/blob/master/doc/README-zh-cn.md
//const dest = process.env.UPLOAD_IMG || 'script/public/images/upload';
const { diskStorage, memoryStorage } = multer;

class uploader {
    constructor(props){
        this.imgUploader= new multer({ storage:process.env.BUFFER_IMAGE ? memoryStorage() : diskStorage({
            destination: function (req, file, cb) {
                cb(null, process.env.UPLOAD_IMG || 'script/public/images/upload')
            },
            filename: function (req, file, cb) {
                cb(null, file.fieldname + '-' + path.basename(file.originalname, path.extname(file.originalname)) + '-' + Date.now() + path.extname(file.originalname))
            }
        }) });
        this.videoUploader = new multer({ storage:diskStorage({
            destination: function (req, file, cb) {
                cb(null, process.env.UPLOAD_VIDEO || 'script/public/images/upload')
            },
            filename: function (req, file, cb) {
                cb(null, file.fieldname + '-' + path.basename(file.originalname, path.extname(file.originalname)) + '-' + Date.now() + path.extname(file.originalname))
            }
        }) });
    }

    arrayImg =  () => {
        return this.imgUploader.array('images',10);
    }

    avater = () => {
        return this.imgUploader.single('avater');
    }

    video = () => {
        return this.videoUploader.single('video');
    }

    arrayVideo = () => {
        return this.videoUploader.array('video',10);
    }
}

export default new uploader();
