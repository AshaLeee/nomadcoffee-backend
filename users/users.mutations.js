import client from "../client";
import bcrypt from "bcrypt";

export default {
    Mutation: {
        createAccount: async (_,
            { username,
                email,
                name,
                password }) => {
            const exitingUser = await client.user.findFirst({
                where: {
                    OR: [
                        {
                            username,
                        },
                        {
                            email,
                        },
                    ],
                },
            });

            const uglyPassword = await bcrypt.hash(password, 10);
            return client.user.create({
                data:{
                    username,
                    email,
                    name,
                    avatarURL,
                    githubUsername,
                    password: uglyPassword,
                },
            }).then(() => true).catch(() => false);
            // save and return the user
        },
    },
};