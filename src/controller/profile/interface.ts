import { Schema } from "mongoose"
import { IUserMongoose } from "../auth/user"

export interface TypedRequestBody<T> extends Express.Request {
    body: T
}
export interface IBodyProfile {
    readonly _idUser: Schema.Types.ObjectId
    readonly title: string
    readonly email: string
    readonly oAuthClientPlatform: IOauthPlatformProfile[]
}
export interface IOauthPlatformProfile {
    platform: string
    infoConnect: string
}

export interface IBodyProfileMongoose extends IBodyProfile {
    readonly _id: Schema.Types.ObjectId
}

export interface IVerifyAuth{
    data: IUserMongoose
}