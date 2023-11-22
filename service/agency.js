const {
    Agency
} = require('../models/agency');
const bcrypt = require('bcrypt');
const saltRounds = 10;

class AgencyService {
    static async saveUploadedFiles(logoFile, certificateFiles) {
        try {
            // Process logo file
            const logoPath = logoFile ? '/views/img/' + logoFile.originalname : null;

            // Process certificate files
            const certificatePaths = certificateFiles.map(file => '/views/img/' + file.originalname);

            return {
                logoPath: logoPath,
                certificatePaths: certificatePaths,
            };
        } catch (error) {
            throw new Error('Error saving uploaded files.');
        }
    }

    static async createAgency(formData, logoPath, certificatePaths) {
        const trimmedLogoPath = logoPath.replace('/views/', '');

        console.log(typeof(trimmedLogoPath));

        if (!Array.isArray(certificatePaths)) {
            certificatePaths = [certificatePaths];
        }

        try {
            const {
                agencyName,
                agencyEmail,
                agencyWebsite,
                agencyPhone,
                state,
                agencyArea,
                password,
                agencySpeciality,
                agencyIntroduction,
                agencyPartnerships,
                agencyInformation,
            } = formData;

            console.log ({
                agencyName,
                agencyEmail,
                agencyWebsite,
                agencyPhone,
                state,
                agencyArea,
                password,
                agencySpeciality,
                agencyIntroduction,
                agencyPartnerships,
                agencyInformation,
            })

            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const newAgency = new Agency({
                agencyName,
                agencyEmail,
                agencyWebsite,
                agencyPhone,
                agencyState: state,
                agencyArea,
                password: hashedPassword,
                agencySpecialty: agencySpeciality,
                agencyIntroduction,
                agencyPartnerships,
                additionalInformation: agencyInformation,
                agencyLogo: trimmedLogoPath,
                agencyCertificate: certificatePaths,
            });

            await newAgency.save();
        } catch (error) {
            throw new Error('Error creating agency');
        }
    }
    static async getAgencyDetailsById(agencyId) {
        try {
            const agency = await Agency.findById(agencyId);
            return agency;
        } catch (error) {
            throw new Error('Error fetching agency details');
        }
    }

    static async getAllAgencies() {
        const agencies = await Agency.find();
        return agencies;
    }

    static async deleteAgency(agencyId) {
        const deletedAgency = await Agency.findByIdAndDelete(agencyId);

        if (!deletedAgency) {
            return ({
                message: 'Agency not found'
            });
        }

        return ({
            message: 'Agency deleted successfully',
            deletedAgency
        });
    }
}

module.exports = AgencyService;