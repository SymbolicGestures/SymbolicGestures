const faker = require('faker');
const format = require('date-fns/format');

let stages = ['Applied',
  'Phone Screen',
  'On Site',
  'Offer',
  'Considering',
  'Denied'];

let sources = ['LinkedIn',
  'Indeed',
  'Referrer',
  'Monster',
  'Hired.com',
  'Offer.com'];

let oneFakeApplication = () => {
  let randIdx = Math.floor(Math.random() * stages.length);
  let randContactLen = Math.floor(Math.random() * stages.length);
  let rnadDateLen = Math.floor(Math.random() * stages.length);

  let possContacts = [];
  for (let i = 0; i <= randContactLen; i++) {
    possContacts.push({
      name: faker.name.findName(),
      role: faker.name.jobDescriptor(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber()
    });
  }

  let dateApplied = format(faker.date.past(), 'YYYY-MM-DD');
  let possHistories = [];
  for (let i = 0; i <= rnadDateLen; i++) {
    possHistories.push({
      date: format(faker.date.future(), 'YYYY-MM-DD'),
      event: faker.lorem.word()
    });
  }

  let application = {
    // -- Info in row
    created_at: dateApplied,
    company_name: faker.company.companyName(),
    job_title: faker.name.jobTitle(),
    stage: stages[randIdx],
    job_posting_link: faker.internet.url(),
    job_posting_source: sources[randIdx],
    // -- In
    applied_at: dateApplied,
    updated_at: dateApplied,
    locaton: faker.address.city(),
    job_posting_to_pdf_link: faker.internet.url(),
    salary: faker.random.number({min:60000, max:150000}),
    notes: [
      { type: 'note', note: faker.lorem.paragraph() },
      // { type: 'codeSnippet', note: faker.lorem.sentence() },
    ],
    histories: possHistories,
    contacts: possContacts,
  };

  return application;
};

let fakeApplicationsGenerator = (num) => {
  let applications = [];
  for (let i = 0; i < num; i++) {
    applications.push(oneFakeApplication());
  }
  return applications;
};

// console.log(JSON.stringify(fakeApplicationsGenerator(2)));

module.exports = fakeApplicationsGenerator;
