'use strict';
const express = require('express');
const router = express.Router();
const ApplicationController = require('../controllers').Applications;

/**
 * api access to all applications of a given user.
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
router.route('/applications')
  .get(ApplicationController.getAllApps);

router.route('/applications/:id')
  .get(ApplicationController.getOneApp);

router.route('/applications/edit/:id')
  .put(ApplicationController.createOrUpdateApp);

router.route('/notes')
  .get(ApplicationController.getAllNotes);

router.route('/notes/:id')
  .get(ApplicationController.getOneNote);

router.route('/notes/edit/:id')
  .put(ApplicationController.createOrUpdateNote);

router.route('/histories')
  .get(ApplicationController.getAllHistories);

router.route('/histories/:id')
  .get(ApplicationController.getOneHistory);

router.route('/histories/edit/:id')
  .put(ApplicationController.createOrUpdateHistory);

router.route('/contacts')
  .get(ApplicationController.getAllContacts);

router.route('/contacts/:id')
  .get(ApplicationController.getOneContact);

router.route('/contacts/edit/:id')
  .put(ApplicationController.createOrUpdateContact);

module.exports = router;
