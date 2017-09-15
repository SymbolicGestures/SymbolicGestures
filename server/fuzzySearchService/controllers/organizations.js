const models = require('../db/models');
const bookshelf = require('../db');

module.exports.getAllOrganizations = (req, res) => {
  return models.Organization.forge().fetchAll()
    .then(organizations => {
      res.status(200).send(organizations);
    })
    .catch(err => {
      res.status(503).send(err);
    });
};

module.exports.getFuzzyOrganizations = (req, res) => {
  bookshelf.knex.raw(`SELECT * from organizations WHERE  '${req.body.organization_name}' % organization_name LIMIT ${req.body.limit || 10}`)
    .then(organizations => {
      res.status(200).send(organizations)
    })
};

module.exports.createOrUpdateOrganization = (req, res) => {
  let organization = req.body;
  if (req.params.id) {
    //update
    return models.Organization.forge({id: req.params.id}).fetch()
      .then(newOrganization => {
        if(newOrganization) {
          console.log(organization)
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
        res.status(503).send('Cannot update organization. There may be an organization with that name already.');
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
