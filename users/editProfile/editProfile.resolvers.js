import client from "../../client";
import bcrypt from "bcrypt";
import { protectdResolver } from "../users.utils";


const resolverFn =  async(_, {
    username,
    email,
    name,
    password:newPassword,
    githubUsername,
    avatarURL,
    bio,
}, { loggedInuser, protectResolver }
) => {
    let uglyPassword = null;
    if(newPassword) {
        uglyPassword = await bcrypt.hash(newPassword, 10);
    }
    const updatedUser = await client.user.update({
        where: {
            id: loggedInuser.id,
        },
        data: {
            username, email, name, githubUsername, avatarURL,bio, ...(uglyPassword && { password: uglyPassword }),
        }
    });
    if(updatedUser.id){
        return {
            ok: true,
        }
    }else {
        return {
            ok: false,
            error: "Could not update profile.",
        }
    }
};


export default {
    Mutation: {
        editProfile: protectdResolver(resolverFn),
    },
}