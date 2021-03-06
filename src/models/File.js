const mongoose = require('mongoose');

const File = new mongoose.Schema({
    "title": {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true,
     },
    },
    {
        timestamps: true,
        // toda vez que o File for convertido em Json ou Objeto, vai carregar o virtual automaticamente
        toObject: { virtuals: true },
        toJSON: { virtuals: true }
});

File.virtual('url').get(function(){
    const url = process.env.URL || 'http://localhost:3333'
    return `{url}/files/${encodeURIComponent(this.path)}`;
})

module.exports = mongoose.model( 'File', File);