const mongoose = require("mongoose");
const DATABASE_URL =
  "mongodb+srv://somethinoff:1JNeLFubvF2qFJFQ@cluster0.ccpaakg.mongodb.net/netflix";

const connectDatabase = () => {
  mongoose.connect(DATABASE_URL).then((data) => {
    console.log(`Mongodb connected with server: ${data.connection.host}`);
  });
};

module.exports = connectDatabase;
