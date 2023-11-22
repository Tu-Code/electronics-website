const mongoose = require('mongoose')

const agencySchema = new mongoose.Schema({
    agencyName: {
        type: String,
        required: true,
        min: 100
    },
    agencyEmail: {
        type: String,
        required: true,
        unique: true
    },
    agencyWebsite: {
        type: String,
        required: true,
        min: 100
    },
    agencyState: {
        type: String,
        required: true,
        min: 100
    },
    agencyArea: {
        type: String,
        required: true,
        min: 100
    },
    agencySpecialty: {
        type: String,
        required: true,
        min: 100
    },
    agencyIntroduction: {
        type: String,
        required: true,
        min: 100
    },
    agencyPartnerships: {
        type: String,
        required: true,
    },
    additionalInformation: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    agencyLogo: {
        type: String,
        required: true,
    },
    agencyCertificate: {
        type: [String],
        required: true,
    },
});

const Agency = mongoose.model("Agency", agencySchema);

module.exports = {
    Agency,
    agencySchema,
};

