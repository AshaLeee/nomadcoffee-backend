import client from "../client";

export default {
    CoffeeShop: {
        user: ({ userId }) => 
        client.user.findUnique({
            where: { 
                id: userId,
                },
        }),
        categories: (_, { id , lastId }) => 
        client.coffeeShop.findMany({ 
            where: {
                coffeeShop: {
                    some: {
                        id,
                    },
                },
            },
        }).categories({
            take: 5,
            skip: lastId ? 1 : 0,
            ...(lastId && { cursor: { id: lastId} }),
        }),
        photos: (_, { id , lastId}) =>
        client.coffeeShop.findUnique({
            where: { 
                id,
             },
        }).photos({
            take: 5,
            skip: lastId ? 1 : 0,
            ...(lastId && { cursor: { id: lastId} }),
        }),
    },
    Category: {
        coffeeShops: ({ id }, { page }) => {
            return client.category
                .findUnique({
                    where: {
                        id,
                    },
                })
                .coffeeShops();
        },
        totalShops: ({ id }) =>
        client.coffeeShop.count({
            where: {
                category: {
                    some: {
                        id,
                    },
                },
            },
        }),
    },
};