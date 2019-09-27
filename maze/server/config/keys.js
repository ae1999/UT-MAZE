const mongoose = require('mongoose');

const MONGO_USERNAME = '';
const MONGO_PASSWORD = '';
const MONGO_HOSTNAME = '';
const MONGO_PORT = '27017';
const MONGO_DB = 'maze';
const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

module.exports = {
  mongoURI: url,
  secretOrkey: String('secret')
};
