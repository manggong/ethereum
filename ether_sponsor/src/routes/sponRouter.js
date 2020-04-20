const express = require("express");
const router = express.Router();

const Sponsor = require("../../truffle/build/contracts/Sponsor.json");
const Web3 = require("web3");
let web3 = new Web3();
let contract = null;

router.post("/add", async (req, res) => {
  let reciveAccount = req.body.account;
  let amount = parseInt(req.body.amount, 10);
  let eth_amount = amount * 1000000000000000000;
  try {
    web3.setProvider(new Web3.providers.HttpProvider("http://localhost:7545"));
    accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = Sponsor.networks[networkId];
    contract = new web3.eth.Contract(
      Sponsor.abi,
      deployedNetwork && deployedNetwork.address
    );

    await web3.eth.sendTransaction({
      from: accounts[0],
      to: reciveAccount,
      value: eth_amount,
    });
    const total = await web3.eth.getBalance(reciveAccount);
    const total_eth = web3.utils.fromWei(total, "ether");
    res.send({ msg: total_eth });
  } catch (error) {
    console.error(error);
    res.send({ msg: error.message });
  }
});

module.exports = router;
