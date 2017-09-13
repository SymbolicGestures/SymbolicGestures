const models = require('../models');

exports.seed = function (knex, Promise) {

  return models.Profile.where({ email: 'test@gmail.com' }).fetch()
    .then((profile) => {
      if (profile) {
        throw profile;
      }
      return models.Profile.forge({
        first: 'Test',
        last: 'User',
        display: 'testUser',
        email: 'test@gmail.com',
        image_link: 'http://www.material-ui.com/images/uxceo-128.jpg'
      }).save();
    })
    .error(err => {
      console.error('ERROR: failed to create profile');
      throw err;
    })
    .then((profile) => {
      return models.Auth.forge({
        type: 'local',
        password: 'test',
        profile_id: profile.get('id')
      }).save();
    })
    .error(err => {
      console.error('ERROR: failed to create auth');
    })
    .catch(() => {
      console.log('WARNING: default user already exists.');
    });

};
