
import { usersModel } from "../models/users.model.js";
import BasicManager from "./basicManager.js";

class UsersManager extends BasicManager {
    constructor(){
        super(usersModel)
    }

    async findByEmail(email) {
        const response = await usersModel.findOne({email});
        return response;
    }
}

export const usersManagerMongoDB = new UsersManager();
