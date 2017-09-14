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

module.exports.getAllOrganizations = (req, res) => {
  return models.Organization.forge().fetchAll()
    .then(organizations => {
      res.status(200).send(organizations);
    })
    .catch(err => {
      res.status(503).send(err);
    });
};

module.exports.createOrUpdateOrganization = (req, res) => {
  let organization = req.body;
  if (req.params.id) {
    //update
    return models.Organization.forge({id: req.params.id}).fetch()
      .then(newOrganization => {
        if(newOrganization) {
          return newOrganization.save({
            organization_name: organization.organization_name,
            member_count: (organization.member_count > 0 ? newOrganization.attributes.member_count + organization.member_count : undefined)
          })
        }
      })
      .then(organization => {
          res.status(200).send(organization);
        })
      .catch(err => {
        res.status(503).send('no such organization exists');
      })
  } else {
    //create
    return models.Organization.forge({
      organization_name: organization.organization_name,
      member_count: organization.member_count
    }).save()
      .then(organization => {
        res.status(200).send(organization);
      })
      .catch(err => {
        res.status(503).send(err);
      })
  }
};
