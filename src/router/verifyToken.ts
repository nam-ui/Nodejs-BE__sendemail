import crypto from "crypto";
import e from "express";
import jwt from "jsonwebtoken";
import userController, { IUser } from '../controller/auth/user';



const verifyToken = async (req: e.Request, res: e.Response, next: any) => {
  console.log('==================================== verifyToken ===================================');
  // Lấy access token từ header
  const accessTokenFromHeader = req.headers.authorization;
  // if (!accessTokenFromHeader) {
  //   return res.status(401).send('Không tìm thấy access token!');
  // }
  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
  // const verify = await jwt.verify(accessTokenFromHeader, "secret", function (err, decoded) {
  //   console.log(err)
  // });
  // console.log(verify);
  // if (!verify) {
  //   return res
  //     .status(401)
  //     .send('Bạn không có quyền truy cập vào tính năng này!');
  // }
  // const user = await userController.getUser(accessTokenFromHeader);
  // req.user = user;
  next();
};
const test_Token = async (req: e.Request, res: e.Response, next: any) => {
  console.log('==================================== verifyToken ===================================');
  // Lấy access token từ header
  const accessTokenFromHeader = req.headers.authorization;
  const refreshTokenFromBody = req.body.refreshToken;
  console.log(accessTokenFromHeader);

  if (!accessTokenFromHeader) {
    return res.status(401).send('Không tìm thấy access token!');
  }
  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
  const verify = await jwt.verify(accessTokenFromHeader, process.env.ACCESS_TOKEN_SECRET || "", {
    // algorithms: ["HS256"],
    ignoreExpiration: true,
  })
  if (!verify) {
    return res
      .status(401)
      .send('Bạn không có quyền truy cập vào tính năng này!');
  }
  const user = await userController.getUser(accessTokenFromHeader);
  // req.user = user;
  next();
};



export {
  verifyToken,
  test_Token
}