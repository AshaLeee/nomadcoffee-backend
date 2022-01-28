import client from "../../client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export default {
    Mutation: {
        login: async(_, { username, password }) => {
            // find user with args.username
            const user = await client.user.findFirst({where: { username }})
            if(!user){
                return {
                    ok: false,
                    error: "User not found.",
                };
            }
            const passwardOk = await bcrypt.compare(password, user.password);
            if(!passwardOk){
                return {
                    ok: false,
                    error: "Password is incorrect.",
                }
            }
            //check password with args.password
            const token = await jwt.sign({id: user.id}, process.env.SECRET_KEY);
            return {
                ok: true,
                token,
            }
            // issue a token and send it to the user
        },
    },
};