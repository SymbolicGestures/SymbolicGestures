'use strict';
const express = require('express');
const router = express.Router();
const ApplicationController = require('../controllers').Applications;

/**
 * With a GET - Returns all applications of the user.
 * With a POST - Adds an application for the user.
 * @return {Array}          returns an array of all applications (including contacts, notes, histories) of the user.
 */
router.route('/applications')
  .get(ApplicationController.getAllApps)
  .post(ApplicationController.createOrUpdateApp);

/**
 * edit an application with id - :id.
 * @return {String}     returns a string with success or error message.
 */
router.route('/applications/:id')
  .post(ApplicationController.createOrUpdateApp);

/**
 * With a GET - Returns all notes of the user.
 * With a POST - Adds a note for the user.
 * @param  {Object} reqBody post request body form is {"type":"codeSnippet","note":"Aliquam beatae quae rem quidem."}
 * @return {Array}          returns an array of all notes of the user.
 */
router.route('/notes')
  .get(ApplicationController.getAllNotes)
  .post(ApplicationController.createOrUpdateNote);

/**
 * edit a note with id - :id.
 * @return {String}     returns a string with success or error message.
 */
router.route('/notes/:id')
  .post(ApplicationController.createOrUpdateNote);

/**
 * With a GET - Returns all histories of the user.
 * With a POST - Adds a history for the user.
 * @param  {Object} reqBody post request body form is {"date":"2018-05-09","event":"molestiae"}
 * @return {Array}          returns an array of all histories of the user.
 */
router.route('/histories')
  .get(ApplicationController.getAllHistories)
  .post(ApplicationController.createOrUpdateHistory);

/**
 * edit a history with id - :id.
 * @return {String}     returns a string with success or error message.
 */
router.route('/histories/:id')
  .post(ApplicationController.createOrUpdateHistory);

/**
 * With a GET - Returns all contacts of the user.
 * With a POST - Adds a contact for the user.
 * @param  {Object} reqBody post request body form is {"name":"Aliza Collins","role":"Direct","email":"Jess.Fadel43@hotmail.com","phone":"209.536.2021 x66536"}
 * @return {Array}          returns an array of all contacts of the user.
 */
router.route('/contacts')
  .get(ApplicationController.getAllContacts)
  .post(ApplicationController.createOrUpdateContact);

/**
 * edit a contact with id - :id.
 * @return {String}     returns a string with success or error message.
 */
router.route('/contacts/:id')
  .post(ApplicationController.createOrUpdateContact);

/**
 * With a GET - Returns user's stage preference.
 * With a POST - edits user's stage preference.
 * @param  {Object} reqBody post request body form is {stagesSettings: [{'name': Applied, 'backgroundColor':'#FFC107', textColor: 'black'}...]}
 * @return {Array}          returns an array of all stage preferences of the user.
 */
router.route('/preference')
  .get(ApplicationController.getUserPreference)
  .post(ApplicationController.updateUserPreference);

module.exports = router;
