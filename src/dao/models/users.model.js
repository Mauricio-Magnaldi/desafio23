import { Schema, model } from "mongoose";

const usersSchema = new Schema({
    first_name: { 
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    from_github: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        enum: ["admin", "premium", "free"],
        default: "free",
    },
    documents: [{
        name: {
          type: String,
          ref: "Products",
    },
        ref: {
            type: String,
        },
    }],
    last_connection: {
        type: String,
    }
},
{
    timestamps: true
}
);

export const usersModel = model("Users", usersSchema);
