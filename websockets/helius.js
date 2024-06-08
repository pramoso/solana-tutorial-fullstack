const io = require("socket.io-client");

let trades = [];

const ws = io("wss://mainnet.helius-rpc.com/?api-key=d12e1f6f-b21f-4cb1-b3cf-390948ff3604", {
  transports: ["websocket"],
  upgrade: false,
});

// Function to send a request to the WebSocket server
function sendRequest(ws) {
  const request = {
    jsonrpc: "2.0",
    id: 420,
    method: "transactionSubscribe",
    params: [
      {
        accountInclude: ["6v48LgKd24qALcd5UDYNEYDwWJArXoBqmNGmNy9abckJ"],
      },
      {
        commitment: "processed",
        encoding: "base64",
        transactionDetails: "full",
        showRewards: true,
        maxSupportedTransactionVersion: 0,
      },
    ],
  };
  ws.send(JSON.stringify(request));
}

// Define WebSocket event handlers

ws.on("open", function open() {
  console.log("WebSocket is open");
  sendRequest(ws); // Send a request once the WebSocket is open
});

ws.on("message", function incoming(data) {
  const messageStr = data.toString("utf8");
  try {
    const messageObj = JSON.parse(messageStr);
    console.log("Received:", messageObj);
  } catch (e) {
    console.error("Failed to parse JSON:", e);
  }
});

ws.on("error", function error(err) {
  console.error("WebSocket error:", err);
});

ws.on("close", function close() {
  console.log("WebSocket is closed");
});
