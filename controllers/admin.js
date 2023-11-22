// when logged in after submit button, the page will change from log in to 
// new page with agency/admin info and log out (will go back to log in oage) option.

const bcrypt = require('bcrypt');
const { Admin } = require('../models/admin');

class AdminController {
    static async signup(req, res) {
        try {
            const { email, password } = req.body;

            const existingAdmin = await Admin.findOne({ email });
            if (existingAdmin) {
                return res.status(400).send('Admin already exists');
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newAdmin = new Admin({
                adminEmail: email,
                password: hashedPassword,
            });

            await newAdmin.save();
            
            console.log("I am /admin/admin-account")

            return res.redirect('/admin/admin-account');

        } catch (error) {
            console.error(error);
            return res.status(500).send('Internal Server Error');
        }
    }

    static async login(req, res, email, password) {
        try {
            const admin = await Admin.findOne({ email });
            console.log(admin)

            if (!admin) {
                return res.status(401).send('Invalid credentials');
            }

            const isPasswordValid = await bcrypt.compare(password, admin.password);

            if (!isPasswordValid) {
                return res.status(401).send('Invalid credentials');
            }

            console.log("I login worked!")
            return res.redirect('/admin/admin-account');
            
        } catch (error) {
            console.error(error);
            return res.status(500).send('Internal Server Error');
        }
    }
}

module.exports = AdminController;
