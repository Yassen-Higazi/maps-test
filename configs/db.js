const mongoose = require("mongoose");

exports.connect = async function dbConnect() {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log("connected to the database");
  } catch (err) {
    console.error(err);
    process.exit();
  }
};
