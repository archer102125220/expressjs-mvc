import userService from './../services/userService';

class testEvent {
    testEvent = async (socket, name) => {
        // return await userService.AllUsers();
        return { testData: 123 };
    }
    clickEvent = async (socket, name, payload) => {
        // const data = await userService.findUser(payload);
        const data = { testData: 456 };
        socket.emit(name, data);
    }
}

export default new testEvent();