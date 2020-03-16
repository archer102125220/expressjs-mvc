// import SocketIo from './../socketIo';
import userService from '../services/userService';

class testEvent {
    testEvent = async (socket, name) => {
        // socket.emit(name, await userService.AllUsers());
        return await userService.AllUsers();
    }
    clickEvent = async (socket, name, payload) => {
        const data = await userService.findUser(payload);
        socket.emit(name, data);
    }
}

export default new testEvent();