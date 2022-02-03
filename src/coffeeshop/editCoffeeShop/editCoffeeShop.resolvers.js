import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { processCategory } from "../coffeeshop.utils";

export default {
    Mutation: {
        editCoffeeShop: protectedResolver( async(_, { id, name, latitude, longitude, slug }, {loggedInuser}) => {
            const oldcoffeeShop = await client.coffeeShop.findFirst({
                where: {
                    id,
                    userId: loggedInuser.id
                },
                include: {
                    categories: {
                        select: {
                            category: true,
                        },
                    },
                },
            });
            if(!oldcoffeeShop){
                return {
                    ok: false,
                    error: "coffeshop not found."
                };
            }
            await client.coffeeShop.update({
                where: {
                    id,
                },
                data : {
                    name,
                    latitude,
                    longitude,
                    slug,
                    categories: {
                        disconnect: oldcoffeeShop.categories,
                        connectOrCreate: processCategory(slug),
                    },
                },
            });
            return {
                ok: true,
            };
        }),
    }
};