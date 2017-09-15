'use strict';
const express = require('express');
const router = express.Router();
const OrganizationController = require('../controllers').Organization;

/**
 * With a GET - gets all organizations.
 * With a POST - creates or updates an organization.
 * @param  {Object} reqBody post request body form is {organization_name: 'HR80', member_count: 1}
 * @return {Array}          returns the updated organization.
 */
router.route('/organizations')
  .get(OrganizationController.getAllOrganizations)
  .post(OrganizationController.createOrUpdateOrganization);

/**
 * With a GET - gets all organizations that fuzzy matches organization_name with an array limited.
 * @param  {Object} reqBody post request body form is {organization_name: 'HR80', limit: 5}
 * @return {Array}          returns a limited array of top matching organizations. The limit defaults to 7 matches
 */
router.route('/fuzzyMatchOrganizations')
  .post(OrganizationController.getFuzzyOrganizations)

/**
 * With a POST - updates an organization. member_count is given with amount to add to member_count
 * @param  {Object} reqBody post request body form is {organization_name: 'HR80', member_count: 1}
 * @return {Array}          returns the updated organization.
 */
router.route('/organizations/:id')
  .post(OrganizationController.createOrUpdateOrganization);

module.exports = router;
