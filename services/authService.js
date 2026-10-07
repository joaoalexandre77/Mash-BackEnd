import argon2 from "argon2";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

class AuthService {
    async login(email, password) {
        const user = await User.findOne({
            where :{email : email}
        });

        if(!user) throw new Error("INVALID_CREDENTIAL");

        const isValidPassword = await argon2.verify(user.password, password);

        if(!isValidPassword) throw new Error("INVALID_CREDENTIAL");
        
        const secretKey = process.env.JWT_SECRET_KEY;

        const token = jwt.sign(
            {id: user.id, email: user.email},
            secretKey,
            {expiresIn: '1d'}
        );

        return {token, user: {id: user.id, name: user.name, email: user.email}};
    }
}

export default new AuthService;