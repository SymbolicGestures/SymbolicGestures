const db = require('../');

const Contact = db.Model.extend({
  tableName: 'contacts',
  application: function() {
    return this.belongsTo('Application');
  }
});

module.exports = db.model('Contact', Contact);
