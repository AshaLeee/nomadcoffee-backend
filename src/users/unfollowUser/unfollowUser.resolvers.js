import { protectedResolver } from "../users.utils";
import client from "../../client";

export default {
    Mutation: {
        unfollowUser: protectedResolver(async(_, {username}, {loggedInuser}) => {
            const ok = await client.user.findUnique({
                where: {username},
            });
            if(!ok){
                return {
                    ok: false,
                    error: "Can't unfollow user.",
                };
            }
            await client.user.update({
                where: {
                    id: loggedInuser.id,
                },
                data: {
                    following: {
                        disconnect: {
                            username,
                            },
                        },
                    },
                });
                return {
                    ok: true,
                };
            }
        ),
    },
};