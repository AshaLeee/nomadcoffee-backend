import {createWriteStream} from "fs";
import client from "../../client";
import bcrypt from "bcrypt";
import { protectedResolver } from "../users.utils";


const resolverFn =  async(_, {
    username,
    email,
    name,
    password:newPassword,
    githubUsername,
    avatarURL,
    bio,
}, { loggedInuser }
) => {
    let newAvatarURL = null;
    if( avatarURL) {
    const { filename, createReadStream } = await avatarURL;
    const newFilename = `${loggedInuser.id}-${Date.now()}-${filename}`;
    const readStream = createReadStream();
    const writeStream = createWriteStream(
        process.cwd() + "/uploads/" + newFilename
        );
    readStream.pipe(writeStream);
    newAvatarURL = `http://localhost:4000/static/${newFilename}`
    }
    let uglyPassword = null;
    if(newPassword) {
        uglyPassword = await bcrypt.hash(newPassword, 10);
    }
    const updatedUser = await client.user.update({
        where: {
            id: loggedInuser.id,
        },
        data: {
            username, 
            email, 
            name, 
            githubUsername, 
            bio, 
            ...(uglyPassword && { password: uglyPassword }),
            ...(newAvatarURL && { avatarURL: newAvatarURL }),
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
        editProfile: protectedResolver(resolverFn),
    },
}