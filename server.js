if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

require('module-alias/register')
const express = require('express');
const app = express();
// const fs = require('fs');
const cors = require('cors');
const logger = require('morgan')
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const mongoose = require('mongoose');
const passport = require('passport');
const PORT = process.env.PORT;
const { RedirectRouter, AuthRouter } = require('@routes');
const { ErrorLogger } = require('@middleware/error_handler/ErrorLogger');
const { GeneralErrorHandler } = require('@middleware/error_handler/GeneralErrorHandler');
const { initializePassport } = require('@middleware/passport');

// Create passport as authentication middleware
initializePassport(passport);

// Setup DB connection
mongoose.connect(process.env.MONGODB_URI, { 
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
});
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

// Just make sure uploads folder there
// Create a random txt file to avoid heroku error
// if (!fs.existsSync('./uploads')){
//     fs.mkdirSync('./uploads');
//     fs.closeSync(fs.openSync('random.txt', 'w'));
// }

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());
// app.use('/static', express.static('uploads'))
// app.use(RedirectRouter);
app.use('/api/auth', AuthRouter);
app.use(ErrorLogger);
app.use(GeneralErrorHandler);
app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
}
