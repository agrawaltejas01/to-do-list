var mongo = require('mongoose');
var Schema = mongo.Schema;

const userSchema = new Schema({
    _id : { type : String},
    password : { type : String}
},
{
    versionKey : false
});

const user = mongo.model('user', userSchema, 'user');
module.exports = user;