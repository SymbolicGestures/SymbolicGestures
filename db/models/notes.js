const db = require('../');

const Note = db.Model.extend({
  tableName: 'notes',
  hasTimestamps: true,
  application: function() {
    return this.belongsTo('Application');
  }
});

module.exports = db.model('Note', Note);
