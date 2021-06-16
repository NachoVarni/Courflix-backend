const mongoose = require("mongoose");
const movieSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
  },
  image: {
    type: String,
  },
  type: {
    type: String,
    enum: ["Movie", "Serie"],
  },
});

module.exports = mongoose.model("Movie", movieSchema);
