// import type { NextApiRequest, NextApiResponse } from "next";
// import { getToken } from "next-auth/jwt"
// import jwt from 'jsonwebtoken';
// import { logger } from "../lib/logger";
// const secret = process.env.JWT_KEY

// //API Handler, which checks if the request is authorized

// //Props:
// //req and res for pulling the token
// //method (e.g: "POST") for defining the handled (allowed) request type
// //func --> executed of authenticated
// export default async function handler(
//     req: NextApiRequest,
//     res: NextApiResponse,
//     method: string,
//     func: () => void
//   ) {
//     //Check if the allowed method is the actual method 
//     if (req.method === method) {
//       //Fetch the token from the request
//       const token = await getToken({ req, secret: secret})

//       //If a token is existing (and not null, which would mean, that the request is unauthenticated)
//       if(token) {
//           try {
//             //Check if the token is expired
//             //@ts-ignore
//             if(token.exp * 1000 < Date.now()) {
//                 //EXPIRED 
//                 logger.debug("EXPIRED TOKEN")
//                 res.status(401).send({message: "Token expired"})
//             } else {
//               //Token is not expired and authorized --> execute function
//               await func()
//             }
            
//           } catch (e) {
//             //Not authenticated return status
//             res.status(401)
//           }
//       } else {
//           res.status(401)
//       }
//     } else {
//       //Method not allowed
//       throw new Error(
//         `The HTTP ${req.method} method is not supported at this route.`
//       );
//     }
//     res.end()
//   }