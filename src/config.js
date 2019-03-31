const secret = 'lflekfmsldkjlaskfjlkfjalsjfdaslkdjfasnmnbhb';
var storageType = "disk";
module.exports = {
    secret : process.env.JWT_SECRET || secret,
    storageType : process.env.STORAGE_TYPE || storageType
};