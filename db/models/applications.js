const db = require('../');

const Application = db.Model.extend({
  tableName: 'applications',
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
