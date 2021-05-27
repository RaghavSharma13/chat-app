const mongoose = require("mongoose");

await mongoose.connect("mongodb+srv://rs_local_testing:local_testing@cluster0.rfvrh.mongodb.net/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});
