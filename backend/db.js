const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017/iNotebook"

const connectToMongo = () => {
    mongoose.connect(mongoURI).then(() => {
        console.log('Connected to Mongo successfully');
    }).catch((err) => {
        console.log(err);
        // eslint-disable-next-line no-undef
        handleError(err)
    })
}


module.exports = connectToMongo;

