const mongoose = require('mongoose');

module.exports.isValidIbOjectId = (objId) => mongoose.Types.ObjectId.isValid(objId);
