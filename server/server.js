const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: './config.env' });

process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});

require('./models/User');
require('./models/Info');
const app = require("./app");


const DB = process.env.DATABASE;

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    //console.log(con.connections);
    console.log("db connection successful!!")
}).catch(err => console.log(err));


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`app running on port: ${port}`);
});

process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
