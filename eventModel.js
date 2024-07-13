const mongoose = require("mongoose");
const eventSchema = new mongoose.Schema({
  event: String,
  triggerTime: Date,
});

const EventModel = mongoose.model("Event", eventSchema);

module.exports = EventModel;
