import client from "../../client";

export default {
    Query: {
        seeCoffeShop: (_, {id}) => client.photos.findUnique({
            where: {
                id,
            }
        })
    }
};