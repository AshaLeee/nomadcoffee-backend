import client from "../../client";
import {protectedResolver} from "../../users/users.utils";

export default {
    Mutation: {
        uploadPhoto: protectedResolver(
            async (_, {url, caption}, {loggedInuser}) => {
                let hashtagObj = [];
            if (caption) {
                const hashtags = caption.match(/#[\w]+/g);
                hashtagObj = hashtags.map( hashtag => ({where: {hashtag}, create: {hashtag}}));
                console.log(hashtagObj);
                }
            return client.photo.create({
                data: {
                    url,
                    caption,
                    user: {
                        connect: {
                            id: loggedInuser.id,
                        },
                    },
                    ...(hashtagObj.length > 0 && { 
                        hashtags: {
                        connectOrCreate: hashtagObj,
                    },
                }),
                },
            })
            }
        ),
    },
};