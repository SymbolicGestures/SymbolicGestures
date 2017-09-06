const db = require('../');

const History = db.Model.extend({
  tableName: 'histories',
  hasTimestamps: ['created_at'],
  application: function() {
    return this.belongsTo('Application');
  }
});

module.exports = db.model('History', History);
