const express = require('express');
const router = express.Router();
const cors = require('cors');
const multer = require('multer');
const AgencyController = require('../controllers/agency');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'views/img/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage: storage });

router.use(cors());
router.use(express.json());

router.post('/submitApplication', upload.fields([
    { name: 'logoUpload', maxCount: 1 },
    { name: 'certificationUpload', maxCount: 5 }, 
]), AgencyController.submitApplication);

router.get('/api/agencies', AgencyController.getAllAgencies);

router.get('/api/agency/:agencyId', AgencyController.getAgencyDetailsById);

router.delete('/api/deleteAgency/:agencyId', AgencyController.deleteAgency);

module.exports = router;