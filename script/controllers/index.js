//import Socket from '../socketIo';
//import userService from './../services/userService';
import crypto from 'node:crypto';

class Index {
    homePage = async (req, res, next) => {
        // Socket.io.emit('testEvent', await userService.AllUsers());
        const challenge = new Uint8Array(32);
        crypto.getRandomValues(challenge);
        res.render('index', { title: 'Express', serverData: JSON.stringify({ challenge }) });
    }
    // https://stackoverflow.com/questions/34657222/how-to-use-server-sent-events-in-express-js
    sseTest = (req, res, next) => {
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Connection', 'keep-alive');
        res.flushHeaders(); // flush the headers to establish SSE with client

        let counter = 0;
        let interValID = setInterval(() => {
            counter++;
            if (counter >= 10) {
                clearInterval(interValID);
                res.end(); // terminates SSE session
                return;
            }
            res.write(`data: ${JSON.stringify({ num: counter })}\n\n`); // res.write() instead of res.send()
        }, 1000);

        // If client closes connection, stop sending events
        res.on('close', () => {
            console.log('client dropped me');
            clearInterval(interValID);
            res.end();
        });
    }
}

export default new Index();