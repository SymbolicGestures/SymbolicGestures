const db = require('../');

const Profile = db.Model.extend({
  tableName: 'profiles',
  hasTimestamps: true,
  auths: function() {
    return this.hasMany('Auth');
  },
  organizations: function() {
    return this.belongsTo('Organization');
  },
  applications: function() {
    return this.hasOne('Application')
  }
});

module.exports = db.model('Profile', Profile);
