import dotenv from 'dotenv';

const ENV = process.env.NODE_ENV || 'development';

if (ENV === 'development') dotenv.load();

const config = {
  ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  PROXY_URI: process.env.PROXY_URI,
  SLACK_TOKEN: process.env.SLACK_TOKEN,
  ICON_EMOJI: ':knife_fork_plate:',
};

module.exports = (key) => {
  if (!key) return config;

  return config[key];
};
