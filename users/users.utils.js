import jwt from "jsonwebtoken";
import client from "../client";

export const getUser = async(token) => {
   try{ 
       if(!token){
           return null;
       }
       const { id } = await jwt.verify(token, process.env.SECRET_KEY);
        const user = await client.user.findUnique({
            where: { id }
        });
        if(user){
            return user;
        }else {
            return null;
        }
    } catch{
        return null;
    }
};

// export const protectdResolver = (ourResolver) => (
//     root, args, context, info
//     ) => {
//     if(!context.loggedInuser) {
//         return {
//             ok: false,
//             error: "Please login to perform this action.",
//         };
//     }
//     return ourResolver(root, args, context, info);
// };

export function protectdResolver(ourResolver) {
    return function (root, args, context, info) {
        if(!context.loggedInuser) {
            return {
                    ok: false,
                    error: "Please login to perform this action.",
                    };
        }
        return ourResolver(root, args, context, info);
    };
}