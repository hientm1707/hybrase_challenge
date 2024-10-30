const mongoose = require('mongoose');

exports.connect = () => {
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('MongoDB connected', process.env.MONGO_URI))
        .catch(err => console.error('MongoDB connection error:', err));
};