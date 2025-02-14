const express = require('express');
const { UserPermissions } = require('../../lib/consts/UserType.enum');
const { requirePermissions, authenticateToken } = require('../../middlewares/authentication.middleware');
const router = express.Router();
const { getVolunteeringPrograms } = require('./volunteering-program.controller');

router.use(authenticateToken);

router.get('/', requirePermissions(UserPermissions.Read.Group), getVolunteeringPrograms);

module.exports = router;
