const config = {
    PORT: process.env.PORT || 8080,
    DB: process.env.MONGODB || 'mongodb://localhost:27017/tienda'
};

module.exports = config;
