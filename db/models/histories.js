const db = require('../');

const History = db.Model.extend({
  tableName: 'histories',
  application: function() {
    return this.belongsTo('Application');
  }
});

module.exports = db.model('History', History);
