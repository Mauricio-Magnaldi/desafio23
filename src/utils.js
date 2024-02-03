import { dirname } from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = "jwt-secret";

export const __dirname = dirname(fileURLToPath(import.meta.url));

export const hashData = async (data) => {
    const hash = await bcrypt.hash(data, 10);
    return hash;
}

export const compareData = async (data, hashData) => {
    return bcrypt.compare(data, hashData);
}

export const generateToken = (user) => {
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: 3000});
    return token;
}