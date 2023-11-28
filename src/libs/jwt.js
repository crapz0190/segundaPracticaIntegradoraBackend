import jwt from "jsonwebtoken";
import env from "../dotenv.js";

export const createAccessToken = (payload) => {
  return jwt.sign(payload, env.TOKEN_SECRET, {
    expiresIn: "1h",
  });
};

// export const createAccessToken = (req, res, next) => {
//   try {
//     const token = req.cookies.token;
//     const userToken = jwt.verify(token, env.TOKEN_SECRET);
//     req.user = userToken;
//     next();
//   } catch (e) {
//     res.json({ error: e.message });
//   }
// };

// export function createAccessToken(payload) {
//   return new Promise((res, rej) => {
//     jwt.sign(
//       payload,
//       env.TOKEN_SECRET,
//       {
//         expiresIn: "1d",
//       },
//       (err, token) => {
//         if (err) rej(err);
//         res(token);
//       }
//     );
//   });
// }
