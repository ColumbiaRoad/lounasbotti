import winston from 'winston';
import express from 'express';
import bodyParser from 'body-parser';

import bot from './bot';
import config from './config';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => { res.send('\n 👋 🌍 \n'); });

app.listen(config('PORT'), (err) => {
  if (err) throw err;

  winston.log(`\n🚀  Lounasbotti LIVES on PORT ${config('PORT')} 🚀`);

  if (config('SLACK_TOKEN')) {
    winston.log(`🤖  beep boop: @starbot is real-time\n`);
    bot.listen({ token: config('SLACK_TOKEN') });
  }
});
