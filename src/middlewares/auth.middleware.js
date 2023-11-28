export const authMiddleware = (roles) => {
  return (req, res, next) => {
    // if (roles.includes("public")) {
    //   return next();
    // }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json("Not authorized");
    }
    next();
  };
};
