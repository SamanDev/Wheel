const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.token = require("./token.model");
db.Wheel = require("./wheel");
db.userWheel = require("./user");
db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
