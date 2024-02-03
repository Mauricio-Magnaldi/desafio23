import { messagesModel } from "../models/messages.model.js";
import BasicManager from "./basicManager.js";

class MessagesManager extends BasicManager {
    constructor(){
        super(messagesModel)
    }
}

export const messagesManagerMongoDB = new MessagesManager();