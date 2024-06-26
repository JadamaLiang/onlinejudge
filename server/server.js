const mongoose = require("mongoose");

const app = require("./app");
const config = require("./config");

const port = config.PORT || 5000;
mongoose
    .connect(config.MONGODB_URI)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(port, () => {
            console.log(`Server is running on port: ${port}`);
        });
    })
    .catch((err) => console.log(err.message));