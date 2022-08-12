import e from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import userController, { IUser } from './user';

export const authHashToken = async (payload: string | object, secretSignature: any, tokenLife: string | number | undefined) => {
    try {
        const user = { todo: " along" }
        var token = await jwt.sign(
            { name: "string" },
            secretSignature,
            {
                algorithm: 'HS256',
                // expiresIn: tokenLife,
            },
        );
        return token;
    } catch (error) {
        console.log(`Error in generate access token:  + ${error}`);
        return null;
    }
};

export const loginMethod = async (req: TypedRequestBody<{ username: string, password: string }>, res: e.Response, next: e.NextFunction) => {
    const username = req.body.username.toLowerCase();
    const password = req.body.password;
    const user = await userController.getUser(username);
    if (!user) {
        return res.status(401).send('Tên đăng nhập không tồn tại.');
    }
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).send('Mật khẩu không chính xác.');
    }
    const accessToken = jwt.sign({ data: user }, process.env.ACCESS_TOKEN_SECRET || "", {
        algorithm: 'HS256',
        expiresIn: process.env.ACCESS_TOKEN_LIFE,
    });

    if (!accessToken) {
        return res
            .status(401)
            .send('Đăng nhập không thành công, vui lòng thử lại.');
    }
    let refreshToken = jwt.sign({ data: user }, process.env.ACCESS_TOKEN_SECRET || "", {
        expiresIn: 604800 // 1 week
    });
    if (!user.refreshToken) {
        await userController.updateRefreshToken(user as any, refreshToken);
    } else {
        refreshToken = user.refreshToken;
    }
    return res.json({
        msg: 'Đăng nhập thành công.',
        accessToken,
        refreshToken,
        user,
    });
}
export interface TypedRequestBody<T> extends Express.Request {
    body: T
}