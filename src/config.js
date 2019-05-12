const secret = 'lflekfmsldkjlaskfjlkfjalsjfdaslkdjfasnmnbhb';
var storageType = "s3";
module.exports = {
    secret : process.env.JWT_SECRET || secret,
    storageType : process.env.STORAGE_TYPE || storageType
};