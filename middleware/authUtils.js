import jwt from "jsonwebtoken";

const createJwtToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "2day",
  });
  return token;
};

export { createJwtToken };
