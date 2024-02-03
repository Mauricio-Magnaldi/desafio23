import { messagesManagerMongoDB } from "../dao/managersMongoDB/messagesManagerMongoDB.js";

async function messagesHandler(io, socket) {

    socket.on("messageSent", async (message) => {
        await messagesManagerMongoDB.createOne(message);
        const messages = await messagesManagerMongoDB.findAll(); 
        io.sockets.emit("newMessages",messages);   
    })

    socket.on("getMessages", async() => {
        const messages = await messagesManagerMongoDB.findAll(); 
        io.sockets.emit("newMessages",messages);
    })
}

export { messagesHandler };