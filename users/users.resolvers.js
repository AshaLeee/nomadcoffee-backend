import client from "../client";
export default {
    User: {
        totalFollowing: ({ id }) => client.user.count({
                where: {
                    followers: {
                        some: {
                            id,
                        },
                    },
            },
        }),
        totalFollowers: ({ id }) => client.user.count({
                where: {
                    following: {
                        some: {
                            id,
                        },
                    },
                },
        }),
        isMe: ({id}, _, {loggedInuser}) => {
            if(!loggedInuser){
                return false;
            }
            return id === loggedInuser.id;
        },
        isFollowing: async ({id}, _, {loggedInuser}) => {
            if(!loggedInuser){
                return false;
            }
            const exist = await client.user.count({
                where: {
                    username: loggedInuser.username,
                    following: {
                        some: {
                            id,
                        },
                    },
                },
            });
           
            return Boolean(exist);
        },
    },
};