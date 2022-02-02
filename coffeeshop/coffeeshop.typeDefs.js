import { gql } from "apollo-server";

export default gql`

    type Photo {
        id: String!
        user: User!
        userId: String!
        url: String!
        caption: String
        hashtags: [Hashtag]
        createdAt: String!
        updatedAt: String!
    }

    type Hashtag {
        id: String!
        hashtag: String!
        photos: [Photo]!
        createdAt: String!
        updatedAt: String!
    }
    # type CoffeeShopPhoto {
    #     id: Int!
    #     url: String!
    #     shop: CoffeeShop
    #     # coffeeShopId: Int!
    # }
    # type CoffeeShop {
    #     id: Int!
    #     user: User!
    #     # userId: Int!
    #     name: String!
    #     latitude: String
    #     longitude: String
    #     caption: String
    #     photos: [CoffeeShopPhoto]
    #     categories: [Category]
    #     createdAt: String!
    #     updatedAt: String!
    # }
    
    # type Category {
    #     id: Int!
    #     name: String!
    #     slug: String
    #     shops: [CoffeeShop]
    #     totalShops: Int
    # }
`;