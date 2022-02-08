import client from "../../client";
import bcrypt from "bcrypt";

export default {
    Mutation: {
        createAccount: async (_,{ 
                username,
                email,
                name,
                password,
            }) => {
            try{
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
                if(exitingUser){
                    return {
                        ok: false,
                        error: "already exitingUser.",
                    };
                }
                const uglyPassword = await bcrypt.hash(password, 10);
                const createdUser = await client.user.create({
                    data: {
                        username,
                        email,
                        name,
                        password:uglyPassword,
                    },
                });
               if(createdUser.id){
                    return {
                        ok: true,
                        token,
                    };
               }else{
                return {
                    ok: false,
                    error: "Fail to create user.",
                }
               }
            }catch (e){
                return {
                    ok: false,
                    error: "Fail to create user with e",
                }
            }
        },
    },
};