import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes/person.route";
if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

const app = express();
const PORT = process.env.PORT || 3500;
const mongoConnectionUrl: string = process.env.MONGODB_URL || 'mongodb://localhost:27017/node-test';
mongoose.connect(mongoConnectionUrl)
    .catch(error => console.log(error));
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
let server;
db.once('open', function () {
    server = app.listen(PORT, () => {
        console.info(`Listening to port ${PORT}`);
    });
});


// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));


// enable cors
app.use(cors());
app.options('*', cors());

app.get('/', (req, res) => {
    res.send({ status: 'OK' });
})
app.use('', router);
