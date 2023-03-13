//import Socket from '../socketIo';
//import userService from './../services/userService';
import crypto from 'node:crypto';

class Index {
    homePage = async (req, res, next) => {
        // Socket.io.emit('testEvent', await userService.AllUsers());
        const challenge = new Uint8Array(32);
        crypto.getRandomValues(challenge);
        res.render('index', { title: 'Express', serverData: JSON.stringify({ challenge: challenge.toString() }) });
    }
}

export default new Index();