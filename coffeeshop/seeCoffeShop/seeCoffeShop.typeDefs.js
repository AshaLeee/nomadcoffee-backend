import { gql } from "apollo-server";

export default gql`
    type Query {
        seeCoffeShop(id: String):Photo
    }
`;
