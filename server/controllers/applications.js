const models = require('../../db/models');

/**
 * returns all apps of the user.
 * @return {Array}     Returns an array of applications tree of the user.
 */
module.exports.getAllApps = (req, res) => {
  models.Application.where({ profile_id: req.user.id }).fetchAll({withRelated: ['contacts', 'histories', 'notes']})
    .then(applications => {
      res.status(200).send(applications);
    })
    .catch(err => {
      // This code indicates an outside service (the database) did not respond in time
      res.status(503).send(err);
    });
};

module.exports.createOrUpdateApp = (req, res) => {
  let application = req.body;
  let applicant = req.user;
  if (req.params.id) {
    //udate
    models.Application.forge({ id: req.params.id }).fetch()
      .then(currentApplication => {
        if (currentApplication) {
          //updating in case of a application with given id.
          return currentApplication.save({
            company_name: application.company_name,
            job_posting_link: application.job_posting_link,
            stage: application.stage,
            job_title: application.job_title,
            location: application.location,
            job_posting_source: application.job_posting_source,
            job_posting_to_pdf_link: application.job_posting_to_pdf_link
          });
        }
      })
      .then(() => {
        res.status(200).send('application successfully updated!');
      })
      .catch(err => {
        res.status(503).send(err + 'application did not save');
      });
  } else {
    //create
    return models.Application.forge({
      company_name: application.company_name,
      stage: application.stage,
      profile_id: applicant.id,
      job_title: application.job_title,
      location: application.location,
      job_posting_source: application.job_posting_source,
      job_posting_to_pdf_link: application.job_posting_to_pdf_link
    })
      .save()
      .then(() => {
        res.status(200).send('application successfully created!');
      })
      .catch(err => {
        res.status(503).send(err + 'application did not save');
      });
  }

};

module.exports.getAllNotes = (req, res) => {
  models.Note.where({ application_id: req.user.id }).fetchAll()
    .then(notes => {
      res.status(200).send(notes);
    })
    .catch(err => {
      // This code indicates an outside service (the database) did not respond in time
      res.status(503).send(err);
    });
};

module.exports.createOrUpdateNote = (req, res) => {
  let note = req.body;
  let applicant = req.user;
  if (req.params.id) {
    models.Note.forge({ id: req.params.id }).fetch()
      .then(currentNote => {
        if (currentNote) {
          return currentNote.save({
            type: note.type,
            note: note.note
          });
        }
      })
      .then(() => {
        res.status(200).send('Note successfully updated!');
      })
      .catch(err => {
        res.status(503).send(err);
      });
  } else {
    return models.Note.forge({
      application_id: applicant.id,
      type: note.type,
      note: note.note
    })
      .save()
      .then(() => {
        res.status(200).send('Note successfully created!');
      })
      .catch(err => {
        res.status(503).send(err);
      });
  }

};

module.exports.getAllHistories = (req, res) => {
  models.History.where({ application_id: req.user.id }).fetchAll()
    .then(histories => {
      res.status(200).send(histories);
    })
    .catch(err => {
      // This code indicates an outside service (the database) did not respond in time
      res.status(503).send(err);
    });
};

module.exports.createOrUpdateHistory = (req, res) => {
  let history = req.body;
  let applicant = req.user;
  if (req.params.id) {
    //update
    models.History.forge({ id: req.params.id }).fetch()
      .then(currentHistory => {
        if (currentHistory) {
          return currentHistory.save({
            event: history.event
          });
        }
      })
      .then(() => {
        res.status(200).send('History successfully updated!');
      })
      .catch(err => {
        res.status(503).send(err + 'failed to update history');
      });
  } else {
    //create
    return models.History.forge({
      application_id: applicant.id,
      event: history.event
    })
      .save()
      .then(() => {
        res.status(200).send('History successfully created!');
      })
      .catch(err => {
        res.status(503).send(err + 'failed to create history');
      });
  }
};

module.exports.getAllContacts = (req, res) => {
  models.Contact.where({ application_id: req.user.id }).fetchAll()
    .then(contacts => {
      res.status(200).send(contacts);
    })
    .catch(err => {
      // This code indicates an outside service (the database) did not respond in time
      res.status(503).send(err);
    });
};

module.exports.createOrUpdateContact = (req, res) => {
  let contact = req.body;
  let applicant = req.user;
  if (req.params.id) {
    models.Contact.forge({ id: req.params.id }).fetch()
      .then(currentContact => {
        if (currentContact) {
          return currentContact.save({
            application_id: applicant.id,
            role: contact.role,
            name: contact.name,
            email: contact.email,
            phone: contact.phone
          });
        } else { throw 'error updating contact'; }
      })
      .then(() => {
        res.status(200).send('Contact successfully updated!');
      })
      .catch(err => {
        res.status(503).send(err);
      });
  } else {
    return models.Contact.forge({
      application_id: applicant.id,
      role: contact.role,
      name: contact.name,
      email: contact.email,
      phone: contact.phone
    })
      .save()
      .then(() => {
        res.status(200).send('Contact successfully created!');
      })
      .catch(err => {
        res.status(503).send(err);
      });
  }
};

module.exports.getUserPreference = (req, res) => {
  models.Profile.where({ id: req.user.id }).fetch()
    .then(preference => {
      res.status(200).send(preference);
    })
    .catch(err => {
      // This code indicates an outside service (the database) did not respond in time
      res.status(503).send(err);
    });
};

module.exports.updateUserPreference = (req, res) => {
  models.Profile.where({ id: req.user.id }).fetch()
    .then(preference => {
      return preference.save({
        stages_settings: req.body.stagesSettings
      });
    })
    .save()
    .then(() => {
      res.status(200).send('Stages preference successfully created/updated!');
    })
    .catch(err => {
      res.status(503).send(err);
    });
};
