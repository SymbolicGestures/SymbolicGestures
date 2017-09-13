const db = require('../');

const Profile = db.Model.extend({
  tableName: 'profiles',
  hasTimestamps: true,
  auths: function() {
    return this.hasMany('Auth');
  },
  organizations: function() {
    return this.hasOne('Organization');
  }
});

module.exports = db.model('Profile', Profile);
