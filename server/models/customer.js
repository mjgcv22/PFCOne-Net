// require modules for the customerProfile  Model
let mongoose = require('mongoose');

let CustomerProfile = new mongoose.Schema(
    {
        customerName:
        {
            type: String,
            default: '',
            trim: true,
            required: 'name is required'
        },
        genDesc:
        {
            type: String,
            default: '',
            trim: true
        },
        salesDesc:
        {
            type: String,
            default: '',
            trim: true
        },
        camDesc:
        {
            type: String,
            default: '',
            trim: true
        },
        drillDesc:
        {
            type: String,
            default: '',
            trim: true
        },
        processDesc:
        {
            type: String,
            default: '',
            trim: true
        },
        solderDesc:
        {
            type: String,
            default: '',
            trim: true
        },
        processEngDesc:
        {
            type: String,
            default: '',
            trim: true
        },
        assemblyDesc:
        {
            type: String,
            default: '',
            trim: true
        },
        qualityDesc:
        {
            type: String,
            default: '',
            trim: true
        },
        packDesc:
        {
            type: String,
            default: '',
            trim: true
        },
        myFile:
        {
            type: String
        },
        date:
        {
            type: Date,
            default: Date.now
        }
    }
);

module.exports = mongoose.model('customerProfile', CustomerProfile);