import { ethers } from "ethers";

// Replace with your WebSocket RPC
const WSS_RPC = "wss://mainnet.infura.io/ws/v3/YOUR_INFURA_KEY";

// Wallet address to monitor
const WALLET_ADDRESS = "0xYourWalletAddressHere".toLowerCase();

const provider = new ethers.WebSocketProvider(WSS_RPC);

console.log("Watching incoming transactions...");

provider.on("pending", async (txHash) => {
  try {
    const tx = await provider.getTransaction(txHash);
    if (!tx || !tx.to) return;

    if (tx.to.toLowerCase() === WALLET_ADDRESS) {
      console.log("Incoming transaction detected!");
      console.log({
        hash: tx.hash,
        from: tx.from,
        to: tx.to,
        value: ethers.formatEther(tx.value) + " ETH",
      });
    }
  } catch (err) {
    // ignore fetch errors
  }
});
