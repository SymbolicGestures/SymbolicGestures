const db = require('../');

const Profile = db.Model.extend({
  tableName: 'profiles',
  hasTimestamps: true,
  auths: function() {
    return this.hasMany('Auth');
  },

  increment: function(previousStage, nextStage) {
    console.log('previousStage: ', previousStage, 'nextStage: ',nextStage);
    return this;
    // this.query('increment', 'application_count', '1');
    // let stageCount = this.get('count_by_stage');
    // stageCount[nextStage] ? stageCount[nextStage] = stageCount[nextStage]++ : stageCount[nextStage] = 1;
    // if(previousStage) {
    //   stageCount[previousStage] === 1 ? delete stageCount[previousStage] : stageCount[previousStage]--;
    // }
    // this.set('count_by_stage', JSON.stringify(stageCount));
  }
});

module.exports = db.model('Profile', Profile);
