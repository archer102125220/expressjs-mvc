import multer from 'multer';
//({ dset:'./../public/images/avater' })
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

export default new uploader({ dset:'./../public/images/upload' });
