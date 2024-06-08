const WebSocketClient = require("websocket").client;
const util = require("util");

const client = new WebSocketClient();

client.on("connectFailed", function (error) {
  console.log("Connect Error: " + error.toString());
});

client.on("connect", function (connection) {
  console.log("WebSocket Client Connected");

  connection.on("error", function (error) {
    console.log("Connection Error: " + error.toString());
  });

  connection.on("close", function () {
    console.log("WebSocket Connection Closed");
  });

  connection.on("message", function (message) {
    if (message.type === "utf8") {
      console.log("Received: '" + message.utf8Data + "'");
      // Process received data here
    }
  });

  // Send subscription message here
  const subscriptionMsg = {
    type: "SUBSCRIBE_TXS",
    data: {
      queryType: "simple",
      address: "7Wr1PJsjBefz58YVmbW3GAgV2AZYTovnuq2XWnuo9tSe",
    },
  };

  connection.send(JSON.stringify(subscriptionMsg));
});

// Connect to Birdeye WebSocket
client.connect(
  util.format("wss://public-api.birdeye.so/socket/solana?x-api-key=9db0ace2422649c5a5c00d40cf18b1cf"),
  "echo-protocol",
  "https://birdeye.so"
);
