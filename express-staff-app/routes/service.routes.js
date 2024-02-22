const { Router } = require('express')

const organization = require('../controllers/organization')
const router = Router()


// /api/organization

router.get('/organizationforreg', [], organization.organizationsForRegister)


router.get('/organizations', [], organization.show)
router.get('/organizations/show', [], organization.showOrganizations)
router.get('/organizations/showktr', [], organization.showOrganizationsKtr)


module.exports = router
