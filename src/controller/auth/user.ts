export interface TypedRequestBody<T> extends Express.Request {
    body: T
    headers: IncomingHttpHeaders
}
import { Schema } from "mongoose"
import { IncomingHttpHeaders } from "node:http2"
export interface IUser {
    avatar?: string
    username: string
    email: string
    password: string
    address?: string
    phone?: string
}
export interface IUserMongoose {
    _id: Schema.Types.ObjectId
    avatar?: string
    username: string
    email: string
    password: string
    address?: string
    phone?: string
}
import UserModel from "../../modelsMongoose/user";
const userController = {
    async getUser(username: string) {
        return await UserModel.findOne({ username: username });
    },
    async createUser(user: IUser) {
        const userNew = new UserModel(user);
        return await userNew.save();
    },
    async updateRefreshToken(user: IUserMongoose, refreshToken: string) {
        await UserModel.updateOne({
            _id: user._id,
        }, {
            $set: {
                ...user,
                refreshToken: refreshToken
            }
        })


    },
}
export default userController;