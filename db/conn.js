
var mongoose = require('mongoose');
// mongoose.connect(
//     process.env.DB,
//     { useNewUrlParser: true })
//      .then(() => console.log('connected'))
//      .catch( (error) => error);
const DB = "mongodb+srv://shahbazm788:wpd.jj.dpw@cluster0.ugwiuxd.mongodb.net/futnitureapp";

mongoose.connect(DB,
    { useNewUrlParser: true })
     .then(() => console.log('connected'))
     .catch( (error) => error);