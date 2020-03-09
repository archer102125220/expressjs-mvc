// import SocketIo from './../../socketIo';
import userService from './../../services/userService';

class testEvent {
    testEvent = async (payload) => {
        // SocketIo.io.emit('testEvent', await userService.AllUsers());
        return await userService.AllUsers();
    }
}

export default new testEvent();