const models = require('../../db/models');

module.exports.getAll = () => {
  models.Application.fetchAll()
    .then(applications => {
      res.status(200).send(applications);
    })
    .catch(err => {
      // This code indicates an outside service (the database) did not respond in time
      res.status(503).send(err);
    });
};
