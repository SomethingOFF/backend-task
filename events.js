const fs = require("fs");
const EventModel = require("./eventModel");
const EventEmitter = require("events");
class Events extends EventEmitter {
  constructor() {
    super();
    this.events = {};
  }

  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
    this.addListener(eventName, callback);
  }

  trigger(eventName, ...args) {
    const eventCallbacks = this.events[eventName];
    if (eventCallbacks) {
      eventCallbacks.forEach((callback) => {
        callback(...args);
      });
    }
    this.logEvent(eventName);
  }

  off(eventName) {
    delete this.events[eventName];
    this.removeAllListeners(eventName);
  }
  logEvent(eventName) {
    const eventLog = {
      event: eventName,
      triggerTime: new Date().toISOString(),
    };

    const newEvent = new EventModel(eventLog);

    newEvent
      .save()
      .then(() => console.log("Logged to MongoDB:", eventLog))
      .catch((err) => console.error("Error logging to MongoDB:", err));

    const logMessage = `${eventName} --> ${eventLog.triggerTime}\n`;
    fs.appendFile("logs/app.log", logMessage, (err) => {
      if (err) throw err;
    });
  }
}

module.exports = Events;
