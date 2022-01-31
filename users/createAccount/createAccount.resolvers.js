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
                    return false;
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
                    return true;
               }else{
                   return false;
               }
            }catch (e){
                return true;
            }
        },
    },
};