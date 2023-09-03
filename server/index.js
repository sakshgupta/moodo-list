const express = require("express");
const app = express();
const mongoose = require("mongoose");

const cors = require("cors");

const dotenv = require("dotenv");
const bodyParser = require("body-parser");

const moodoRouter = require("./routes/moodoRoutes");

dotenv.config();
console.log("in index - ", process.env.MONGO_ATLAS_URI);
//database url
mongoose
    .connect(process.env.MONGO_ATLAS_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {})
    .catch((err) => {
        console.log(err);
    });

require("./models/moodo");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use("/", moodoRouter);

app.get("/", (req, res) => {
    res.send("Moodo List micro services API.");
});

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server Running on🚀: ${process.env.PORT}`);
});
