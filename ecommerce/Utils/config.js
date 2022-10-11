const mongoose = require("mongoose");

const dbCon = mongoose.connect("mongodb://localhost:27017/ecom")

mongoose.connection.once("open", () => {
    console.log("Connected to the database")
}).on("error", (error) => {
    console.log("Failed to connect " + error)
})
module.exports = dbCon;