const mongoose = require('mongoose');

//Mapping global promises
mongoose.Promise = global.Promise;

//Connecting mongoose
mongoose.connect('mongodb+srv://lol:1234@cluster0-sfuoy.mongodb.net/test?retryWrites=true&w=majority')
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.log(err));