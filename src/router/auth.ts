import express, { Express, Request, Response } from 'express';
import { verifyToken, test_Token } from "./verifyToken";
export interface TypedRequestBody<T> extends Express.Request {
  body: T
}


import { _authRegister } from "../controller/auth/auth"
import userController, { IUser } from '../controller/auth/user';
import bcrypt from "bcrypt"
import { authHashToken } from '../controller/auth/auth.methods';
import jwt from "jsonwebtoken";

export const register = (app: express.Application) => {
  app.post("/register", async (req: TypedRequestBody<IUser>, res, next) => {
    _authRegister(req, res)
  });
  app.post("/login", verifyToken, async (req: TypedRequestBody<{ username: string, password: string }>, res, next) => {
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
  });
  // define a route to handle logout
  app.get("/logout", test_Token, (req: any, res) => {
    // req.logout();
    res.send("handler")
  });

};

