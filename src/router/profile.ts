import jwt from "jsonwebtoken";
import express, { Express, Request, Response } from 'express';
import ProfileSchema from "../modelsMongoose/profile"
import { IUserMongoose, TypedRequestBody } from "../controller/auth/user";
import { IBodyProfile, IVerifyAuth } from "../controller/profile/interface";
export const profile = (app: express.Application) => {
    app.get("/profile", async (req, res, next) => {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) { return res.status(401).send('Không tìm thấy access token!'); }
        const verify = await jwt.verify(authorizationHeader, process.env.ACCESS_TOKEN_SECRET || "", {
            ignoreExpiration: true,
        })
        const user = verify as IUserMongoose;
        const list_streaming_profiles = await ProfileSchema.findById(user._id)
        return res.json({
            profiles: JSON.stringify(list_streaming_profiles)
        })

    });
    app.get("/profile/:id", async (req, res, next) => {
    });
    app.post("/profile", async (req: TypedRequestBody<IBodyProfile>, res, next) => {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) { return res.status(401).send('Không tìm thấy access token!'); }
        const verify = await jwt.verify(authorizationHeader, process.env.ACCESS_TOKEN_SECRET || "", {
            ignoreExpiration: true,
        })
        const user = verify as IVerifyAuth;
        const _newProfiles = await new ProfileSchema({
            "title": req.body.title,
            "email": req.body.email,
            "oAuthClientPlatform": req.body.oAuthClientPlatform,
            "_idUser": user.data._id
        })
        await _newProfiles.save();
        return res.json({
            profiles: _newProfiles
        })

    });
    app.put("/profile", async (req, res, next) => {
    });
    app.delete("/profile/:id", async (req, res, next) => {
    });
    app.delete("/profile", async (req, res, next) => {
    });
};
