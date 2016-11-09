import winston from 'winston';
import slack from 'slack';
import _ from 'lodash';
import config from './config';
import Restaurant from './models/Restaurant';

const bot = slack.rtm.client();

let self;

const message = {
  token: config('SLACK_TOKEN'),
  icon_emoji: config('ICON_EMOJI'),
  username: 'Lounasbotti',
};

bot.started((payload) => {
  self = payload.self;
});

bot.message((msg) => {
  if (!msg.user) return;
  if (!_.includes(msg.text.match(/<@([A-Z0-9])+>/igm), `<@${self.id}>`)) return;

  message.channel = msg.channel;

  if (msg.text.match(/lisää/i)) {
    const restaurantName = msg.text.split(/lisää/i)[1].trim();
    Restaurant.query().insert({ name: restaurantName }).then((restaurant) => {
      message.text = `${restaurant.name} lisättiin`;
      slack.chat.postMessage(message, (err, data) => {
        if (err) throw err;

        const txt = _.truncate(data.message.text);

        winston.log(`🤖  beep boop: I responded with "${txt}"`);
      });
    });
  }
});

module.exports = bot;
