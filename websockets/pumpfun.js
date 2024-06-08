const io = require("socket.io-client");

let trades = [];
let solPrice = 0;

const socket = io("wss://client-api-2-74b1891ee9f9.herokuapp.com", {
  transports: ["websocket"],
  upgrade: false,
});

socket.on("connect", () => {
  console.log("Connected to WebSocket server");
  fetchSolPrice();
});

socket.on("error", (error) => {
  console.error("Error connecting to WebSocket server:", error);
});

function fetchSolPrice() {
  fetch("https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd")
    .then((response) => response.json())
    .then((data) => {
      solPrice = data.solana.usd;
      console.log("Sol Price: $" + solPrice);
      //   updateFeed();
    })
    .catch((error) => console.error("Error fetching Solana price:", error));
}

socket.on("tradeCreated", (newTrade) => {
  const currentTime = Date.now();
  newTrade.receivedTime = currentTime;
  // only add trades of mint B5WTLaRwaUQpKk7ir1wniNB6m5o8GgMrimhKMYan2R6B
  if (newTrade.mint !== "EM8jZfjCDtuhh5fUdsgnYwSCV1P4qYF7CDmckBpfRH71") {
    return;
  }
  const existingIndex = trades.findIndex(
    (trade) =>
      trade.mint === newTrade.mint && trade.timestamp === newTrade.timestamp && trade.sol_amount === newTrade.sol_amount
  );
  if (existingIndex === -1) {
    trades.push(newTrade);
  } else {
    console.log("Duplicate trade:", newTrade.mint);
  }
  trades = trades.filter((trade) => currentTime - trade.receivedTime < 3600000);
  console.log("New trade:", newTrade);
});
