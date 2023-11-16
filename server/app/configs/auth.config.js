const authConfig = {
  secret: process.env.ACCESS_TOKEN_SECRET,
  jwtExpiration: 360,
  jwtRefreshExpiration: 86400,
  jwtRefreshExpirationLong: 2592000,
};

export default authConfig;
