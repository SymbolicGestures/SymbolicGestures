'use strict';
const express = require('express');
const router = express.Router();
const ApplicationController = require('../controllers').Applications;


router.route('/applications')
  .get(ApplicationController.getAllApps);

/**
 * api access to all applications of a given user determined by :id.
 * @return {Array}     returns an array of all applications of user with profile_id of :id
 */
router.route('/applications/:id')
  .get(ApplicationController.getOneApp);

/**
 * edit an application with id - :id.
 * @return {String}     returns a string with success or error message.
 */
router.route('/applications/edit/:id')
  .put(ApplicationController.createOrUpdateApp);

router.route('/notes')
  .get(ApplicationController.getAllNotes);

/**
 * api access to all notes of a given application determined by :id.
 * @return {Array}     returns an array of all notes of user with application_id of :id
 */
router.route('/notes/:id')
  .get(ApplicationController.getOneNote);

/**
 * edit a note with id - :id.
 * @return {String}     returns a string with success or error message.
 */
router.route('/notes/edit/:id')
  .put(ApplicationController.createOrUpdateNote);

router.route('/histories')
  .get(ApplicationController.getAllHistories);

/**
 * api access to all histories of a given application determined by :id.
 * @return {Array}     returns an array of all histories of user with application_id of :id
 */
router.route('/histories/:id')
  .get(ApplicationController.getOneHistory);

/**
 * api access to all notes of a given application determined by :id.
 * @return {Array}     returns an array of all applications of user with application_id of :id
 */
router.route('/histories/edit/:id')
  .put(ApplicationController.createOrUpdateHistory);

router.route('/contacts')
  .get(ApplicationController.getAllContacts);


/**
 * api access to all contacts of a given application determined by :id.
 * @return {Array}     returns an array of all contacts of user with application_id of :id
 */
router.route('/contacts/:id')
  .get(ApplicationController.getOneContact);

router.route('/contacts/edit/:id')
  .put(ApplicationController.createOrUpdateContact);

module.exports = router;
