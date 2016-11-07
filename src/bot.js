import winston from 'winston';
import slack from 'slack';
import _ from 'lodash';
import config from './config';

const bot = slack.rtm.client();

let self;

bot.started((payload) => {
  self = payload.self;
});

bot.message((msg) => {
  if (!msg.user) return;
  if (!_.includes(msg.text.match(/<@([A-Z0-9])+>/igm), `<@${self.id}>`)) return;

  slack.chat.postMessage({
    token: config('SLACK_TOKEN'),
    icon_emoji: config('ICON_EMOJI'),
    channel: msg.channel,
    username: 'Lounasbotti',
    text: 'Hello world',
  }, (err, data) => {
    if (err) throw err;

    const txt = _.truncate(data.message.text);

    winston.log(`🤖  beep boop: I responded with "${txt}"`);
  });
});

module.exports = bot;
