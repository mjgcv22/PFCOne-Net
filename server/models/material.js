// require modules for the Material DataSheet Model
let mongoose = require('mongoose');

let DataSheet = mongoose.Schema({
        name: {
            type: String,
            default: '',
            trim: true,
            required: 'name is required'
        },
        description: {
            type: String,
            default: '',
            trim: true,
        },
        myFile: {
            type: String
        }

    }, {
        collection: "materialDatasheet"
    }

);

module.exports.DataSheet = mongoose.model('DataSheet', DataSheet);