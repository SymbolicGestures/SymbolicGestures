const models = require('../models');
const faker = require('../../config/fakeApplicationsGenerator');

let fakeApplications = faker(15);
let createApplicationRecord = (profile_id, knex, application) => {
  return knex('applications').insert({
    profile_id,
    stage: application.stage,
    job_posting_link: application.job_posting_link,
    company_name: application.company_name,
    job_title: application.job_title,
    location: application.location,
    job_posting_source: application.job_posting_source,
    salary: application.salary
  })
  .returning('id')
  .into('applications')
  .then((id) => {
    application.id = id[0];
  });
};

let createApplicationRelatedRecord = (applicationRelatedRecords, application_id, knex, application) => {
  application.contacts.forEach((contact) => {
    applicationRelatedRecords.push(
      knex('contacts').insert({
        application_id,
        role: contact.role,
        name: contact.name,
        email: contact.email,
        phone: contact.phone
      })
    );
  });
  application.histories.forEach((history) => {
    applicationRelatedRecords.push(
      knex('histories').insert({
        application_id,
        created_at: history.date,
        event: history.event
      })
    );
  });
  application.notes.forEach((note) => {
    applicationRelatedRecords.push(
      knex('notes').insert({
        application_id,
        note: note.note,
        type: note.type,
      })
    );
  });
};
exports.seed = function (knex, Promise) {
  return models.Profile.where({ email: 'test@gmail.com' }).fetch()
    .then((profile) => {
      if(!profile) {throw err;}
      let testUserId = profile.id;
      let applications = [];
      for (let i = 0; i < fakeApplications.length; i++) {
        applications.push(createApplicationRecord(testUserId, knex, fakeApplications[i]));
      }
      return Promise.all(applications);
    })
    .error(err => {
      console.error('ERROR: failed to find email: test@gmail.com');
      throw err;
    })
    .then((applications) => {
      //creating notes, histories, and contacts
      let applicationRelatedRecords = [];
      fakeApplications.forEach((application) => {
        createApplicationRelatedRecord(applicationRelatedRecords, application.id, knex, application);
      });
      return Promise.all(applicationRelatedRecords);
    })
    .error(err => {
      console.error('ERROR: failed to create seed application\'s children files(notes, histories, or contacts)');
    })
    .catch(() => {
      console.log('WARNING: testUser doesn\'t exist.');
    });

};
