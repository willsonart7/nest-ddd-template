export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  environment: process.env.ENVIRONMENT || 'development',
});
