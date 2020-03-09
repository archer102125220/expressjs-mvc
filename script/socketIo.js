import socketIO from 'socket.io';
import { testEvent } from './controllers/socket';
import Users from './controllers/users';

class SocketIo extends socketIO {
    io = {}

    init = (server) => {
        this.io = this.listen(server);
        this.io.on('connection', this.onConnection);
    }

    emiter = [
        { name: 'testEvent', event: testEvent.testEvent },
    ]

    onConnection = (socket) => {
        console.log('a user connected');

        this.emiter.forEach(async element => {
            this.io.emit(element.name, await element.event());
        });

        socket.on('disconnect', this.onDisconnect);
    }

    onDisconnect = () => {
        console.log('a user go out');
    }
}

export default new SocketIo();

