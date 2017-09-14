'use strict';
const express = require('express');
const router = express.Router();
const ApplicationController = require('../controllers').Applications;
const ProfilesController = require('../controllers').Profiles;

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
 * delete an application and all related data (notes, histories, etc.) with id = :id.
 * @return {String}     returns a string with success or error message.
 */
router.route('/deleteApplication/:id')
  .post(ApplicationController.deleteApplication);

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
 * deletes a note with id = :id.
 * @return {String}     returns a string with success or error message.
 */
router.route('/deleteNote/:id')
  .post(ApplicationController.deleteNote);

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
 * deletes a history with id = :id.
 * @return {String}     returns a string with success or error message.
 */
router.route('/deleteHistory/:id')
  .post(ApplicationController.deleteHistory);

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
 * deletes a contact with id = :id.
 * @return {String}     returns a string with success or error message.
 */
router.route('/deleteContact/:id')
  .post(ApplicationController.deleteContact);

/**
 * With a GET - Returns user's stage preference.
 * With a POST - edits user's stage preference.
 * @param  {Object} reqBody post request body form is {stages_settings: [{'name': Applied, 'backgroundColor':'#FFC107', textColor: 'black'}...]}
 * @return {Array}          returns an array of all stage preferences of the user.
 */
router.route('/profiles')
  .get(ProfilesController.getUserProfile)
  .post(ProfilesController.updateUserProfile);

/**
 * With a GET - Returns all current organizations.
 * With a POST - creates an organization
 * @param  {Object} reqBody post request body form is {organization_name: 'HR80', member_count: 1}
 * @return {Array}          returns an array of all organizations.
 */
router.route('/organizations')
  .get(ProfilesController.getAllOrganizations)
  .post(ProfilesController.createOrUpdateOrganization);

/**
 * With a POST - updates an organization. member_count is given with amount to add to member_count
 * @param  {Object} reqBody post request body form is {organization_name: 'HR80', member_count: 1}
 * @return {Array}          returns the updated organization.
 */
router.route('/organizations/:id')
  .post(ProfilesController.createOrUpdateOrganization);

module.exports = router;
