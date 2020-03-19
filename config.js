module.exports = {
    development: {
        port: process.env.PORT || 3000,
        saltingRounds: 10
    },
    product: {
        port: process.env.PORT || 3000,
        saltingRounds: 21
    }
};
