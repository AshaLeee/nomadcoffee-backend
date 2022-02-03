import client from "../../client";

export default {
    Query: {
        seeCategory: (_, { category }) => 
        client.category.findUnique({
            where: {
                category,
            },
        }),
    }

};