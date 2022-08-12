export interface TypedRequestBody<T> extends Express.Request {
    body: T
}
export interface TypeResponse extends Express.Response {
}
export interface IUser {
    username: string
    password: string
    email: string
}

import userModel from "../../modelsMongoose/user"
import userController from "../auth/user"
import bcrypt from "bcrypt"
import e from "express";
import dotenv from 'dotenv';



dotenv.config();
export const _authRegister = async (req: TypedRequestBody<IUser>, res: e.Response) => {
    const username = req.body.username.toLowerCase();
    const user = await userController.getUser(username);
    if (user) res.status(409).send('Tên tài khoản đã tồn tại.');
    else {
        const hashPassword = bcrypt.hashSync(req.body.password, 9);
        const newUser = {
            username: username,
            password: hashPassword,
            email: req.body.email
        };
        const createUser = await userController.createUser(newUser);
        if (!createUser) {
            return res
                .status(400)
                .send('Có lỗi trong quá trình tạo tài khoản, vui lòng thử lại.');
        }
        return res.send({
            username,
        });
    }
};
