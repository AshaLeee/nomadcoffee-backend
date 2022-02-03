import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { processCategory } from "../coffeeshop.utils";

export default {
    Mutation: {
        uploadPhoto: protectedResolver(
            async (_, {url, slug}, {loggedInuser}) => {
                let categoryObj = [];
            if (slug) {
                categoryObj = processCategory(slug);
                }
            return client.photo.create({
                data: {
                    url,
                    slug,
                    user: {
                        connect: {
                            id: loggedInuser.id,
                        },
                    },
                    ...(categoryObj.length > 0 && { 
                        categories: {
                        connectOrCreate: categoryObj,
                    },
                }),
                },
            })
            }
        ),
    },
};