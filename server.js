require("dotenv").config();
import { ApolloServer } from "apollo-server";
import { typeDefs, resolvers } from "./schema";
import { getUser, protectResolver } from "./users/users.utils";

const PORT = process.env.PORT;
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
            return {
                loggedInuser: await getUser(req.headers.token),
                protectResolver,
            }
        },  
});

server
 .listen(PORT)
 .then(() => console.log(`🚀 Server is running on http://localhost:${PORT} ✅`)
    );