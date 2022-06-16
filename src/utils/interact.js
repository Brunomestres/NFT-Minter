import MetaDevContract from '../abis/MetadevsContract.json'
require("dotenv").config();
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;

const { createAlchemyWeb3} = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey);
export const loadContract = async () => {
  const networkData = MetaDevContract.networks["5777"];

  const contractABI = MetaDevContract.abi;
  const contractAddress = networkData.address;

  if(contractABI && contractAddress) {
    window.contract = web3.eth.Contract(contractABI, contractAddress);
    return {
      success: true,
      contractAddress
    }
  }else {
    return {
      success: false,
    }
  }
};

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const address = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const obj = {
        connectedStatus: true,
        status: "",
        address,
      };
      return obj;
    } catch (error) {
      return {
        connectedStatus: false,
        status: "Precisa conectar sua carteira do metamask",
      };
    }
  } else {
    return {
      connectedStatus: false,
      status: "Precisa instalar a extensão do metamask",
    };
  }
};

export const mintNFT = async (artist, artwork, name) => {};
