const models = require('../../db/models');

/**
 * [getAllApp description]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
module.exports.getAllApps = (req, res) => {
  models.Application.fetchAll()
    .then(applications => {
      res.status(200).send(applications);
    })
    .catch(err => {
      // This code indicates an outside service (the database) did not respond in time
      res.status(503).send(err);
    });
};

module.exports.getOneApp = (req, res) => {
  models.Application.where({ profile_id: req.params.id }).fetchAll({withRelated: ['contacts', 'histories', 'notes']})
    .then(application => {
      res.status(200).send(application);
    })
    .catch(err => {
      // This code indicates an outside service (the database) did not respond in time
      res.status(503).send(err);
    });
};

module.exports.createOrUpdateApp = (req, res) => {
  models.Application.forge({ id: req.params.id }).fetch()
    .then(currentApplication => {
      let application = req.body;
      if(currentApplication) {
        //updating in case of a application with given id.
        return currentApplication.save({
          company_name: application.companyName,
          stage: application.stage,
          profile_id: application.profileId,
          job_title: application.jobTitle,
          location: application.location,
          job_posting_source: application.jobPostingSource,
          job_posting_to_pdf_link: application.jobPostingToPdfLink
        });
      } else {
        //creating in case of a application without given id.
        return model.Application.forge({
          company_name: application.companyName,
          stage: application.stage,
          profile_id: application.profileId,
          job_title: application.jobTitle,
          location: application.location,
          job_posting_source: application.jobPostingSource,
          job_posting_to_pdf_link: application.jobPostingToPdfLink
        }).save();
      }
    })
    .then(() => {
      res.status(200).send('application successfully created/updated!');
    })
    .catch(err => {
      res.status(503).send(err);
    });
};

module.exports.getAllNotes = (req, res) => {
  models.Note.fetchAll()
    .then(notes => {
      res.status(200).send(notes);
    })
    .catch(err => {
      // This code indicates an outside service (the database) did not respond in time
      res.status(503).send(err);
    });
};

module.exports.getOneNote = (req, res) => {
  models.Note.where({ application_id: req.params.id }).fetchAll()
    .then(note => {
      res.status(200).send(note);
    })
    .catch(err => {
      // This code indicates an outside service (the database) did not respond in time
      res.status(503).send(err);
    });
};

module.exports.createOrUpdateNote = (req, res) => {
  models.Note.forge({ id: req.body.id }).fetch()
  .then(currentNote => {
    let modelApp = req.params.id
    let note = req.body;
    if(currentNote) {
      return currentNote.save({
        application_id: modelApp.id,
        type: note.type,
        note: note.note
      });
    } else {
      return models.Note.forge({
        application_id: modelApp.id,
        type: note.type,
        note: note.note
      });
    }
  })
  .save()
  .then(() => {
    res.status(200).send('Note successfully created/updated!');
  })
  .catch(err => {
    res.status(503).send(err);
  });
};

module.exports.getAllHistories = (req, res) => {
  models.History.fetchAll()
    .then(histories => {
      res.status(200).send(histories);
    })
    .catch(err => {
      // This code indicates an outside service (the database) did not respond in time
      res.status(503).send(err);
    });
};

module.exports.getOneHistory = (req, res) => {
  models.History.where({ application_id: req.params.id }).fetchAll()
    .then(history => {
      res.status(200).send(history);
    })
    .catch(err => {
      // This code indicates an outside service (the database) did not respond in time
      res.status(503).send(err);
    });
};

module.exports.createOrUpdateHistory = (req, res) => {
  models.History.forge({ id: req.body.id }).fetch()
  .then(currentHistory => {
    let modelApp = req.params.id
    let history = req.body;
    if(currentHistory) {
      return currentHistory.save({
        application_id: modelApp.id,
        event: history.event
      });
    } else {
      return models.History.forge({
        application_id: modelApp.id,
        event: history.event
      });
    }
  })
  .save()
  .then(() => {
    res.status(200).send('History successfully created/updated!');
  })
  .catch(err => {
    res.status(503).send(err);
  });
};

module.exports.getAllContacts = (req, res) => {
  models.Contact.fetchAll()
    .then(contacts => {
      res.status(200).send(contacts);
    })
    .catch(err => {
      // This code indicates an outside service (the database) did not respond in time
      res.status(503).send(err);
    });
};

module.exports.getOneContact = (req, res) => {
  models.Contact.where({ application_id: req.params.id }).fetchAll()
    .then(contact => {
      res.status(200).send(contact);
    })
    .catch(err => {
      // This code indicates an outside service (the database) did not respond in time
      res.status(503).send(err);
    });
};

module.exports.createOrUpdateContact = (req, res) => {
  models.Contact.forge({ id: req.body.id }).fetch()
  .then(currentContact => {
    let modelApp = req.params.id
    let contact = req.body;
    if(currentContact) {
      return currentContact.save({
        application_id: modelApp.id,
        role: contact.role,
        name: contact.name,
        email: contact.email,
        phone: contact.phone
      });
    } else {
      return models.Contact.save({
        application_id: modelApp.id,
        role: contact.role,
        name: contact.name,
        email: contact.email,
        phone: contact.phone
      });
    }
  })
  .save()
  .then(() => {
    res.status(200).send('Contact successfully created/updated!');
  })
  .catch(err => {
    res.status(503).send(err);
  });
};
