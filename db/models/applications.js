const db = require('../');

const Application = db.Model.extend({
  tableName: 'applications',
  hasTimestamps: true,
  profile: function() {
    return this.belongsTo('Profile');
  },
  histories: function() {
    return this.hasMany('History');
  },
  notes: function() {
    return this.hasMany('Note');
  },
  contacts: function() {
    return this.hasMany('Contact');
  }
});

module.exports = db.model('Application', Application);
