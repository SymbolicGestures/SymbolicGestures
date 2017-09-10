const models = require('../../db/models');

module.exports.getUserProfile = (req, res) => {
  models.Profile.where({ id: req.user.id }).fetch()
    .then(profile => {
      res.status(200).send(profile);
    })
    .catch(err => {
      // This code indicates an outside service (the database) did not respond in time
      res.status(503).send(err);
    });
};

module.exports.updateUserProfile = (req, res) => {
  let profile = req.body;
  models.Profile.where({ id: req.user.id }).fetch()
    .then(currentProfile => {
      return currentProfile.save({
        first: profile.first,
        last: profile.last,
        display: profile.display,
        email: profile.email,
        phone: profile.phone,
        stages_settings: JSON.stringify(profile.stages_settings)
      });
    })
    .then(() => {
      res.status(200).send('Profile successfully updated!');
    })
    .catch(err => {
      res.status(503).send(err);
    });
};
