const db = require('../');

const HistoryAnalytics = db.Model.extend({
  tableName: 'history_analytics',
  hasTimestamps: true,
  profile: function() {
    return this.belongsTo('Profile');
  }
});
module.exports = db.model('HistoryAnalytics', HistoryAnalytics);
