export default (): object => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  environment: process.env.ENVIRONMENT || 'development',
  tokenSecretKey: process.env.TOKEN_SECRET_KEY || 'secret',
});
