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
      slack.chat.postMessage(message, (err) => {
        if (err) throw err;
      });
    });
  } else if (msg.text.match(/mitä tänään/i)) {
    Restaurant.query().then((restaurants) => {
      const randomRestaurant = _.sample(restaurants);
      message.text = `Tämän päivän lounaspaikka on: ${randomRestaurant.name}`;
      slack.chat.postMessage(message, (err) => {
        if (err) throw err;
      });
    });
  } else if (msg.text.match(/listaa/i)) {
    Restaurant.query().then((restaurants) => {
      let restaurantText = 'Lisätyt ravintolat:';
      _.each(restaurants, (restaurant) => {
        restaurantText += `\n* ${restaurant.name}`;
      });
      message.text = restaurantText;
      slack.chat.postMessage(message, (err) => {
        if (err) throw err;
      });
    });
  }
});

module.exports = bot;
