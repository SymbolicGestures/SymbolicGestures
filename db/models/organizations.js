const db = require('../');

const Organization = db.Model.extend({
  tableName: 'organizations',
  hasTimestamps: true,
  profile: function() {
    return this.belongsTo('Profile');
  }
});

module.exports = db.model('Organization', Organization);
