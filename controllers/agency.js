const AgencyService = require('../service/agency');
const {
    Agency
} = require('../models/agency');

class AgencyController {

    static async submitApplication(req, res) {
        try {
            const formData = req.body;

            const logoFile = req.files['logoUpload'][0]; // Logo file
            const certificateFiles = req.files['certificationUpload']; // Certificate files (as it's a multiple file field)

            const {
                logoPath,
                certificatePaths
            } = await AgencyService.saveUploadedFiles(logoFile, certificateFiles);

            console.log(logoPath)
            await AgencyService.createAgency(formData, logoPath, certificatePaths);

            res.redirect('/partnership-account');
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }

    static async getAllAgencies(req, res) {
        try {
            const agencies = await AgencyService.getAllAgencies();
            res.status(200).json(agencies);
        } catch (error) {
            console.error('Error fetching agencies:', error);
            res.status(500).send('Internal Server Error');
        }
    }

    static async deleteAgency(req, res) {
        const {
            agencyId
        } = req.params;

        try {
            const deletedStatus = await AgencyService.deleteAgency(agencyId);
            console.log("deleted agency")
            return res.json(deletedStatus);
        } catch (error) {
            console.error('Error deleting agency:', error);
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
    }

    static async getAgencyDetailsById(req, res) {
        const {
            agencyId
        } = req.params;

        try {
            const agency = await AgencyService.getAgencyDetailsById(agencyId);
            console.log(agency.agencyLogo)
            res.status(200).json(agency);
        } catch (error) {
            console.error('Error fetching agency:', error);
            res.status(500).send('Internal Server Error');
        }
    }
}

module.exports = AgencyController;