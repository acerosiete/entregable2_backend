const { Server } = require("socket.io");

module.exports.listen = function(http) {
    const io = new Server(http, {
        cors: {
          origin: "*",
          methods: ["GET", "POST"]
        }
      });
    return io 
}