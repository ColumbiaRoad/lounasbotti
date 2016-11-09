import { Model } from 'objection';

class Restaurant extends Model {
  static get tableName() { return 'restaurants'; }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],

      properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
      },
    };
  }
}

module.exports = Restaurant;
