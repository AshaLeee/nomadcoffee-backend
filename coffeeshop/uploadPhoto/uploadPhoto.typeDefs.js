import { gql } from "apollo-server";

export default gql`
    type Mutation {
        uploadPhoto(url: String!, caption: String):Photo
    }
`;