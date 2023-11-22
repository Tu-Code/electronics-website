const express = require('express');
const router = express.Router();
const AgencyController = require('../controllers/agency');
const AdminController = require('../controllers/admin')

router.use(express.static('views'));
router.use(express.json());
router.use(express.urlencoded({ extended: true })); 


router.post('/login', (req, res) => {
    const { user_type, email, password } = req.body;
    console.log(req.body)

    if (user_type == 'Agency') {
        AgencyController.login(req, res, email, password);
    } 
    
    else if (user_type == 'Admin') {
        AdminController.login(req, res, email, password);
    } 
    
    else {
        res.status(400).send('Invalid user type');
    }
});

router.post('/signup', AdminController.signup);
  
module.exports = router;